import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FormatAmount } from "../../helper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LocationForm from "../Location/LocationForm";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Checkout: React.FC = () => {
  const { productsOrder, user } = useTypedSelector(
    (state) => state.repositories
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [city, setCity] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [ward, setWard] = useState<any>();

  const cityHandler = useCallback((e: string) => {
    setCity(e);
  }, []);

  const districtHandler = useCallback((e: string) => {
    setDistrict(e);
  }, []);

  const wardHandler = useCallback((e: string) => {
    setWard(e);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [nameInput, setNameInput] = useState(
    user.lastName + " " + user.firstName
  );
  const [phoneInput, setphoneInput] = useState(user.phoneNumber);
  const [address, setAddress] = useState("");
  const [addressBlur, setAddressBlur] = useState(false);

  useEffect(() => {
    setphoneInput(user.phoneNumber);
    setNameInput(user.lastName + " " + user.firstName);
  }, [user.phoneNumber, user.lastName, user.firstName]);

  const totalAmount = productsOrder.reduce(
    (acc, cur) => acc + cur.totalAmount,
    0
  );

  return productsOrder.length ? (
    <>
      <div
        style={{
          padding: "0.5rem 1rem",
          width: "50%",
          margin: "auto",
          backgroundColor: "var(--white-color)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--primary-color)",
              fontSize: "1.5rem",
              fontWeight: 500,
            }}
          >
            Đơn hàng của bạn
          </p>
        </div>

        <p>1. Thông tin người mua hàng</p>
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Họ và tên"
          style={{ width: "100%" }}
          defaultValue={user.lastName + " " + user.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameInput(e.target.value);
          }}
          error={!nameInput.trim()}
          helperText={!nameInput.trim() ? "Vui lòng nhập họ và tên" : ""}
        />
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Số điện thoại"
          style={{ width: "100%" }}
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
        <p>2. Địa chỉ nhận hàng</p>
        <LocationForm
          cityHandler={cityHandler}
          districtHandler={districtHandler}
          wardHandler={wardHandler}
        />
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Số nhà, tên đường"
          style={{ width: "100%", zIndex: 0 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(e.target.value);
          }}
          onBlur={() => setAddressBlur(true)}
          error={!address.trim() && addressBlur}
          helperText={
            !address.trim() && addressBlur ? "Vui lòng nhập họ và tên" : ""
          }
        />
        <p>3. Phương thức thanh toán</p>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            defaultValue="cash"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Thanh toán khi nhận hàng"
            />
            <FormControlLabel value="momo" control={<Radio />} label="Momo" />
          </RadioGroup>
        </FormControl>
        <div
          style={{
            textAlign: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            backgroundColor: "#f5fbff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <span>Tổng thanh toán:</span>
            <span
              style={{
                color: "var(--red-color)",
                fontSize: "1.5rem",
                marginLeft: "1rem",
              }}
            >
              {FormatAmount(totalAmount)}
            </span>
          </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--red-color)",
              padding: "0.6rem 4rem",
            }}
            disabled={
              !nameInput ||
              !phoneInput ||
              !city ||
              !district ||
              !ward ||
              !address
            }
            onClick={() => {
              if (
                !!nameInput &&
                !!phoneInput &&
                !!city &&
                !!district &&
                !!ward &&
                !!address
              ) {
                console.log({
                  name: nameInput,
                  phone: phoneInput,
                  address:
                    address +
                    ", " +
                    ward.label +
                    ", " +
                    district.label +
                    ", " +
                    city.label,
                  order: productsOrder,
                  date: new Date(Date.now()).toString(),
                });
              }
            }}
          >
            Đặt hàng
          </Button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Checkout;
