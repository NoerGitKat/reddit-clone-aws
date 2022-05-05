import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IRegisterProps {}

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signupError, setSignupError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    password,
    email,
  }) => {
    try {
      // const { user } = await Auth.signUp({
      //   username,
      //   password,
      //   attributes: {
      //     email,
      //   },
      // });

      setIsOpen(true);
      // console.log(user);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setIsOpen(true);
      setSignupError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" alignItems="center" spacing={1}>
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
        <Grid item>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          severity={signupError ? "error" : "success"}
          elevation={6}
          variant="filled"
        >
          {signupError ? signupError : "Successfully signed up!"}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Register;
