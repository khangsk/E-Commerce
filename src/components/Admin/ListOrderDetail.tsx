import { useState, Fragment } from "react";
import {
  FormatAmount,
  FormatDate,
  getCategoriesOfMenuItem,
  getProductsOfCategory,
} from "../../helper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { Order, User, Products, Categories, MenuItems } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ActionType } from "../../state/action-types";
import {
  CategoryType,
  MenuItemType,
  ProductType,
} from "../../state/reducers/repositoriesReducer";
import { useDispatch } from "react-redux";

const ListOrderDetail: React.FC<{
  validated: boolean;
  open: any;
  setOpenChangeHandler: (e: boolean) => void;
  listOrders: Array<any>;
}> = ({ validated, open, setOpenChangeHandler, listOrders }) => {
  const [orderIdSelected, setOrderIdSelected] = useState<{
    orderId: string;
    userId: string;
    productsId: Array<{ id: string; quantity: number }>;
  }>();
  const dispatch = useDispatch();
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

                  orderIdSelected.productsId.forEach(async (el) => {
                    const productSnapshot = await Products.doc(el.id).get();
                    const productData = productSnapshot.data()!;
                    await Products.doc(el.id).update({
                      Sold: productData.Sold + el.quantity,
                      quantityRemaining:
                        productData.quantityRemaining - el.quantity,
                    });
                  });
                  toast.success("Xác nhận thành công đơn hàng");
                }

                let products: ProductType[] = [];
                let categories: CategoryType[] = [];
                let menuItems: MenuItemType[] = [];
                const snapshotProducts = await Products.get();
                snapshotProducts.forEach((doc) => {
                  if (!doc.data().isDeleted && doc.data().quantityRemaining > 0)
                    products.push({
                      ProductID: doc.id,
                      CategoryID: doc.data().CategoryID,
                      Name: doc.data().Name,
                      Price: doc.data().Price,
                      Discount: doc.data().Discount,
                      Description: doc.data().Description,
                      image: doc.data().Image,
                      Producer: doc.data().Producer,
                      Source: doc.data().Source,
                      Star: doc.data().Star,
                      comments: doc.data().comments,
                      quantityRemaining: doc.data().quantityRemaining,
                      Sold: doc.data().Sold,
                      isDeleted: false,
                    });
                });

                orderIdSelected.productsId.forEach((p) => {
                  const temp = products.find((el) => el.ProductID === p.id);
                  if (temp) {
                    temp.Sold += p.quantity;
                    temp.quantityRemaining -= p.quantity;
                  }
                });

                const listProductsOfCategory = getProductsOfCategory(products);

                const snapshotCategories = await Categories.get();
                snapshotCategories.forEach((doc) => {
                  categories.push({
                    categoryId: doc.id,
                    menuItemId: doc.data().MenuItemID,
                    name: doc.data().Name,
                    isDeleted: doc.data().isDeleted,
                    products: listProductsOfCategory[doc.id],
                    Promotion: doc.data().Promotion,
                  });
                });

                const listCategoriesOfMenuItem =
                  getCategoriesOfMenuItem(categories);

                const snapshotMenuItems = await MenuItems.get();
                snapshotMenuItems.forEach((doc) => {
                  menuItems.push({
                    menuItemId: doc.id,
                    name: doc.data().Name,
                    isDeleted: doc.data().isDeleted,
                    categories: listCategoriesOfMenuItem[doc.id],
                  });
                });

                dispatch({
                  type: ActionType.LOAD_PRODUCT,
                  payload: [products, categories, menuItems],
                });
              }
            }}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table
          sx={{ width: validated ? 1980 : 2100 }}
          aria-label="simple table"
        >
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
                            productsId: order.order.map((el: any) => ({
                              id: el.productId,
                              quantity: el.quantity,
                            })),
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
