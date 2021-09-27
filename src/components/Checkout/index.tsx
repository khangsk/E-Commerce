import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FormatAmount } from "../../helper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LocationForm from "../Location/LocationForm";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Checkout: React.FC = () => {
  const { productsOrder, user } = useTypedSelector(
    (state) => state.repositories
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

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

  console.log(city, district, ward);

  useEffect(() => {
    setphoneInput(user.phoneNumber);
    setNameInput(user.lastName + " " + user.firstName);
  }, [user.phoneNumber, user.lastName, user.firstName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
  };

  const totalAmount = productsOrder.reduce(
    (acc, cur) => acc + cur.totalAmount,
    0
  );

  return productsOrder.length ? (
    <>
      <div
        style={{
          textAlign: "center",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          backgroundColor: "#f5fbff",
        }}
      >
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
      <TableContainer
        component={Paper}
        style={{
          height: 270,
          overflow: "scroll",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="center">Đơn giá</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsOrder.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      history.push(`/product-detail/${row.productId}`)
                    }
                  >
                    <img
                      src={row.image}
                      alt=""
                      width="50"
                      style={{ marginRight: "16px" }}
                    />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  {FormatAmount(row.price)}
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  {row.quantity}
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  {FormatAmount(row.totalAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p>1. Thông tin người mua hàng</p>
      <TextField
        margin="normal"
        required
        id="outlined-basic"
        label="Họ và tên"
        style={{ width: "30%" }}
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
        style={{ width: "30%", marginLeft: "4rem" }}
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
        style={{ width: "30%", zIndex: 0 }}
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
              fontSize: "2rem",
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
            padding: "1rem 6rem",
          }}
          onClick={() => {
            history.push("/checkout");
          }}
        >
          Đặt hàng
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Checkout;
