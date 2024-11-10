import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addToCart } from "../features/cartSlice";

const ProductDetailPage = () => {
  const location = useLocation();
  const data = location.state;

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container-fluid text-bg-dark p-3">
        {data && (
          <>
            <div className="container py-4">
              <div className="row   ">
                <div className="col-md-6">
                  <img src={data.image} className="img-fluid w-100 " alt="" />
                  <button className="btn rounded-0 btn-warning w-100" onClick={() => addToCartHandler(prod)}>
                    Add to cart
                  </button>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h4>
                        <i class="bi bi-truck text-warning"></i>
                      </h4>
                      <p>Free Delivery</p>
                    </div>
                    <div className="col">
                      <h4>
                        <i class="bi bi-c-square text-warning"></i>
                      </h4>
                      <p>COD</p>
                    </div>
                    <div className="col">
                      <h4>
                        <i class="bi bi-credit-card-2-front text-warning"></i>
                      </h4>
                      <p>Secure Payment</p>
                    </div>
                    <div className="col">
                      <h5>
                        <i class="bi bi-box2-fill text-warning"></i>
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

                    {/* <h5>
                      <i className="bi bi-plus-circle" style={{ cursor: "pointer" }} onClick={clickHandlerCountAdd}></i> <i className={`bi bi-${count}-square `}></i>{" "}
                      <i className="bi bi-dash-circle" style={{ cursor: "pointer" }} onClick={clickHandlerCountSub}></i>
                    </h5> */}
                    <p>
                      <select aria-label="Small select example" className="bg-dark text-white shodow">
                        <option selected>Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </p>
                  </div>
                  <hr />
                  <p className="fw-bold">Description</p>
                  <p className="">{data.description}</p>
                </div>
              </div>
              <hr />
              {/* <h4>More Items related to your choice </h4> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductDetailPage;
