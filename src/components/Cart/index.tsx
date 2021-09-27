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

const Cart: React.FC = () => {
  const { productsOrder } = useTypedSelector((state) => state.repositories);
  const dispatch = useDispatch();

  return productsOrder.length ? (
    <TableContainer component={Paper}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={row.image}
                    alt=""
                    width="50"
                    style={{ marginRight: "16px" }}
                  />
                  {row.name}
                </div>
              </TableCell>
              <TableCell align="center">{FormatAmount(row.price)}</TableCell>
              <TableCell align="center">
                <div className="group-input">
                  <Button
                    variant="contained"
                    style={{ borderRadius: 0, minWidth: 0 }}
                    onClick={() => {
                      const itemChange = productsOrder.find(
                        (product) => product.productId === row.productId
                      );
                      if (itemChange) {
                        if (itemChange.quantity === 1) {
                          dispatch({
                            type: ActionType.UPDATE_ORDER,
                            payload: productsOrder.filter(
                              (product) => product.productId !== row.productId
                            ),
                          });
                        } else {
                          itemChange.quantity--;
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
                  />
                  <Button
                    variant="contained"
                    style={{ borderRadius: 0, minWidth: 0 }}
                    onClick={() => {
                      if (row.quantity <= 0) {
                        return;
                      }
                      const itemChange = productsOrder.find(
                        (product) => product.productId === row.productId
                      );
                      if (itemChange) {
                        if (itemChange.quantity === 10) {
                          toast.warning(
                            "Số lượng tối đa trên mỗi sản phẩm là 10"
                          );
                        } else {
                          itemChange.quantity++;
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
              <TableCell align="center">
                {FormatAmount(row.price * row.quantity)}
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
  ) : (
    <div style={{ textAlign: "center", margin: "15rem" }}>
      <p style={{ color: "#6e0505", fontSize: "2rem" }}>Giỏ hàng trống</p>
      <span>Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng của bạn.</span>
    </div>
  );
};

export default Cart;
