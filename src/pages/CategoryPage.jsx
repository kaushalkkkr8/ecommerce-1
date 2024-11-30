import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProductWishlist } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { Link, useLocation } from "react-router-dom";

const CategoryPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const initialGender = location.state ? [location.state] : [];

  const [gender, setGender] = useState(initialGender);
  const [rating, setRating] = useState("all");
  const [filteredData, setFilterData] = useState([]);
  const [range, setRange] = useState(0);
  const [sorted, setSorted] = useState("none");

  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    filterData();
  }, [gender, rating, range, sorted, products, searchTerm]);

  const sorting = (e) => {
    setSorted(e.target.value);
  };

  const genderFilter = (e) => {
    const { value, checked } = e.target;
    setGender((prevData) => (checked ? [...prevData, value] : prevData.filter((data) => data !== value)));
  };
  const ratingFilter = (e) => {
    setRating(e.target.value);
  };
  const rangeHandler = (e) => {
    setRange(parseInt(e.target.value));
  };

  const clearFilter = () => {
    setGender([]);
    setRating("all");
    setRange(0);
    setSorted("none");
  };

  const filterData = () => {
    let filtered = products;

    if (gender.length > 0) {
      filtered = filtered?.filter((prod) => gender.includes(prod.category));
    }

    if (rating !== "all") {
      filtered = filtered.filter((prod) => prod.rating >= parseInt(rating));
    }

    if (range !== 0) {
      filtered = filtered.filter((prod) => prod.price >= range);
    }

    if (sorted === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sorted === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    if (searchTerm) {
      filtered = filtered.filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilterData(filtered);
  };

  const handleSearch = (term) => setSearchTerm(term);

  const wishListClickHandler = (prodId) => {
    const product = products.find((prod) => prod._id === prodId);
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
      <Navbar onSearch={handleSearch} showSearch={true} />

      {status === "loading" && <p>Loading...</p>}
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

      <div className="bg-dark" style={{ minHeight: "100vh" }}>
        <div className="p-4">
          <div className="row">
            <div className="col-md-2 text-bg-dark bg-opacity-80">
              {/* Range */}
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between">
                    <h5>Filter</h5>
                    <button className="btn btn-primary" onClick={clearFilter}>
                      Clear
                    </button>
                  </div>

                  <label htmlFor="customRange2" className="form-label">
                    Price
                  </label>
                  <div className="range-labels d-flex justify-content-between ">
                    <p>0</p>
                    <p className="ms-4">1000</p>
                    <p>2000</p>
                  </div>
                  <input type="range" className="form-range" min="0" max="2000" step="1000" value={range} onChange={rangeHandler} id="customRange2" />
                </div>
              </div>

              <br />
              {/* Category gender */}
              <div>
                <label>Category</label>
                <br />
                <br />
                <input type="checkbox" name="category" id="" value="Male" onChange={genderFilter} checked={gender.includes("Male")} /> Men Clothing
                <br />
                <input type="checkbox" name="category" id="" value="Female" onChange={genderFilter} checked={gender.includes("Female")} /> Women Clothing
                <br />
                <input type="checkbox" name="category" id="" value="Kids" onChange={genderFilter} checked={gender.includes("Kids")} /> Kids Clothing
                <br />
              </div>

              <br />
              {/*Rating  */}
              <div>
                <label htmlFor="">Rating: </label>
                <br />
                <input type="radio" name="rating" value="4" onChange={ratingFilter} checked={rating === "4"} /> 4 Star and Above
                <br />
                <input type="radio" name="rating" value="3" onChange={ratingFilter} checked={rating === "3"} /> 3 Star and Above
                <br />
                <input type="radio" name="rating" value="2" onChange={ratingFilter} checked={rating === "2"} /> 2 Star and Above
                <br />
                <input type="radio" name="rating" value="all" onChange={ratingFilter} checked={rating === "all"} /> All
              </div>
              <br />
              {/* Sort by price              */}
              <div>
                <label htmlFor="">Short By</label>
                <br />
                <input
                  type="radio"
                  name="sort"
                  value="lowToHigh"
                  onClick={sorting}
                  //   checked={sorted === "lowToHigh"}
                />{" "}
                Low to High
                <br />
                <input
                  type="radio"
                  name="sort"
                  value="highToLow"
                  onClick={sorting}
                  //   checked={sorted === "highToLow"}
                />{" "}
                High to Low
              </div>
            </div>

            <div className="col-md-10">
              <div className="row">
                {filteredData?.map((prod, index) => (
                  <div className="col-md-3 my-2" key={index}>
                    <div className="card border-0 shadow">
                      <Link to={`/allcategory/${prod._id}`} state={prod}>
                        <img src={prod.image} className="card-img-top" alt={prod.name} />
                      </Link>
                      <div className="card-body text-center ">
                        <p style={{ cursor: "pointer" }}>
                          <b>{prod.name} </b>
                          <i className={prod.wishlist ? "bi bi-heart-fill float-end text-danger" : "bi bi-heart float-end text-danger"} onClick={() => wishListClickHandler(prod._id)}></i>
                        </p>
                        <p>
                          <i className={`bi ${prod.rating >= 1 ? "bi-star-fill" : prod.rating == 0.5 ? "bi-star-half" : "bi-star"} text-danger`}></i>
                          <i className={`bi ${prod.rating >= 2 ? "bi-star-fill" : prod.rating == 1.5 ? "bi-star-half" : "bi-star"} text-danger`}></i>
                          <i className={`bi ${prod.rating >= 3 ? "bi-star-fill" : prod.rating == 2.5 ? "bi-star-half" : "bi-star"} text-danger`}></i>
                          <i className={`bi ${prod.rating >= 4 ? "bi-star-fill" : prod.rating == 3.5 ? "bi-star-half" : "bi-star"} text-danger`}></i>
                          <i className={`bi ${prod.rating == 5 ? "bi-star-fill" : prod.rating == 4.5 ? "bi-star-half" : "bi-star"} text-danger`}></i>
                        </p>
                        <h4 className="fw-bold">₹ {prod.price}</h4>
                      </div>
                      <div className="">
                        <button className="btn rounded-0 btn-warning w-100" onClick={() => addToCartHandler(prod)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPage;
