import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const MyNewPassword: React.FC = () => {
  const token = useTypedSelector((state) => state.repositories.token);
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordBlur, setnewPasswordBlur] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordBlur, setconfirmPasswordBlur] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onUpdateUser = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: newPassword,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Cập nhật không thành công. Vui lòng thử lại!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        toast.success("Cập nhật thành công!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "var(--white-color)",
        width: "100%",
      }}
    >
      <div style={{ width: "50%", padding: "32px" }}>
        <TextField
          required
          fullWidth
          style={{ marginBottom: 20 }}
          name="newPassword"
          label="Mật khẩu mới"
          type="password"
          id="newPassword"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setnewPassword(e.target.value.trim());
          }}
          onBlur={() => setnewPasswordBlur(true)}
          error={newPassword.length < 6 && newPasswordBlur}
          helperText={
            newPassword.length < 6 && newPasswordBlur
              ? "Mật khẩu phải có ít nhất 6 ký tự"
              : ""
          }
        />
        <TextField
          required
          fullWidth
          style={{ marginBottom: 32 }}
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          id="confirmPassword"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setconfirmPassword(e.target.value.trim());
          }}
          onBlur={() => setconfirmPasswordBlur(true)}
          error={
            (confirmPassword.length < 6 || confirmPassword !== newPassword) &&
            confirmPasswordBlur
          }
          helperText={
            (confirmPassword.length < 6 || confirmPassword !== newPassword) &&
            confirmPasswordBlur
              ? "Mật khẩu và Xác nhận mật khẩu không giống nhau"
              : ""
          }
        />
        <Button
          variant="contained"
          component="span"
          onClick={onUpdateUser}
          disabled={
            newPassword.length === 0 ||
            confirmPassword.length === 0 ||
            confirmPassword !== newPassword
          }
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default MyNewPassword;
