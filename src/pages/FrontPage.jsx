import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const FrontPage = () => {
  return (
    <>
     <Navbar showSearch={false} />
     <div className="bg-dark" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="py-3">
            <div className="row ">
              <div className="col-md-3 mb-2">
                <div className="card" >
                  <Link to="/allcategory">
                    <img src="https://cdn.culture.ru/images/242995c8-4a2b-53a0-aed5-2ea84fcf926b" className="card-img" alt="All" />
                  </Link>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card" >
                  <Link to="/allcategory" state={"Male"}>
                    <img src="https://tver.all-zabor.ru/images/reviews/rev3.jpg" className="card-img" alt="Men" />
                  </Link>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card" >
                  <Link to="/allcategory" state={"Female"}>
                    <img src="https://m.media-amazon.com/images/M/MV5BZjZmNWNhMDUtMWEzNi00NzZhLWFmYzUtNzgxYjg1NzBjZjhlXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" className="card-img" alt="Women" />
                  </Link>
                </div>
              </div>
              <div className="col-md-3 mb-2">
                <div className="card" >
                  <Link to="/allcategory" state={"Kids"}>
                    <img
                      src="https://u.9111s.ru/uploads/202110/05/939fb6b6adb2692af33b2d24266037c6.jpg"
                      className="card-img"
                      alt="Kids"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            <img src="https://demo.clipmydeals.com/4/wp-content/uploads/2024/01/flipkart-e1619775124176.jpg" alt="" className="img-fluid" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="m-3">
                      <img src="https://img.magazin.cz/img/img/2ad5f228a4fd.jpg" alt="summer" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="m-3">
                      <h5>New Arrivals</h5>
                      <p>T-shirt,Boxer,Top..</p>
                      <h5>Summer Collection</h5>
                      <small>Check our new collection to stay cool in style</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="m-3">
                      <img src="https://www.fashionteria.com/wp-content/uploads/2017/06/02-outfit-color-red-romance-1024x682.jpg" alt="summer" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="m-3">
                      <h5>New Arrivals</h5>
                      <p>Woolen Top,Sweat Shirt,Jacket..</p>
                      <h5>Summer Collection</h5>
                      <small>Check our new collection to stay cool in style</small>
                    </div>
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
export default FrontPage;
