import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { FormatAmount } from "../../helper";
import { User } from "../../firebase";

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "product", headerName: "Sản phẩm", width: 600 },
  { field: "price", headerName: "Đơn giá", width: 130 },
  { field: "quantity", headerName: "Số lượng", width: 130 },
  { field: "totalAmount", headerName: "Số tiền", width: 130 },
  { field: "delete", headerName: "Xóa", width: 130 },
];

const Cart: React.FC = () => {
  const { productsOrder, user } = useTypedSelector(
    (state) => state.repositories
  );

  return productsOrder.length ? (
    <div style={{ marginTop: "10px" }}>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={productsOrder.map((el) => ({
            id: el.productId,
            product: el.name,
            price: FormatAmount(el.price),
            quantity: el.quantity,
            totalAmount: FormatAmount(el.totalAmount),
          }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", margin: "15rem" }}>
      <p style={{ color: "#6e0505", fontSize: "2rem" }}>Giỏ hàng trống</p>
      <span>Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng của bạn.</span>
    </div>
  );
};

export default Cart;
