import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function HotelRegistration1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
   
    hotel_name: "",
  });

  // Prefill form data on edit
  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/HotelRegistration2", { state: formData });
    // console.log(formData)
  };
  
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/hotel");
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        alert("Failed to fetch data");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    navigate("/dashboard/HotelRegistration1", { state: item });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Hotel Owner Info</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                  required
                />
              </div>
             
              
              <div className="mb-3">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="hotel_name"
                  value={formData.hotel_name}
                  onChange={handleInput}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Save & Next
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table Below */}
      <div className="container mt-5">
        <h3 className="text-center mb-3">All Registered Owners</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hotel Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((owner, index) => (
                  <tr key={owner._id || index}>
                    <td>{owner.full_name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone}</td>
                    <td>{owner.hotel_name}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(owner)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HotelRegistration1;
