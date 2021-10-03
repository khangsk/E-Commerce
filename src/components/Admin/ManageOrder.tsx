import { useEffect, useState } from "react";
import { Order } from "../../firebase";
import Loading from "../Utils/Loading";
import ListOrderDetail from "./ListOrderDetail";
import "./index.css";

const ManageOrder: React.FC = () => {
  const [listOrdersValidated, setListOrdersValidated] = useState<Array<any>>();
  const [listOrdersValidateNotYet, setListOrdersValidateNotYet] =
    useState<Array<any>>();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [open, setOpen] = useState(false);

  const setOpenChangeHandler = (e: boolean) => {
    setOpen(e);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const ordersValidated: Array<any> = [];
      const ordersValidatedNotYet: Array<any> = [];
      const snapshot = await Order.get();
      snapshot.docs.forEach((doc) => {
        if (doc.data().accept) {
          ordersValidated.push({ id: doc.id, ...doc.data() });
        } else {
          ordersValidatedNotYet.push({ id: doc.id, ...doc.data() });
        }
      });
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
          <ListOrderDetail
            validated={validated}
            open={open}
            setOpenChangeHandler={setOpenChangeHandler}
            listOrders={listOrdersValidated}
          />
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
            <ListOrderDetail
              validated={validated}
              open={open}
              setOpenChangeHandler={setOpenChangeHandler}
              listOrders={listOrdersValidateNotYet}
            />
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
