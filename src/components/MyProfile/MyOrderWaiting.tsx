import { useEffect, useState } from "react";
import { FormatAmount, FormatDate } from "../../helper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ActionType } from "../../state/action-types";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Order } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MyOrderWaiting: React.FC = () => {
  const orderHistory = useTypedSelector((state) =>
    state.repositories.orderHistory.filter((el) => !el.accept)
  );
  const [open, setOpen] = useState(false);
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
                <TableCell align="center">Hủy</TableCell>
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
                    <TableCell align="center" style={{ cursor: "pointer" }}>
                      <Button variant="text" onClick={() => setOpen(true)}>
                        Hủy
                      </Button>
                    </TableCell>
                    <Dialog
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Hủy đơn hàng?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Bạn chắc chắn muốn hủy đơn hàng này?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
                        <Button
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
                            setOpen(false);
                          }}
                          autoFocus
                        >
                          Đồng ý
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ textAlign: "center", margin: "9rem", width: "100%" }}>
          <p style={{ color: "var(--red-color)", fontSize: "2rem" }}>
            Đơn hàng chờ xác nhận trống
          </p>
          <span>Bạn không có đơn hàng nào đang chờ xác nhận</span>
        </div>
      )}
    </div>
  );
};

export default MyOrderWaiting;
