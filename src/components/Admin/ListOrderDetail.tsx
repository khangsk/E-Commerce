import { useState, Fragment } from "react";
import { FormatAmount, FormatDate } from "../../helper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { Order, User } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ListOrderDetail: React.FC<{
  validated: boolean;
  open: any;
  setOpenChangeHandler: (e: boolean) => void;
  listOrders: Array<any>;
}> = ({ validated, open, setOpenChangeHandler, listOrders }) => {
  const [orderIdSelected, setOrderIdSelected] =
    useState<{ orderId: string; userId: string }>();
  return (
    <div style={{ width: 1000, overflow: "hidden" }}>
      <Dialog
        open={open}
        onClose={() => setOpenChangeHandler(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xác nhận đơn hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangeHandler(false)}>Hủy bỏ</Button>
          <Button
            onClick={async () => {
              setOpenChangeHandler(false);
              if (orderIdSelected) {
                Order.doc(orderIdSelected.orderId).update({ accept: true });
                const snapshot = await User.doc(orderIdSelected.userId).get();
                const userData = snapshot.data();
                if (userData) {
                  const userOrder = userData.orderHistory;
                  const orderUpdated = userOrder.find(
                    (el: any) => el.id === orderIdSelected.orderId
                  );
                  orderUpdated.accept = true;
                  await User.doc(orderIdSelected.userId).update({
                    orderHistory: userOrder,
                  });
                  toast.success("Xác nhận thành công đơn hàng");
                }
              }
            }}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table sx={{ width: 2100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ paddingLeft: 10, width: 50 }}>
                Mã đơn hàng
              </TableCell>
              <TableCell
                align="center"
                style={{ width: 110, borderLeft: "1px solid #ccc" }}
              >
                Mã sản phẩm
              </TableCell>
              <TableCell
                align="center"
                style={{ width: 300, borderLeft: "1px solid #ccc" }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                align="center"
                style={{ width: 80, borderLeft: "1px solid #ccc" }}
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
                style={{ borderLeft: "1px solid #ccc", width: 200 }}
              >
                Tên khách hàng
              </TableCell>
              <TableCell
                align="center"
                style={{ borderLeft: "1px solid #ccc", width: 400 }}
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
                style={{ borderLeft: "1px solid #ccc", width: 140 }}
              >
                Ngày đặt hàng
              </TableCell>
              {!validated && (
                <TableCell
                  align="center"
                  style={{ borderLeft: "1px solid #ccc", width: 120 }}
                >
                  Xác nhận
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {listOrders &&
              listOrders.map((order) => (
                <Fragment key={order.id}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: "0" } }}
                  >
                    <TableCell
                      align="center"
                      rowSpan={order.order.length}
                      style={{ width: 50, paddingLeft: 10 }}
                    >
                      {order.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 110, borderLeft: "1px solid #ccc" }}
                    >
                      {order.order[0].productId}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 300, borderLeft: "1px solid #ccc" }}
                    >
                      {order.order[0].name}
                    </TableCell>

                    <TableCell
                      align="center"
                      style={{ width: 80, borderLeft: "1px solid #ccc" }}
                    >
                      {order.order[0].quantity}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: 100, borderLeft: "1px solid #ccc" }}
                    >
                      {FormatAmount(order.order[0].totalAmount)}
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={order.order.length}
                      style={{ width: 200, borderLeft: "1px solid #ccc" }}
                    >
                      {order.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={order.order.length}
                      style={{ width: 400, borderLeft: "1px solid #ccc" }}
                    >
                      {order.address}
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={order.order.length}
                      style={{ width: 80, borderLeft: "1px solid #ccc" }}
                    >
                      {order.phone}
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={order.order.length}
                      style={{ width: 140, borderLeft: "1px solid #ccc" }}
                    >
                      {FormatDate(+new Date(order.date))}
                    </TableCell>
                    {!validated && (
                      <TableCell
                        align="center"
                        rowSpan={order.order.length}
                        style={{
                          cursor: "pointer",
                          borderLeft: "1px solid #ccc",
                          width: 120,
                        }}
                        onClick={() => {
                          setOpenChangeHandler(true);
                          setOrderIdSelected({
                            orderId: order.id,
                            userId: order.userId,
                          });
                        }}
                      >
                        <Button variant="text">Xác nhận</Button>
                      </TableCell>
                    )}
                  </TableRow>

                  {order.order.slice(1).map((el: any) => (
                    <TableRow
                      key={el.productId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: "0" },
                      }}
                    >
                      <TableCell
                        align="center"
                        style={{
                          width: 50,
                          borderLeft: "1px solid #ccc",
                        }}
                      >
                        {el.productId}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ width: 200, borderLeft: "1px solid #ccc" }}
                      >
                        {el.name}
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ width: 50, borderLeft: "1px solid #ccc" }}
                      >
                        {el.quantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ width: 100, borderLeft: "1px solid #ccc" }}
                      >
                        {FormatAmount(el.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListOrderDetail;
