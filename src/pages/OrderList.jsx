import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchOrder } from "../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const OrderList = () => {
  const dispatch = useDispatch();
  let { order, status, error } = useSelector((state) => state.order);
 order=order?.order

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  return (
    <>
      <Navbar  showSearch={false}/>

      {error && <p>{error}</p>}
      <div className="text-bg-dark" style={{ minHeight: "100vh" }}>
        <div className="container">
          {status === "loading" ? (
            <div className="text-center">
              {" "}
              <div className="spinner-border text-warning" role="status"></div>
            </div>
          ) : (
            <div>
              <h1 className="text-center">Order List</h1>
              {order?.length > 0 ? (
                order.map((ord, index) => {
                  const date = new Date(ord?.createdAt);
                  return (
                    <div className="card mb-2" key={ord._id || index}>
                      <div className="card-header">
                        {" "}
                        <b>Order Id:</b> {ord?._id} &nbsp; <b>Date:</b> {date.toLocaleDateString("en-IN")}
                      </div>
                      <div className="card-body">
                        <table className="table table-borderless">
                          <tbody>
                            {ord.items?.map((product, prodIndex) => (
                              <tr key={product.id || prodIndex}>
                                <th scope="row">{prodIndex + 1}</th>
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>₹{product.price}</td>
                                <td>₹{product.quantity * product.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="row  ">
                          <div className="col-md-6 ">
                            <p>
                              <b>Address:</b> {ord?.address}
                            </p>
                          </div>
                          <div className="col-md-3"></div>
                          <div className=" col-md-3  ">
                            <p>
                              {" "}
                              <b>Total: </b> &nbsp; &nbsp; ₹ {ord?.orderPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center ">
                  <h5>No orders available</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default OrderList;
