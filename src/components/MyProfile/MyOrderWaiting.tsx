import { useEffect, useState, Fragment } from "react";
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
import { toast } from "react-toastify";

const MyOrderWaiting: React.FC = () => {
  const orderHistory = useTypedSelector((state) =>
    state.repositories.orderHistory.filter((el) => !el.accept)
  );
  const [open, setOpen] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hủy đơn hàng?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn hủy đơn hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
          <Button
            onClick={() => {
              const updatedOrderHistory = orderHistory.filter(
                (ord) => ord.id !== idSelected
              );
              Order.doc(idSelected).delete();
              dispatch({
                type: ActionType.UPDATE_USER_ORDER,
                payload: updatedOrderHistory,
              });
              toast.success("Hủy đơn hàng thành công!");
              setOpen(false);
            }}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      {orderHistory && orderHistory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ width: 1000, minWidth: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Ngày</TableCell>
                <TableCell
                  align="center"
                  style={{ width: 450, paddingRight: 100 }}
                >
                  Sản phẩm
                </TableCell>
                <TableCell align="center" style={{ width: 180 }}>
                  Đơn giá
                </TableCell>
                <TableCell align="center" style={{ width: 120 }}>
                  Số lượng
                </TableCell>
                <TableCell align="center" style={{ width: 180 }}>
                  Số tiền
                </TableCell>
                <TableCell align="center" style={{ width: 60 }}>
                  Hủy
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderHistory.map((el, index) => (
                <Fragment key={index}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      rowSpan={el.order.length}
                      style={{ width: 180 }}
                    >
                      {FormatDate(+new Date(el.date))}
                    </TableCell>
                    <TableCell align="center" style={{ width: 450 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push(
                            `/product-detail/${el.order[0].productId}`
                          )
                        }
                      >
                        <img
                          src={el.order[0].image}
                          alt=""
                          width="50"
                          style={{ marginRight: "16px" }}
                        />
                        {el.order[0].name}
                      </div>
                    </TableCell>
                    <TableCell align="center" style={{ width: 180 }}>
                      {FormatAmount(el.order[0].price)}
                    </TableCell>
                    <TableCell align="center" style={{ width: 120 }}>
                      <div className="group-input">{el.order[0].quantity}</div>
                    </TableCell>
                    <TableCell align="center" style={{ width: 180 }}>
                      {FormatAmount(el.order[0].totalAmount)}
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={el.order.length}
                      style={{ cursor: "pointer", width: 60 }}
                    >
                      <Button
                        variant="text"
                        onClick={() => {
                          setOpen(true);
                          setIdSelected(el.id);
                        }}
                      >
                        Hủy
                      </Button>
                    </TableCell>
                  </TableRow>
                  {el.order.slice(1).map((row) => (
                    <TableRow key={row.productId}>
                      <TableCell align="center" style={{ width: 450 }}>
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
                      <TableCell align="center" style={{ width: 180 }}>
                        {FormatAmount(row.price)}
                      </TableCell>
                      <TableCell align="center" style={{ width: 120 }}>
                        <div className="group-input">{row.quantity}</div>
                      </TableCell>
                      <TableCell align="center" style={{ width: 180 }}>
                        {FormatAmount(row.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
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
    </>
  );
};

export default MyOrderWaiting;
