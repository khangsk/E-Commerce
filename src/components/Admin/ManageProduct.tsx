import { useEffect, useState } from "react";
import { faAngleDown, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { storage, Products } from "../../firebase";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

const ManageProduct: React.FC = () => {
  const menuItems = useTypedSelector((state) => state.repositories.menuItems);
  const categories = useTypedSelector((state) => state.repositories.categories);
  const products = useTypedSelector((state) => state.repositories.products);
  const [menuItemSelected, setMenuItemSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [producerProduct, setproducerProduct] = useState("");
  const [producerFocus, setproducerFocus] = useState(false);
  const [sourceProduct, setsourceProduct] = useState("");
  const [sourceFocus, setsourceFocus] = useState(false);
  const [priceProduct, setpriceProduct] = useState(0);
  const [priceFocus, setpriceFocus] = useState(false);
  const [descriptionProduct, setdescriptionProduct] = useState("");
  const [descriptionFocus, setdescriptionFocus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (image) {
      const uniquePath = uuidv4();
      setIsLoading(true);
      const uploadTask = storage.ref(`images/${uniquePath}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Kh??ng th??? t???i ???nh l??n. Vui l??ng th??? l???i!");
          setIsLoading(false);
        },
        () => {
          storage
            .ref("images")
            .child(uniquePath)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setIsLoading(false);
            });
        }
      );
    }
  }, [image]);

  return (
    <>
      <div className="filter">
        <span>H??nh ?????ng</span>
        <button className="filter__btn btn btn--primary">Th??m s???n ph???m</button>
        <div className="filter__btn select-input">
          <span className="select-input__label">X??a s???n ph???m</span>

          <FontAwesomeIcon icon={faAngleDown} className="select-input__icon" />

          <ul className="select-input__list-price">
            {menuItems.map((el) => (
              <li className="select-input__item" key={el.menuItemId}>
                <Link
                  to={`/menu-item/${el.menuItemId}`}
                  className="select-input__link"
                >
                  <FontAwesomeIcon
                    icon={faFutbol}
                    style={{ marginRight: "4px" }}
                  />
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "var(--white-color)",
          width: "100%",
          display: "flex",
          padding: "32px 32px 16px 32px",
        }}
      >
        <Box sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="menu-item-select-label">Nh??m s???n ph???m</InputLabel>
            <Select
              labelId="menu-item-select-label"
              id="demo-simple-select"
              value={menuItemSelected}
              label="Nh??m s???n ph???m"
              onChange={(e) => setMenuItemSelected(e.target.value)}
            >
              {menuItems.map((menuItem) => (
                <MenuItem key={menuItem.menuItemId} value={menuItem.menuItemId}>
                  {menuItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 300 }} style={{ marginLeft: 16 }}>
          <FormControl fullWidth disabled={!menuItemSelected}>
            <InputLabel id="category-select-label">Lo???i s???n ph???m</InputLabel>
            <Select
              labelId="category-select-label"
              id="demo-simple-select"
              value={categorySelected}
              label="Lo???i s???n ph???m"
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              {categories
                .filter((category) => category.menuItemId === menuItemSelected)
                .map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          backgroundColor: "var(--white-color)",
          width: "100%",
          padding: "0 32px 32px",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", display: "flex" }}>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="T??n s???n ph???m"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNameProduct(e.target.value.trim());
            }}
            onBlur={() => setNameFocus(true)}
            error={!nameProduct && nameFocus}
            helperText={
              !nameProduct && nameFocus ? "Vui l??ng nh???p t??n s???n ph???m" : ""
            }
            style={{ width: "32%" }}
          />
          <TextField
            required
            fullWidth
            name="price"
            label="Gi?? (?????ng)"
            type="text"
            id="price"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const pattern = new RegExp(/^[0-9]*$/im);
              if (pattern.test(e.target.value) && +e.target.value > 0) {
                setpriceProduct(+e.target.value);
              } else {
                setpriceProduct(0);
              }
            }}
            onBlur={() => setpriceFocus(true)}
            error={priceProduct === 0 && priceFocus}
            helperText={
              priceProduct === 0 && priceFocus
                ? "Gi?? s???n ph???m ph???i l?? s??? nguy??n d????ng"
                : ""
            }
            style={{ width: "32%", marginLeft: 16 }}
          />
        </div>
        <div style={{ width: "100%", display: "flex", marginTop: 16 }}>
          <TextField
            name="producer"
            required
            fullWidth
            id="producer"
            label="Nh?? s???n xu???t"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setproducerProduct(e.target.value.trim());
            }}
            onBlur={() => setproducerFocus(true)}
            error={!producerProduct && producerFocus}
            helperText={
              !producerProduct && producerFocus
                ? "Vui l??ng nh???p nh?? s???n xu???t"
                : ""
            }
            style={{ width: "32%" }}
          />
          <TextField
            name="source"
            required
            fullWidth
            id="source"
            label="Qu???c gia"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setsourceProduct(e.target.value.trim());
            }}
            onBlur={() => setsourceFocus(true)}
            error={!sourceProduct && sourceFocus}
            helperText={
              !sourceProduct && sourceFocus ? "Vui l??ng nh???p t??n qu???c gia" : ""
            }
            style={{ width: "32%", marginLeft: 16 }}
          />
        </div>
        <div style={{ width: "100%", display: "flex", marginTop: 16 }}>
          <TextField
            name="description"
            required
            fullWidth
            id="description"
            label="M?? t??? s???n ph???m"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setdescriptionProduct(e.target.value.trim());
            }}
            onBlur={() => setdescriptionFocus(true)}
            error={!descriptionProduct && descriptionFocus}
            helperText={
              !descriptionProduct && descriptionFocus
                ? "Vui l??ng nh???p m?? t??? s???n ph???m"
                : ""
            }
            style={{ width: "66%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignItems: "center",
            position: "absolute",
            top: -52,
            right: 90,
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
                alt={"???nh s???n ph???m"}
                src={url}
                sx={{ width: 180, height: 180 }}
                variant="rounded"
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
                onChange={(e: any) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <Button variant="outlined" component="span">
                Ch???n ???nh
              </Button>
            </label>
          </Stack>
        </div>
        <div
          style={{
            width: "66%",
            display: "flex",
            marginTop: 32,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            component="span"
            disabled={
              !(
                menuItemSelected &&
                categorySelected &&
                nameProduct &&
                producerProduct &&
                sourceProduct &&
                priceProduct &&
                descriptionProduct
              )
            }
            onClick={async () => {
              if (url) {
                toast.success("????ng s???n ph???m th??nh c??ng");
                await Products.doc((products.length + 1).toString()).set({
                  CategoryID: categorySelected,
                  Name: nameProduct,
                  Price: priceProduct,
                  Discount: 0,
                  Description: descriptionProduct,
                  Image: url,
                  Producer: producerProduct,
                  Source: sourceProduct,
                  Star: 0,
                  Sold: 0,
                  comments: [],
                  isDeleted: false,
                  quantityRemaining: 1000,
                });
                history.replace("/");
                window.location.reload();
              } else {
                toast.error("????ng s???n ph???m kh??ng th??nh c??ng. Xin th??? l???i");
              }
            }}
          >
            ????ng s???n ph???m
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
