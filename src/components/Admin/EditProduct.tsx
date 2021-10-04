import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { storage, Products } from "../../firebase";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const EditProduct: React.FC = () => {
  const products = useTypedSelector((state) => state.repositories.products);

  const productId = useParams<{ id?: string }>()!.id!;

  const product = products.find((el) => el.ProductID === productId)!;

  const [nameProduct, setNameProduct] = useState(product.Name);
  const [producerProduct, setproducerProduct] = useState(product.Producer);
  const [sourceProduct, setsourceProduct] = useState(product.Source);
  const [priceProduct, setpriceProduct] = useState(product.Price);
  const [discountProduct, setdiscountProduct] = useState(
    product.Discount * 100
  );
  const [descriptionProduct, setdescriptionProduct] = useState(
    product.Description
  );
  const [url, setUrl] = useState(product.image);

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setNameProduct(product.Name);
    setproducerProduct(product.Producer);
    setsourceProduct(product.Source);
    setpriceProduct(product.Price);
    setdiscountProduct(product.Discount);
    setdescriptionProduct(product.Description);
    setUrl(product.image);
  }, [
    product.Name,
    product.Producer,
    product.Source,
    product.Price,
    product.Discount,
    product.Description,
    product.image,
  ]);

  useEffect(() => {
    if (image) {
      const uniquePath = uuidv4();
      setIsLoading(true);
      const uploadTask = storage.ref(`images/${uniquePath}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Không thể tại ảnh lên. Vui lòng thử lại!");
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
      {nameProduct &&
        producerProduct &&
        sourceProduct &&
        priceProduct &&
        descriptionProduct && (
          <div
            style={{
              backgroundColor: "var(--white-color)",
              width: "100%",
              padding: 32,
              position: "relative",
            }}
          >
            <div style={{ width: "100%", display: "flex" }}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Tên sản phẩm"
                value={nameProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNameProduct(e.target.value.trim());
                }}
                error={!nameProduct}
                helperText={!nameProduct ? "Vui lòng nhập tên sản phẩm" : ""}
                style={{ width: "32%" }}
              />
              <TextField
                required
                fullWidth
                name="price"
                label="Giá (đồng)"
                type="text"
                id="price"
                value={priceProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const pattern = new RegExp(/^[0-9]*$/im);
                  if (pattern.test(e.target.value) && +e.target.value > 0) {
                    setpriceProduct(+e.target.value);
                  } else {
                    setpriceProduct(0);
                  }
                }}
                error={priceProduct === 0}
                helperText={
                  priceProduct === 0
                    ? "Giá sản phẩm phải là số nguyên dương"
                    : ""
                }
                style={{ width: "15.3%", marginLeft: 16 }}
              />
              <TextField
                required
                fullWidth
                name="discount"
                label="Giảm giá (%)"
                type="text"
                id="discount"
                value={discountProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const pattern = new RegExp(/^[0-9]*$/im);
                  if (
                    pattern.test(e.target.value) &&
                    +e.target.value >= 0 &&
                    +e.target.value < 100
                  ) {
                    setdiscountProduct(+e.target.value);
                  } else {
                    setdiscountProduct(0);
                  }
                }}
                style={{ width: "15.3%", marginLeft: 16 }}
              />
            </div>
            <div style={{ width: "100%", display: "flex", marginTop: 16 }}>
              <TextField
                name="producer"
                required
                fullWidth
                id="producer"
                label="Nhà sản xuất"
                value={producerProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setproducerProduct(e.target.value.trim());
                }}
                error={!producerProduct}
                helperText={
                  !producerProduct ? "Vui lòng nhập nhà sản xuất" : ""
                }
                style={{ width: "32%" }}
              />
              <TextField
                name="source"
                required
                fullWidth
                id="source"
                label="Quốc gia"
                value={sourceProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setsourceProduct(e.target.value.trim());
                }}
                error={!sourceProduct}
                helperText={!sourceProduct ? "Vui lòng nhập tên quốc gia" : ""}
                style={{ width: "32%", marginLeft: 16 }}
              />
            </div>
            <div style={{ width: "100%", display: "flex", marginTop: 16 }}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Mô tả sản phẩm"
                value={descriptionProduct}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setdescriptionProduct(e.target.value.trim());
                }}
                error={!descriptionProduct}
                helperText={
                  !descriptionProduct ? "Vui lòng nhập mô tả sản phẩm" : ""
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
                top: 32,
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
                    alt={"Ảnh sản phẩm"}
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
                    Chọn ảnh
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
                    nameProduct &&
                    producerProduct &&
                    sourceProduct &&
                    priceProduct &&
                    descriptionProduct
                  )
                }
                onClick={async () => {
                  if (url) {
                    toast.success("Cập nhật sản phẩm thành công");
                    await Products.doc(productId).update({
                      Name: nameProduct,
                      Producer: producerProduct,
                      Source: sourceProduct,
                      Price: priceProduct,
                      Discount: discountProduct / 100,
                      Description: descriptionProduct,
                      Image: url,
                    });
                    history.replace(`/product-detail/${productId}/edit`);
                    window.location.reload();
                  } else {
                    toast.error(
                      "Cập nhật sản phẩm không thành công. Xin thử lại"
                    );
                  }
                }}
              >
                Lưu
              </Button>
            </div>
          </div>
        )}
    </>
  );
};

export default EditProduct;
