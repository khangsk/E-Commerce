import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";

const Input = styled("input")({
  display: "none",
});

const MyAccount: React.FC = () => {
  const { user } = useTypedSelector((state) => state.repositories);
  const [lastNameInput, setLastNameInput] = useState(user.lastName);
  const [firstNameInput, setFirstNameInput] = useState(user.firstName);
  const [phoneInput, setphoneInput] = useState(user.phoneNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(user.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLastNameInput(user.lastName);
    setFirstNameInput(user.firstName);
    setphoneInput(user.phoneNumber);
    setUrl(user.avatar);
  }, [user.phoneNumber, user.lastName, user.firstName, user.avatar]);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      const uploadTask = storage.ref(`avatarUser/${user.email}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Không thể tại ảnh lên. Vui lòng thử lại!");
          setIsLoading(false);
        },
        () => {
          storage
            .ref("avatarUser")
            .child(user.email)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setIsLoading(false);
            });
        }
      );
    }
  }, [image, user.email]);

  const onUpdateUser = () => {
    dispatch({
      type: ActionType.UPDATE_USER_ACCOUNT,
      payload: {
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneInput,
        avatar: url,
      },
    });
    toast.success("Cập nhật thành công!");
  };

  return user.firstName && user.lastName && user.phoneNumber ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        backgroundColor: "var(--white-color)",
        width: "100%",
      }}
    >
      <div style={{ width: "50%", padding: "16px" }}>
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Họ và tên đệm"
          style={{ width: "100%", marginBottom: "20px" }}
          value={lastNameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastNameInput(e.target.value);
          }}
          error={!lastNameInput.trim()}
          helperText={
            !lastNameInput.trim() ? "Vui lòng nhập họ và tên đệm" : ""
          }
        />
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Tên"
          style={{ width: "100%", marginBottom: "20px" }}
          value={firstNameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstNameInput(e.target.value);
          }}
          error={!firstNameInput.trim()}
          helperText={!firstNameInput.trim() ? "Vui lòng nhập tên" : ""}
        />
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Số điện thoại"
          style={{ width: "100%", marginBottom: "20px" }}
          defaultValue={user.phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const pattern = new RegExp(/^0[0-9]{9}$/im);
            if (pattern.test(e.target.value)) {
              setphoneInput(e.target.value);
            } else {
              setphoneInput("");
            }
          }}
          error={!phoneInput}
          helperText={
            !phoneInput
              ? "Vui lòng nhập số điện thoại (10 chữ số và bắt đầu bởi 0)"
              : ""
          }
        />
        <Button
          variant="contained"
          component="span"
          onClick={onUpdateUser}
          disabled={
            firstNameInput.trim().length === 0 ||
            lastNameInput.trim().length === 0 ||
            !phoneInput ||
            !image
          }
        >
          Lưu
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Avatar
              alt={user.firstName}
              src={url}
              sx={{ width: 180, height: 180 }}
            />
          )}
        </div>

        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <Button variant="outlined" component="span">
              Chọn ảnh
            </Button>
          </label>
        </Stack>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyAccount;
