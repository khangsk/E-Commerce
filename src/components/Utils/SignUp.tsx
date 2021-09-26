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

export default function SignUp() {
  const dispatch = useDispatch();
  const [isLoadding, setIsLoadding] = useState(false);

  const [firstNameInput, setfirstNameInput] = useState("");
  const [firstNameBlur, setfirstNameBlur] = useState(false);
  const [lastNameInput, setlastNameInput] = useState("");
  const [lastNameBlur, setlastNameBlur] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [phoneInput, setphoneInput] = useState(false);
  const [phoneBlur, setphoneBlur] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const phoneNumber = data.get("phone");

    setIsLoadding(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY`,
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
            let errorMessage = "Email đã tồn tại";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        (async () => {
          const result = await User.add({
            email,
            firstName,
            lastName,
            phoneNumber,
            order: [],
          });

          const userId = (await result.get()).id;

          dispatch({
            type: ActionType.LOGIN,
            payload: [
              data.idToken,
              {
                id: userId,
                email,
                firstName,
                lastName,
                phoneNumber,
                order: [],
              },
            ],
          });

          toast.success("Đăng ký thành công!");
          setIsLoadding(false);
        })();
      })
      .catch((err) => {
        setIsLoadding(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      {isLoadding && <Loading />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  autoFocus
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setfirstNameInput(e.target.value);
                  }}
                  onBlur={() => setfirstNameBlur(true)}
                  error={!firstNameInput.trim() && firstNameBlur}
                  helperText={
                    !firstNameInput.trim() && firstNameBlur
                      ? "Vui lòng nhập tên"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Họ và tên đệm"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setlastNameInput(e.target.value);
                  }}
                  onBlur={() => setlastNameBlur(true)}
                  error={!lastNameInput.trim() && lastNameBlur}
                  helperText={
                    !lastNameInput.trim() && lastNameBlur
                      ? "Vui lòng nhập họ và tên đệm"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordInput(e.target.value);
                  }}
                  onBlur={() => setPasswordBlur(true)}
                  error={passwordInput.trim().length < 6 && passwordBlur}
                  helperText={
                    passwordInput.trim().length < 6 && passwordBlur
                      ? "Mật khẩu phải có ít nhất 6 ký tự"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Số điện thoại"
                  type="text"
                  id="phone"
                  autoComplete="phone"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const pattern = new RegExp(/^0[0-9]{9}$/im);
                    if (pattern.test(e.target.value)) {
                      setphoneInput(true);
                    } else {
                      setphoneInput(false);
                    }
                  }}
                  onBlur={() => setphoneBlur(true)}
                  error={!phoneInput && phoneBlur}
                  helperText={
                    !phoneInput && phoneBlur
                      ? "Vui lòng nhập số điện thoại (10 chữ số và bắt đầu bởi 0)"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !emailInput ||
                passwordInput.trim().length < 6 ||
                !firstNameInput.trim().length ||
                !lastNameInput.trim().length ||
                !phoneInput
              }
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
