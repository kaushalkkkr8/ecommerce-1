import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductDetailPage = () => {
  const location = useLocation();
  const data = location.state;
  const dispatch=useDispatch()
  const [showToast, setShowToast] = useState(false)

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    setShowToast(true); 
      setTimeout(() => setShowToast(false), 3000); 
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container-fluid text-bg-dark p-3">

      {showToast && (
           <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
           <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
             <div className="d-flex">
               <div className="toast-body">Added to cart</div>
               <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
             </div>
           </div>
         </div>
      )}
        {data && (
          <>
            <div className="container py-4">
              <div className="row   ">
                <div className="col-md-6">
                  <img src={data.image} className="img-fluid w-100 " alt="" />
                  <button className="btn rounded-0 btn-warning w-100" onClick={() => addToCartHandler(data)}>
                    Add to cart
                  </button>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h4>
                        <i className="bi bi-truck text-warning"></i>
                      </h4>
                      <p>Free Delivery</p>
                    </div>
                    <div className="col">
                      <h4>
                        <i className="bi bi-c-square text-warning"></i>
                      </h4>
                      <p>COD</p>
                    </div>
                    <div className="col">
                      <h4>
                        <i className="bi bi-credit-card-2-front text-warning"></i>
                      </h4>
                      <p>Secure Payment</p>
                    </div>
                    <div className="col">
                      <h5>
                        <i className="bi bi-box2-fill text-warning"></i>
                      </h5>
                      <p>10 Days Return</p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-md-6 ">
                  <div className="mx-4">
                    <p className="fw-bold">{data.name}</p>
                    <p>
                      <i className={`bi ${data.rating >= 1 ? "bi-star-fill" : data.rating == 0.5 ? "bi-star-half" : "bi-star"} text-warning`}></i>
                      <i className={`bi ${data.rating >= 2 ? "bi-star-fill" : data.rating == 1.5 ? "bi-star-half" : "bi-star"} text-warning`}></i>
                      <i className={`bi ${data.rating >= 3 ? "bi-star-fill" : data.rating == 2.5 ? "bi-star-half" : "bi-star"} text-warning`}></i>
                      <i className={`bi ${data.rating >= 4 ? "bi-star-fill" : data.rating == 3.5 ? "bi-star-half" : "bi-star"} text-warning`}></i>
                      <i className={`bi ${data.rating == 5 ? "bi-star-fill" : data.rating == 4.5 ? "bi-star-half" : "bi-star"} text-warning`}></i>
                    </p>
                    <h5>
                      ₹ {data.price}{" "}
                      <span>
                        <del>₹{data.price * 2 - 1}</del>
                      </span>
                    </h5>
                    <p>50% Off</p>

                  
                   
                  </div>
                  <hr />
                  <p className="fw-bold">Description</p>
                  <p className="">{data.description}</p>
                </div>
              </div>
              <hr />
          
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductDetailPage;
