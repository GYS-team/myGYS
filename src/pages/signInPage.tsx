import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import User from "../model/UserModel";
import logo from "../assets/logo.png";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    justifyContent: "center",
    alignContent: "center",
  },
}));

interface msg {
  username: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<msg>();
  let user = User.useContainer();
  const onSubmit = async (data: msg) => {
    try {
      await user.login(data.username, data.password);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            inputRef={register({ required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="NetID"
            name="username"
            autoComplete="username"
            autoFocus
            error={errors.username && true}
            helperText={errors.username && "Please input your username."}
          />
          <TextField
            inputRef={register({ required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password && true}
          />
          <Grid container>
            <Grid item xs justify="center" className={classes.link}>
              <Link href="#" variant="body2" className={classes.link}>
                {"忘记密码?"}
              </Link>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                inputRef={register}
                name="Rememberme"
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登入
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignInPage;
