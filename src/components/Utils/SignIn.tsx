import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { User } from "../../firebase";
import Loading from "../Utils/Loading";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [isLoadding, setIsLoadding] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [showPassword, setShowPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    setIsLoadding(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Tài khoản hoặc mật khẩu không chính xác!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        (async () => {
          const snapshot = await User.where("email", "==", email).get();

          const user = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          };

          dispatch({
            type: ActionType.LOGIN,
            payload: [data.idToken, user],
          });

          localStorage.setItem("token", data.idToken);

          toast("Đăng nhập thành công!");
        })();
        setIsLoadding(false);
      })
      .catch((err) => {
        setIsLoadding(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng nhập</title>
      </Helmet>
      {isLoadding && <Loading />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1 }}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập vào E-Football
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const pattern = new RegExp(
                  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );
                if (pattern.test(e.target.value)) {
                  setEmailInput(true);
                } else {
                  setEmailInput(false);
                }
              }}
              onBlur={() => setEmailBlur(true)}
              error={!emailInput && emailBlur}
              helperText={
                !emailInput && emailBlur ? "Email không chính xác" : ""
              }
            />
            <span style={{ position: "relative" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={showPassword === "show" ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordInput(e.target.value);
                  if (!showPassword) {
                    setShowPassword("hide");
                  }
                  if (!e.target.value) {
                    setShowPassword("");
                  }
                }}
                onBlur={() => setPasswordBlur(true)}
                error={passwordInput.trim().length < 6 && passwordBlur}
                helperText={
                  passwordInput.trim().length < 6 && passwordBlur
                    ? "Mật khẩu phải có ít nhất 6 ký tự"
                    : ""
                }
              />
              {showPassword && (
                <FontAwesomeIcon
                  icon={showPassword === "hide" ? faEyeSlash : faEye}
                  style={{
                    position: "absolute",
                    color: "var(--primary-color)",
                    fontSize: "1.2rem",
                    top: 32,
                    right: 13,
                  }}
                  onClick={() =>
                    setShowPassword((state) =>
                      state === "hide" ? "show" : "hide"
                    )
                  }
                />
              )}
            </span>

            <Button
              type="submit"
              fullWidth
              disabled={!emailInput || passwordInput.trim().length < 6}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Bạn không có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
