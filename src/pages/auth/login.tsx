import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContex";

interface ILoginProps {}

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { user, setUser } = useAuth();
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ password, email }) => {
    try {
      const signedInUser = await Auth.signIn(email, password);
      setUser(signedInUser);
      push("/");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setLoginError(error.message);
      setIsOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" alignItems="center" spacing={1}>
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

        <Grid item>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
      >
        <Alert severity="error" elevation={6} variant="filled">
          {loginError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;
