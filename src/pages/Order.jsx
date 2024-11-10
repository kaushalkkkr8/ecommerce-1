import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { fetchOrder, postOrder } from "../features/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location?.state;

  console.log("order", order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const placeOrder = () => {
    dispatch(postOrder(order));
    alert("Your Order is placed successfully",navigate('/allcategory'))
    
  };

  return (
    <>
     <Navbar showSearch={false} />
    
      <div className="container-fluid text-bg-dark p-3">
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
                  <button className="btn btn-primary  ms-auto " onClick={placeOrder}>
                    Place Order
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
