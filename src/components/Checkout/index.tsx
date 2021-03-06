import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FormatAmount } from "../../helper";
import Button from "@mui/material/Button";
import { useHistory, Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import LocationForm from "../../helper/Location/LocationForm";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Order } from "../../firebase";
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
// import CryptoJS from "crypto-js";
// import { signature, url } from "../../payment/Momo";

const Checkout: React.FC = () => {
  const user = useTypedSelector((state) => state.repositories.user);
  const productsOrder = useTypedSelector(
    (state) => state.repositories.productsOrder
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [nameInput, setNameInput] = useState(
    user.lastName + " " + user.firstName
  );
  const [phoneInput, setphoneInput] = useState(user.phoneNumber);
  const [address, setAddress] = useState("");
  const [addressBlur, setAddressBlur] = useState(false);
  const [paymenMethod, setPaymenMethod] = useState("cash");

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

  useEffect(() => {
    setphoneInput(user.phoneNumber);
    setNameInput(user.lastName + " " + user.firstName);
  }, [user.phoneNumber, user.lastName, user.firstName]);

  const totalAmount = productsOrder.reduce(
    (acc, cur) => acc + cur.totalAmount,
    0
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thanh to??n</title>
      </Helmet>
      {productsOrder.length > 0 ? (
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
              ????n h??ng c???a b???n
            </p>
          </div>

          <p>1. Th??ng tin ng?????i mua h??ng</p>
          <TextField
            margin="normal"
            required
            id="outlined-basic"
            label="H??? v?? t??n"
            style={{ width: "100%" }}
            defaultValue={user.lastName + " " + user.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNameInput(e.target.value);
            }}
            error={!nameInput.trim()}
            helperText={!nameInput.trim() ? "Vui l??ng nh???p h??? v?? t??n" : ""}
          />
          <TextField
            margin="normal"
            required
            id="outlined-basic"
            label="S??? ??i???n tho???i"
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
                ? "Vui l??ng nh???p s??? ??i???n tho???i (10 ch??? s??? v?? b???t ?????u b???i 0)"
                : ""
            }
          />
          <p>2. ?????a ch??? nh???n h??ng</p>
          <LocationForm
            cityHandler={cityHandler}
            districtHandler={districtHandler}
            wardHandler={wardHandler}
          />
          <TextField
            margin="normal"
            required
            id="outlined-basic"
            label="S??? nh??, t??n ???????ng"
            style={{ width: "100%", zIndex: 0 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAddress(e.target.value);
            }}
            onBlur={() => setAddressBlur(true)}
            error={!address.trim() && addressBlur}
            helperText={
              !address.trim() && addressBlur
                ? "Vui l??ng cung c???p ?????a ch??? ch??nh x??c ????? nh???n h??ng"
                : ""
            }
          />
          <p>3. Ph????ng th???c thanh to??n</p>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="cash"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Thanh to??n khi nh???n h??ng"
                onClick={() => setPaymenMethod("cash")}
              />
              <FormControlLabel
                value="momo"
                control={<Radio />}
                label="Momo"
                onClick={() => setPaymenMethod("momo")}
              />
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
              <span>T???ng thanh to??n:</span>
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
              onClick={async () => {
                if (
                  !!nameInput &&
                  !!phoneInput &&
                  !!city &&
                  !!district &&
                  !!ward &&
                  !!address
                ) {
                  const orderInfo = {
                    userId: user.id,
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
                    accept: false,
                  };
                  if (paymenMethod === "cash") {
                    const result = await Order.add(orderInfo);
                    if (result) {
                      toast.success("?????t h??ng th??nh c??ng!");
                      dispatch({
                        type: ActionType.CHECKOUT,
                        payload: { ...orderInfo, id: result.id },
                      });
                      history.replace("/");
                    }
                  } else if (paymenMethod === "momo") {
                    // fetch(
                    //   url +
                    //     CryptoJS.enc.Base64.stringify(
                    //       CryptoJS.HmacSHA256(
                    //         signature,
                    //         "wtf3L8Wpb7qYZGLBMsh9RjrBQXia5GMk"
                    //       )
                    //     )
                    // ).then((res) => console.log(res));
                    toast.warning("T??nh n??ng ??ang ???????c c???p nh???t!");
                  }
                }
              }}
            >
              ?????t h??ng
            </Button>
          </div>
        </div>
      ) : (
        <Redirect to="/cart" />
      )}
    </>
  );
};

export default Checkout;
