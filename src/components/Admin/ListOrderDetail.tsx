import { useEffect, useState } from "react";
import { FormatAmount, FormatDate } from "../../helper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { Order } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ListOrderDetail: React.FC<{
  listOrders: Array<any>;
}> = ({ listOrders }) => {
  const [open, setOpen] = useState(false);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: 2200 }}
        aria-label="simple table"
        style={{ marginBottom: 20 }}
      >
        <TableHead>
          <TableRow
            style={{ overflow: "scroll", overflowX: "auto", overflowY: "auto" }}
          >
            <TableCell align="center" style={{ paddingLeft: 10, width: 50 }}>
              Mã đơn hàng
            </TableCell>
            <TableCell
              align="center"
              style={{
                width: 50,
                borderLeft: "1px solid #ccc",
              }}
            >
              Mã sản phẩm
            </TableCell>
            <TableCell
              align="center"
              style={{
                width: 200,
                borderLeft: "1px solid #ccc",
              }}
            >
              Tên sản phẩm
            </TableCell>
            <TableCell
              align="center"
              style={{
                width: 50,
                borderLeft: "1px solid #ccc",
              }}
            >
              Số lượng
            </TableCell>
            <TableCell
              align="center"
              style={{ borderLeft: "1px solid #ccc", width: 100 }}
            >
              Số tiền
            </TableCell>
            <TableCell
              align="center"
              style={{
                borderLeft: "1px solid #ccc",
                width: 150,
              }}
            >
              Tên khách hàng
            </TableCell>
            <TableCell
              align="center"
              style={{
                borderLeft: "1px solid #ccc",
                width: 250,
              }}
            >
              Địa chỉ
            </TableCell>
            <TableCell
              align="center"
              style={{ borderLeft: "1px solid #ccc", width: 80 }}
            >
              Số điện thoại
            </TableCell>
            <TableCell
              align="center"
              style={{ borderLeft: "1px solid #ccc", width: 150 }}
            >
              Ngày đặt hàng
            </TableCell>
            <TableCell
              align="center"
              style={{ borderLeft: "1px solid #ccc", width: 40 }}
            >
              Xác nhận
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOrders &&
            listOrders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: "0" } }}
              >
                <TableCell
                  align="center"
                  style={{ width: 50, paddingLeft: 10 }}
                >
                  {order.id}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: 50,
                    borderLeft: "1px solid #ccc",
                  }}
                >
                  {order.order.productId}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 200, borderLeft: "1px solid #ccc" }}
                >
                  {order.order.name}
                </TableCell>

                <TableCell
                  align="center"
                  style={{ width: 50, borderLeft: "1px solid #ccc" }}
                >
                  {order.order.quantity}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 100, borderLeft: "1px solid #ccc" }}
                >
                  {FormatAmount(order.order.totalAmount)}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 150, borderLeft: "1px solid #ccc" }}
                >
                  {order.name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 250, borderLeft: "1px solid #ccc" }}
                >
                  {order.address}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 80, borderLeft: "1px solid #ccc" }}
                >
                  {order.phone}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 150, borderLeft: "1px solid #ccc" }}
                >
                  {FormatDate(+new Date(order.date))}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ cursor: "pointer", borderLeft: "1px solid #ccc" }}
                  onClick={() => setOpen(true)}
                >
                  <Button variant="text">Xác nhận</Button>
                </TableCell>
                {/* <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Xóa tài khoản?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bạn chắc chắn muốn xóa tài khoản này?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
                <Button
                  onClick={async () => {
                    await User.doc(user.id).delete();
                    // fetch(
                    //   `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDb7qRj2WgeaJsJIn7JyAzyDbPI3hzyKoY`,
                    //   {
                    //     method: "POST",
                    //     body: JSON.stringify({
                    //       email,
                    //       password,
                    //       returnSecureToken: true,
                    //     }),
                    //   }
                    // )
                    // auth.signInWithEmailAndPassword()
                    setOpen(false);
                    toast.success("Xóa thành công tài khoản!");
                  }}
                  autoFocus
                >
                  Xóa
                </Button>
              </DialogActions>
            </Dialog> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOrderDetail;
