import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContex";

interface IRegisterProps {}

interface IFormInput {
  username: string;
  email: string;
  password: string;
  code: string;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [hasResentCode, setHasResentCode] = useState(false);
  const { setUser } = useAuth();
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    password,
    email,
    code,
  }) => {
    try {
      if (showConfirmationCode) {
        await Auth.confirmSignUp(username, code);
        const signedInUser = await Auth.signIn(username, password);
        setUser(signedInUser);
        push("/");
      } else {
        const { user: newUser } = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });

        setIsOpen(true);
        setUser(newUser);
        setShowConfirmationCode(true);
      }
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setIsOpen(true);
      setSignupError(error.message);
    }
  };

  async function resendConfirmationCode(username: string) {
    try {
      await Auth.resendSignUp(username);
      setHasResentCode(true);
    } catch (err) {
      console.log("Error resending code: ", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        {!showConfirmationCode ? (
          <>
            <Grid item>
              <TextField
                id="username"
                variant="outlined"
                label="Username"
                type="text"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
                {...register("username", {
                  required: { value: true, message: "Please enter a username" },
                  minLength: {
                    value: 3,
                    message:
                      "Please enter a username of at least 3 characters long",
                  },
                  maxLength: {
                    value: 24,
                    message:
                      "Please enter a username of maximum 24 characters long",
                  },
                })}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                variant="outlined"
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter an email address",
                  },
                })}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a password",
                  },
                  validate: (value) => {
                    return (
                      [/[a-z]/, /[A-Z]/, /[0-9]/, /[#?!@_$%^&*-]/].every(
                        (pattern) => pattern.test(value),
                      ) ||
                      "Password should contain at least 1 capital letter, 1 special character and 1 digit"
                    );
                  },
                })}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <TextField
                id="code"
                variant="outlined"
                label="Confirmation Code"
                type="text"
                error={!!errors.code}
                helperText={errors.code ? errors.code.message : ""}
                {...register("code", {
                  required: {
                    value: true,
                    message: "Please enter a code",
                  },
                })}
              />
            </Grid>
            <Grid item>
              <a
                href="#"
                role="button"
                tabIndex={0}
                onClick={() => resendConfirmationCode(getValues("username"))}
              >
                Resend confirmation code
              </a>
              {hasResentCode && (
                <p>Code has been resent. Check your inbox again!</p>
              )}
            </Grid>
          </>
        )}

        <Grid item>
          <Button variant="contained" type="submit">
            {showConfirmationCode ? "Confirm Code" : "Register"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          severity={signupError ? "error" : "info"}
          elevation={6}
          variant="filled"
        >
          {signupError
            ? signupError
            : "Confirmation code sent. Check your inbox!"}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Register;
