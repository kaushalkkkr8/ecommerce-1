import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchOrder, postOrder } from "../features/orderSlice";
import { deleteCartItem } from "../features/cartSlice";

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const order = location?.state;
  console.log(order);

  const placeOrder = () => {
    dispatch(postOrder(order));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/allcategory");
    }, 2000);

    order.items.forEach((item) => dispatch(deleteCartItem(item.productId)));
  };
  const catPage=()=>{
    navigate("/allcategory");
  }

  return (
    <>
      <Navbar showSearch={false} />

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">Order Successfull</div>
              <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                <button className="btn btn-outline-warning" onClick={catPage}>
                  Continue Shopping
                </button>
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid text-bg-dark p-3" style={{ minHeight: "100vh" }}>
        <h2 className="text-center">Your Cart</h2>
        <div className="container py-4">
          <div className="card">
            <div className="card-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col ">
                      {" "}
                      <h3> Product Name</h3>
                    </th>
                    <th scope="col">
                      <h3> Order Quantity</h3>
                    </th>
                    <th scope="col">
                      <h3> Order Price</h3>
                    </th>
                    <th scope="col">
                      <h3> Total Price</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order &&
                    order?.items?.map((item) => (
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          {" "}
                          <h5 className="mx-5">{item.productName}</h5>
                        </td>
                        <td>
                          {" "}
                          <h5 className="mx-5"> {item.quantity}</h5>
                        </td>
                        <td>
                          <h5 className="mx-5"> {item.price}</h5>
                        </td>
                        <td>
                          {" "}
                          <h5 className="mx-5"> {item.quantity * item.price}</h5>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <hr />
              <div className="row  ">
                <div className="col-md-6 text-center">
                  <p>
                    <b>Address:</b> {order?.address}
                  </p>
                </div>
                <div className="col-md-3"></div>
                <div className=" col-md-3 text-center ">
                  <p>
                    {" "}
                    <b>Total: </b> &nbsp; &nbsp; Rs. {order?.items?.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)}
                  </p>
                </div>
                <div className="">
                  <button className="btn btn-success  float-end me-5" onClick={placeOrder}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
