import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  background-color: var(--white-color);
  padding: 16px;
  display: flex;
`;

const Description = styled.div`
  padding: 16px;
  width: 50%;

  .product-name {
    font-size: 1.8rem;
    color: var(--text-color);
    font-weight: 300;
    margin-bottom: 8px;
  }

  .product-sale-number {
    font-weight: 200;
  }

  .product-item__price-current {
    color: #ff424e;
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
  }

  .product-item__price-old {
    color: rgb(128, 128, 137);
    text-decoration: line-through;
    font-size: 14px;
    line-height: 20px;
  }

  .product-item__discount-rate {
    font-weight: 400;
    margin-left: 8px;
    border: 1px solid rgb(255, 66, 78);
    border-radius: 2px;
    background-color: rgb(255, 240, 241);
    color: rgb(255, 66, 78);
    line-height: 18px;
    font-size: 14px;
    padding: 0px 4px;
  }

  .product-voucher {
    display: block;
    overflow: hidden;
    border: 1px solid #d60c0c;
    position: relative;
    background: #fff;
    padding-bottom: 5px;
    margin: 8px 0 5px;
  }

  .product-voucher-title {
    display: block;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
    padding: 6px 10px;
    text-transform: uppercase;
    background: #d60c0c;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  .product-voucher-title-2 {
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #333;
    padding: 5px 10px 0;
  }

  .promotion-more {
    background: #f6f6f6;
    padding: 6px 10px;
    border: 1px solid #f1f1f1;
    border-bottom: none;
    font-size: 14px;
    text-transform: uppercase;
    width: 100%;
    margin-top: 16px;
  }

  ul {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    margin-bottom: 0;
    list-style: none;
  }

  li {
    font-size: 0.8rem;
  }

  .group-input {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 8px;
  }

  .purchase {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
  }

  .input-quantity {
    padding: 8px 8px 9px 8px;
    border-top: 2px solid #1976d2;
    border-bottom: 2px solid #1976d2;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
    -moz-appearance: textfield; /* Firefox */
    text-align: center;
    width: 60px;
  }

  .input-quantity:focus {
    outline: #1976d2;
  }

  .input-quantity::-webkit-outer-spin-button,
  .input-quantity::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
`;

const LIST_PROMOTION_MORE = [
  "FREESHIP TOÀN QUỐC ĐƠN HÀNG < 500.000",
  "Giảm 20% phụ kiện và quần áo bóng đá mua kèm giày",
  "Bảo hành keo trọn đời",
  "Đổi trả trong 30 ngày",
];

const ProductDetail: React.FC = () => {
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const productId = useParams<{ id?: string }>()?.id;

  let content = <></>;

  if (productId) {
    const product = data.find((el) => el.ProductID === +productId);

    content = product ? (
      <Container>
        <div style={{ width: "50%", border: "1px solid #ccc" }}>
          <img
            src="https://cf.shopee.vn/file/42c51761d53b623a5bc6fcf8772d9e94"
            alt="Images"
            style={{ width: "90%" }}
          />
        </div>
        <Description>
          <p className="product-name">Giày Mizuno Basara Pro TF</p>
          <span className="product-sale-number">Đã bán 1</span>

          <div className="product-item__price">
            <span className="product-item__price-current">31.490.000đ</span>
            <span className="product-item__price-old">36.990.000đ</span>
            <span className="product-item__discount-rate">-5%</span>
          </div>

          <div className="product-voucher">
            <strong className="product-voucher-title">
              KHUYẾN MÃI ĐẶC BIỆT
            </strong>
            <span className="product-voucher-title-2">
              <FontAwesomeIcon icon={faGift} style={{ marginRight: "8px" }} />
              XẢ Hàng mùa dịch
            </span>
          </div>

          <div className="promotion-more">
            <strong>Ưu đãi thêm</strong>
          </div>
          <ul>
            {LIST_PROMOTION_MORE.map((el) => (
              <li>
                <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />{" "}
                {el}
              </li>
            ))}
          </ul>

          <div className="purchase">
            <Button
              variant="contained"
              style={{ backgroundColor: "#ff3945", minWidth: "50%" }}
            >
              Chọn mua
            </Button>
            <div className="quantity">
              <span style={{ marginLeft: "36px" }}>Số lượng</span>
              <div className="group-input">
                <Button
                  variant="contained"
                  style={{ borderRadius: 0, minWidth: 0 }}
                >
                  -
                </Button>
                <input type="number" className="input-quantity" />
                <Button
                  variant="contained"
                  style={{ borderRadius: 0, minWidth: 0 }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </Description>
      </Container>
    ) : (
      <></>
    );
  }

  return content;
};

export default ProductDetail;
