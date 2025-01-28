import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProductWishlist } from "../features/productSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const WishList = () => {
  const [showToast, setShowToast] = useState(false)
  const dispatch=useDispatch()
  const { products, status, error } = useSelector((state) => state.products);
 
  

  const data = products?.filter(prod=>prod.wishlist===true);

  useEffect(() => {

    dispatch(fetchProducts());
  }, [dispatch]);

  const wishListClickHandler = (prodId) => {
    const product = data.find((prod) => prod._id === prodId);
    const newWishlistStatus = !product.wishlist;
    dispatch(updateProductWishlist({ id: prodId, updatedData: { wishlist: newWishlistStatus } }));
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    setShowToast(true); 
    setTimeout(() => setShowToast(false), 2000); 
  };
  return (
    <>
      <Navbar showSearch={false} />
 
    
      {error && <p>{error}</p>}

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

      <div className="container-fluid text-bg-dark p-3 " style={{ minHeight: "100vh" }}>
        <h2 className="text-center">Wishlist</h2>
        {status === "loading" ? (
                <div className="text-center">
                  {" "}
                  <div class="spinner-border text-warning" role="status"></div>
                </div>):(<div className="container py-4">
          
            {data.length>0
              ? data.map((prod) => (
                  <div className="col-md-3 p-2" key={prod._id}>
                    <div className="card card border-0 shadow">
                    <Link to={`/allcategory/${prod._id}`} state={prod}>
                      <img src={prod.image} className="card-img-top" alt="..." />
                    </Link>
                      <div className="card-body text-center  ">
                        <p>
                          {prod.name}
                          <i className={prod.wishlist ? "bi bi-heart-fill float-end text-danger" : "bi bi-heart float-end text-danger"} onClick={() => wishListClickHandler(prod._id)}></i>
                        </p>
                        <h4 className="fw-bold">₹ 2000</h4>
                      </div>
                      <div className="">
                      <button className="btn rounded-0 btn-warning w-100" onClick={() => addToCartHandler(prod)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : (
                <div className="text-center text-dark">
                  <h1>Your wishlist is empty</h1>
                </div>
              )}
          
        </div>)}
        
      </div>
    </>
  );
};
export default WishList;
