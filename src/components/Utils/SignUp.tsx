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
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordBlur, setConfirmPasswordBlur] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const firstName = data.get("firstName")?.toString().trim();
    const lastName = data.get("lastName")?.toString().trim();
    const phoneNumber = data.get("phone");
    const avatar =
      "https://firebasestorage.googleapis.com/v0/b/efootball-e37a5.appspot.com/o/avatarUser%2Fdefault.png?alt=media&token=0bbf74ad-21cf-4895-a249-634b066da797";

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
            let errorMessage = "Email ???? t???n t???i";
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
            avatar,
            order: [],
            orderHistory: [],
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
                avatar,
                order: [],
                orderHistory: [],
              },
            ],
          });

          toast.success("????ng k?? th??nh c??ng!");
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>????ng k??</title>
      </Helmet>
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
          <Avatar
            sx={{ m: 1 }}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ????ng k?? t??i kho???n
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
                  label="T??n"
                  autoFocus
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setfirstNameInput(e.target.value.trim());
                  }}
                  onBlur={() => setfirstNameBlur(true)}
                  error={!firstNameInput && firstNameBlur}
                  helperText={
                    !firstNameInput && firstNameBlur ? "Vui l??ng nh???p t??n" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="H??? v?? t??n ?????m"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setlastNameInput(e.target.value.trim());
                  }}
                  onBlur={() => setlastNameBlur(true)}
                  error={!lastNameInput && lastNameBlur}
                  helperText={
                    !lastNameInput && lastNameBlur
                      ? "Vui l??ng nh???p h??? v?? t??n ?????m"
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
                    !emailInput && emailBlur ? "Email kh??ng ch??nh x??c" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="M???t kh???u"
                  type="password"
                  id="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordInput(e.target.value.trim());
                  }}
                  onBlur={() => setPasswordBlur(true)}
                  error={passwordInput.length < 6 && passwordBlur}
                  helperText={
                    passwordInput.length < 6 && passwordBlur
                      ? "M???t kh???u ph???i c?? ??t nh???t 6 k?? t???"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="X??c nh???n m???t kh???u"
                  type="password"
                  id="confirmPassword"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPasswordInput(e.target.value.trim());
                  }}
                  onBlur={() => setConfirmPasswordBlur(true)}
                  error={
                    (confirmPasswordInput.length < 6 ||
                      confirmPasswordInput !== passwordInput) &&
                    confirmPasswordBlur
                  }
                  helperText={
                    (confirmPasswordInput.length < 6 ||
                      confirmPasswordInput !== passwordInput) &&
                    confirmPasswordBlur
                      ? "M???t kh???u v?? X??c nh???n m???t kh???u kh??ng gi???ng nhau"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="S??? ??i???n tho???i"
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
                      ? "Vui l??ng nh???p s??? ??i???n tho???i (10 ch??? s??? v?? b???t ?????u b???i 0)"
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
                passwordInput.length < 6 ||
                !firstNameInput.length ||
                !lastNameInput.length ||
                !phoneInput ||
                passwordInput !== confirmPasswordInput
              }
            >
              ????ng k??
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  B???n ???? c?? t??i kho???n? ????ng nh???p
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
