import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

interface ILoginProps {}

interface IFormInput {
  username: string;
  password: string;
}

const Login: React.FC<ILoginProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const { user, setUser } = useAuth();
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    password,
    username,
  }) => {
    try {
      const signedInUser = await Auth.signIn(username, password);
      setUser(signedInUser);
      push("/");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setLoginError(error.message);
      setIsOpen(true);
    }
  };

  if (user) {
    push("/");
    return;
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <TextField
              id="username"
              variant="outlined"
              label="Username"
              type="username"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              {...register("username", {
                required: {
                  value: true,
                  message: "Please enter your username",
                },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type={isShowingPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setIsShowingPassword((prevState) => !prevState)
                      }
                      edge="end"
                    >
                      {isShowingPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
  }
};

export default Login;
