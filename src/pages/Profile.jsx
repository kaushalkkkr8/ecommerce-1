import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { deleteAddress, fetchaddress, postAddress } from "../features/addressSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [addres, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const { address } = useSelector((state) => state.address);

  const addressSubmit = (e) => {
    e.preventDefault();

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
    dispatch(fetchaddress());
  }, [dispatch]);
  const deleteAdd = (id) => {
    dispatch(deleteAddress(id));
  };
  return (
    <>
      <Navbar showSearch={false} />
      <div className="text-bg-dark" style={{ minHeight: "100vh" }}>
        <div className="text-center  py-5">
          <h1>Kaushal</h1>
          <div className="d-flex justify-content-center">
            <div
              className="d-flex rounded-circle   "
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#e9ecef",
              }}
            >
              <img
                src="https://dhk-kozijnen.nl/wp-content/uploads/2022/02/portrait-white-man-isolated-scaled.jpg"
                className="rounded-circle  "
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "#e9ecef",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
        <div className="m-5 " >
          <div className="card p-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <h5 className="card-header text-center">Address</h5>
                  {Array.isArray(address) &&
                    address?.map((addr) => (
                      <>
                        <div className="card mx-4 my-2" key={addr._id}>
                          <div className="card-body">
                            <p>
                              {" "}
                              {addr.name},{addr.address1},{addr.city},{addr.state},{addr.pincode}
                              <button className="btn btn-danger rounded float-end" onClick={() => deleteAdd(addr?._id)}>
                                <i className="bi bi-trash3-fill "></i>
                              </button>
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mx-4 ">
                  <p className="gap-1">
                    <button
                      className="btn btn-outline-secondary text-bg-light dropdown-toggle w-100"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample2"
                      aria-expanded="false"
                      aria-controls="collapseExample2"
                    >
                      <b>Add Address</b>
                    </button>
                  </p>
                  <div className="collapse " id="collapseExample2">
                    <div className="card ">
                      <div className="card-body">
                        <form className="m-3" onSubmit={addressSubmit}>
                          <input type="text" className="form-control my-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                          <input type="text" className="form-control my-2" value={addres} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                          <input type="text" className="form-control my-2" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                          <input type="text" className="form-control my-2" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
                          <input type="text" className="form-control my-2" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
                          <br />
                          <button className="btn btn-outline-success" type="submit">
                            Add address
                          </button>
                        </form>
                      </div>
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

export default Profile;
