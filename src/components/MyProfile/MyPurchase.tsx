import { useEffect } from "react";
import { FormatAmount, FormatDate } from "../../helper";
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
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { Order } from "../../firebase";

const MyPurchase: React.FC = () => {
  const orderHistory = useTypedSelector(
    (state) => state.repositories.orderHistory
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {orderHistory && orderHistory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ width: 1000, minWidth: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell align="center">Đơn giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Số tiền</TableCell>
                <TableCell align="center">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderHistory.map((el, index) =>
                el.order.map((row) => (
                  <TableRow
                    key={row.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" style={{ minWidth: 120 }}>
                      {FormatDate(+new Date(el.date))}
                    </TableCell>
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
                      <div className="group-input">{row.quantity}</div>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 120 }}>
                      {FormatAmount(row.totalAmount)}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const updatedOrderHistory = el.order.filter(
                          (x) => x.productId !== row.productId
                        );
                        const resultUpdatedOrderHistory = [...orderHistory];
                        resultUpdatedOrderHistory.splice(index, 1);
                        if (updatedOrderHistory.length) {
                          const temp = {
                            userId: el.userId,
                            name: el.name,
                            phone: el.phone,
                            address: el.address,
                            order: updatedOrderHistory,
                            date: el.date,
                            accept: el.accept,
                            id: el.id,
                          };
                          resultUpdatedOrderHistory.push(temp);
                          Order.doc(el.id).update(temp);
                        } else {
                          Order.doc(el.id).delete();
                        }
                        dispatch({
                          type: ActionType.UPDATE_USER_ORDER,
                          payload: resultUpdatedOrderHistory,
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ color: "var(--primary-color)" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ textAlign: "center", margin: "18rem" }}>
          <p style={{ color: "var(--red-color)", fontSize: "2rem" }}>
            Lịch sử trống
          </p>
          <span>Bạn chưa mua bất kỳ đơn hàng nào</span>
        </div>
      )}
    </div>
  );
};

export default MyPurchase;
