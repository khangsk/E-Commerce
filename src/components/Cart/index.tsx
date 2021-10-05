import { useEffect } from "react";
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
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart: React.FC = () => {
  const productsOrder = useTypedSelector(
    (state) => state.repositories.productsOrder
  );
  const products = useTypedSelector((state) => state.repositories.products);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = productsOrder.reduce(
    (acc, cur) => acc + cur.totalAmount,
    0
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giỏ hàng</title>
      </Helmet>
      {productsOrder.length ? (
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
              Giỏ hàng
            </p>
          </div>
          <TableContainer
            component={Paper}
            style={{
              height: 400,
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
                  <TableCell align="center">Số tiền</TableCell>
                  <TableCell align="center">Xóa</TableCell>
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
                      <div className="group-input">
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 0,
                            minWidth: 0,
                            backgroundColor: "var(--primary-color)",
                          }}
                          onClick={() => {
                            const itemChange = productsOrder.find(
                              (product) => product.productId === row.productId
                            );
                            if (itemChange) {
                              if (itemChange.quantity === 1) {
                                toast.warning(
                                  "Số lượng sản phẩm tối thiểu là 1"
                                );
                              } else {
                                itemChange.quantity--;
                                itemChange.totalAmount -= itemChange.price;
                                dispatch({
                                  type: ActionType.UPDATE_ORDER,
                                  payload: productsOrder,
                                });
                              }
                            }
                          }}
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="input-quantity"
                          value={row.quantity}
                          pattern="[1-9]*"
                          onChange={(e) => {
                            const product = products.find(
                              (el) => el.ProductID === row.productId
                            )!;
                            const itemChange = productsOrder.find(
                              (product) => product.productId === row.productId
                            );
                            if (itemChange) {
                              if (+e.target.value > product.quantityRemaining) {
                                toast.warning(
                                  `Số lượng sản phẩm trong kho là ${product.quantityRemaining}`
                                );
                                itemChange.quantity = product.quantityRemaining;
                                itemChange.totalAmount =
                                  itemChange.price * product.quantityRemaining;
                              } else if (+e.target.value === 0) {
                                toast.warning(
                                  "Số lượng sản phẩm tối thiểu là 1"
                                );
                                itemChange.quantity = 1;
                                itemChange.totalAmount = itemChange.price;
                              } else {
                                itemChange.quantity = +e.target.value;
                                itemChange.totalAmount =
                                  itemChange.price * +e.target.value;
                              }
                              dispatch({
                                type: ActionType.UPDATE_ORDER,
                                payload: productsOrder,
                              });
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 0,
                            minWidth: 0,
                            backgroundColor: "var(--primary-color)",
                          }}
                          onClick={() => {
                            if (row.quantity <= 0) {
                              return;
                            }
                            const itemChange = productsOrder.find(
                              (product) => product.productId === row.productId
                            );
                            const product = products.find(
                              (el) => el.ProductID === row.productId
                            )!;
                            if (itemChange) {
                              if (
                                itemChange.quantity ===
                                product.quantityRemaining
                              ) {
                                toast.warning(
                                  `Số lượng sản phẩm trong kho là ${product.quantityRemaining}`
                                );
                              } else {
                                itemChange.quantity++;
                                itemChange.totalAmount += itemChange.price;
                                dispatch({
                                  type: ActionType.UPDATE_ORDER,
                                  payload: productsOrder,
                                });
                              }
                            }
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 120 }}>
                      {FormatAmount(row.totalAmount)}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: ActionType.UPDATE_ORDER,
                          payload: productsOrder.filter(
                            (product) => product.productId !== row.productId
                          ),
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ color: "var(--primary-color)" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
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
              Mua hàng
            </Button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "18rem" }}>
          <p style={{ color: "var(--red-color)", fontSize: "2rem" }}>
            Giỏ hàng trống
          </p>
          <span>Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng của bạn.</span>
        </div>
      )}
    </>
  );
};

export default Cart;
