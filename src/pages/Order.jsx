import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOrder, postOrder } from "../features/orderSlice";
import { deleteCartItem } from "../features/cartSlice";

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const order = location?.state;
  console.log(order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const placeOrder = () => {
    dispatch(postOrder(order));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/allcategory");
    }, 1500);

     order.items.forEach((item) =>  dispatch(deleteCartItem(item.productId)));
 
  };

  return (
    <>
      <Navbar showSearch={false} />

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">Order Complete</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid text-bg-dark p-3" style={{ minHeight: "100vh" }}>
        <h2 className="text-center">Your Cart</h2>
        <div className="container py-4">
          <div className=" bg-light shadow p-5">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h3 className="col">Name of Product</h3>
                  <h3 className="col">Order Quantity</h3>
                  <h3 className="col">Order Price</h3>
                  <h3 className="col text-center">Total Price</h3>
                </div>

                {order &&
                  order?.items?.map((item) => (
                    <div key={item._id}>
                      <div className="row">
                        <h5 className="col text-center">{item.productName}</h5>
                        <h5 className="col text-center"> {item.quantity}</h5>
                        <h5 className="col text-center"> {item.price}</h5>
                        <h5 className="col text-center"> {item.quantity * item.price}</h5>
                      </div>
                      <hr />
                    </div>
                  ))}
                <div className="d-flex container px-5">
                  <h5>Total</h5>
                  <h5 className="ms-auto me-5">{order?.items?.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)}</h5>
                </div>
                <div className="d-flex container px-5">
                  <p>
                    <b>Address:</b> {order?.address}
                  </p>
                  <button className="btn btn-success  ms-auto " onClick={placeOrder}>
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
