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
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ForgetPassword: React.FC = () => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");

    if (!localStorage.getItem("timeReset")) {
      localStorage.setItem(
        "timeReset",
        new Date(Date.now()).getTime().toString()
      );
    } else {
      if (
        +localStorage.getItem("timeReset")! + 59000 >
        new Date(Date.now()).getTime()
      ) {
        toast.warning(
          `Vui lòng đợi sau ${Math.floor(
            (+localStorage.getItem("timeReset")! +
              59000 -
              new Date(Date.now()).getTime()) /
              1000
          )} giây!`
        );
        return;
      } else {
        localStorage.setItem(
          "timeReset",
          new Date(Date.now()).getTime().toString()
        );
      }
    }

    setIsLoadding(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Yêu cầu không thành công. Vui lòng thử lại!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        toast("Yêu cầu đã gửi qua email của bạn");
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
        <title>Quên mật khẩu</title>
      </Helmet>
      {isLoadding && <Loading />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 32,
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
            Quên mật khẩu tài khoản đăng nhập
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

            <Button
              type="submit"
              fullWidth
              disabled={!emailInput}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Gửi yêu cầu
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Quay lại
                </Link>
              </Grid>
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

export default ForgetPassword;
