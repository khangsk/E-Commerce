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
import Loading from "../Utils/Loading";
import ListOrderDetail from "./ListOrderDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./index.css";

const ManageOrder: React.FC = () => {
  const [listOrdersValidated, setListOrdersValidated] = useState<Array<any>>();
  const [listOrdersValidateNotYet, setListOrdersValidateNotYet] =
    useState<Array<any>>();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const ordersValidated: Array<any> = [];
      const ordersValidatedNotYet: Array<any> = [];
      const snapshot = await Order.get();
      snapshot.docs.forEach((doc) =>
        doc.data().order.forEach((el: any) => {
          if (doc.data().accept) {
            ordersValidated.push({ id: doc.id, ...doc.data(), order: el });
          } else {
            ordersValidatedNotYet.push({
              id: doc.id,
              ...doc.data(),
              order: el,
            });
          }
        })
      );
      setListOrdersValidated(ordersValidated);
      setListOrdersValidateNotYet(ordersValidatedNotYet);
      setLoading(false);
    })();
  }, [open]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="filter">
        <span>Loại đơn hàng</span>
        <button
          className={`filter__btn btn ${validated ? "" : "btn--primary"}`}
          onClick={() => setValidated(false)}
        >
          Đơn hàng chưa xác nhận
        </button>
        <button
          className={`filter__btn btn ${validated ? "btn--primary" : ""}`}
          onClick={() => setValidated(true)}
        >
          Đơn hàng đã xác nhận
        </button>
      </div>
      <div style={{ width: "100%" }}>
        {validated && listOrdersValidated && listOrdersValidated.length > 0 && (
          <ListOrderDetail listOrders={listOrdersValidated} />
        )}
        {validated && listOrdersValidated?.length === 0 && (
          <div style={{ textAlign: "center", margin: "10rem" }}>
            <p style={{ color: "var(--red-color)", fontSize: "2rem" }}>
              Đơn hàng trống
            </p>
            <span>Đơn hàng chưa xác nhận hiện tại không có</span>
          </div>
        )}
        {!validated &&
          listOrdersValidateNotYet &&
          listOrdersValidateNotYet.length > 0 && (
            <ListOrderDetail listOrders={listOrdersValidateNotYet} />
          )}
        {!validated && listOrdersValidateNotYet?.length === 0 && (
          <div style={{ textAlign: "center", margin: "10rem" }}>
            <p style={{ color: "var(--red-color)", fontSize: "2rem" }}>
              Đơn hàng trống
            </p>
            <span>Đơn hàng đã xác nhận hiện tại trống</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageOrder;
