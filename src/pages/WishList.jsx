import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProductWishlist } from "../features/productSlice";

const WishList = () => {

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
    alert(newWishlistStatus===true?"Added to WishList":'Removed from wishlist' )
  };

 
  return (
    <>
      <Navbar showSearch={false} />
 
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="container-fluid text-bg-dark p-3">
        <h2 className="text-center">Wishlist</h2>
        <div className="container py-4">
          <div className="row bg-light shadow p-5">
            {data.length>0
              ? data.map((prod) => (
                  <div className="col-md-3 p-2" key={prod._id}>
                    <div className="card card border-0 shadow">
                      <img src={prod.image} className="card-img-top" alt="..." />
                      <div className="card-body text-center  ">
                        <p>
                          {prod.name}
                          <i className={prod.wishlist ? "bi bi-heart-fill float-end text-danger" : "bi bi-heart float-end text-danger"} onClick={() => wishListClickHandler(prod._id)}></i>
                        </p>
                        <h4 className="fw-bold">₹ 2000</h4>
                      </div>
                      <div className="">
                        <button className="btn rounded-0 btn-warning w-100">Add to cart</button>
                      </div>
                    </div>
                  </div>
                ))
              : (
                <div className="text-center text-dark">
                  <h1>Your wishlist is empty</h1>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WishList;
