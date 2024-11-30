import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { deleteCartItem, fetchCartItem, updateCartStat } from "../features/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAddress, fetchaddress, postAddress } from "../features/addressSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [addres, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [quantities, setQuantities] = useState({});

  const [selectedAddress, setSelectedAddress] = useState("");

  const { cart, cartStat, status, error } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.address);

  useEffect(() => {
    if (cart.length > 0) {
      const initialQuantities = cart.reduce((acc, prod) => {
        acc[prod._id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      const totalItem = cart.reduce((acc, curr) => acc + (quantities[curr._id] || 1), 0);
      const totalAmount = cart.reduce((acc, curr) => acc + parseInt(curr.price) * quantities[curr._id], 0);
      dispatch(updateCartStat({ totalItem, totalAmount }));
    }
  }, [cart, dispatch, quantities]);

  const updateQuantity = (prodId, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [prodId]: Math.max(1, (prevQuantities[prodId] || 1) + delta),
    }));
  };

  const clickHandlerDelete = (prodId) => {
    dispatch(deleteCartItem(prodId));
  };
  const addressSubmit = () => {
    const address = {
      name: name,
      address1: addres,
      city: city,
      state: state,
      pincode: pincode,
    };
    dispatch(postAddress(address));
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
  };

  useEffect(() => {
    dispatch(fetchCartItem());

    dispatch(fetchaddress());
  }, [dispatch]);

  const orderItems = Array.isArray(cart)
    ? cart.map((item) => ({
        productId: item._id,
        productName: item.name,
        quantity: quantities[item._id],
        price: parseInt(item.price, 10),
      }))
    : [];

  const orderDetails = {
    orderName: "My Order",
    items: orderItems,
    address: selectedAddress,
    itemCount: cartStat.totalItem,
    orderPrice: cartStat.totalAmount,
  };

  const deleteAdd = (id) => {
    dispatch(deleteAddress(id));
  };

  return (
    <>
      <Navbar showSearch={false} />
      {status === "loading" && <p>Loading...</p>}

      <div className="container-fluid text-bg-dark p-3">
        <h2 className="text-center">Your Cart</h2>
        <div className="container py-4">
          <div className="row bg-light shadow p-5">
            <div className="col-md-6">
              {status !== "loading" &&
                (cart.length > 0 ? (
                  cart.map((prod) => (
                    <div className="p-2" key={prod._id}>
                      <div className="card mb-3 border-0 shadow">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <img src={prod.image} className="card-img rounded-start" alt="Product" />
                          </div>
                          <div className="col-md-6">
                            <div className="card-body">
                              <h5 className="card-title">{prod.name}</h5>
                              <h4 className="fw-bold">
                                ₹ {prod.price}{" "}
                                <span className="text-secondary">
                                  <del>₹ {prod.price * 2}</del>
                                </span>
                              </h4>
                              <p className="fw-bold">50% off</p>
                              <div className="row">
                                <div className="col-md-5">
                                  <p>Quantity:</p>
                                </div>
                                <div className="col-md-5">
                                  <h5>
                                    <i className="bi bi-plus-circle" style={{ cursor: "pointer" }} onClick={() => updateQuantity(prod._id, 1)}></i>
                                    <span className="mx-2">{quantities[prod._id] || 1}</span>
                                    <i className="bi bi-dash-circle" style={{ cursor: "pointer" }} onClick={() => updateQuantity(prod._id, -1)}></i>
                                  </h5>
                                </div>
                                <div className="col-md-2">
                                  <button className="btn rounded-0 btn-danger float-end" onClick={() => clickHandlerDelete(prod._id)}>
                                    <i className="bi bi-trash3-fill"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-dark">
                    <h1>Your cart is empty</h1>
                  </div>
                ))}


<div className="card p-3 ">
                <div className="card-body">
                  <p className="fw-bold">Price Details</p>
                  <hr />

                  {cartStat && (
                    <>
                      <h5>
                        Total Products<span className="float-end"> {cartStat.totalItem}-items </span>
                      </h5>
                      <h5>
                        {" "}
                        Price<span className="float-end"> {cartStat.totalAmount} </span>
                      </h5>

                      <hr />
                      <p className="fw-bold">
                        Total Amount: <span className="float-end">₹ {cartStat.totalAmount}</span>
                      </p>
                    </>
                  )}
                  <div className="d-flex justify-content-center">
                    {selectedAddress && cart.length > 0 ? (
                      <Link to="/order" state={orderDetails} className="btn btn-primary">
                        Checkout
                      </Link>
                    ) : (
                      <button className="btn btn-primary" onClick={() => alert("Please select an address to proceed to checkout. or cart is empty")}>
                        Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card  p-3">
                <div className="card-body ">
                  <div className="card">
                    <div className="card-body">
                      <form className="">
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <input type="text" className="form-control" value={addres} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

                        <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                        <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                        <input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" />
                        <br />
                        <button className="btn btn-outline-primary" type="button" onClick={addressSubmit}>
                          Add address
                        </button>
                      </form>
                    </div>
                  </div>
                  <div>
                    {Array.isArray(address) &&
                      address?.map((addr) => (
                        <div className="card my-1" key={addr._id}>
                          <div className="card-body">
                            <p>
                              {" "}
                              <input
                                type="radio"
                                value={addr.name + "," + addr.address1 + "," + addr.city + "," + addr.state + "," + addr.pincode}
                                name="address"
                                onChange={(e) => setSelectedAddress(e.target.value)}
                              />{" "}
                              {addr.name},{addr.address1},{addr.city},{addr.state},{addr.pincode}
                            </p>
                            <button className="btn rounded-0 float-end" onClick={() => deleteAdd(addr?._id)}>
                              <i className="bi bi-trash3-fill text-danger"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
