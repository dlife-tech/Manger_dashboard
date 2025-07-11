import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PlaceRegistration1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
 
    palace_name: "",
  });

  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Prefill data if location.state exists
  useEffect(() => {
    if (location.state) {
      setFormData({
        full_name: location.state.full_name || "",
        email: location.state.email || "",
        phone: location.state.phone || "",
        password: location.state.password || "",
        palace_name: location.state.palace_name || "",
      });
      setEditId(location.state._id || null);
    }
  }, [location.state]);
  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all data with error handling
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/palace");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDataList(data);
    } catch (error) {
      console.error("Error fetching place data:", error);
      alert("Failed to fetch place data. Please try again later.");
    }
  };

  // Handle form input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation: check all fields are filled
    if (
      !formData.full_name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.palace_name.trim()
    ) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    navigate("/dashboard/PlaceRegistration2", {
      state: { ...formData, _id: editId },
    });
  };
  // Handle edit button
  const handleEdit = (item) => {
    setFormData({
      full_name: item.full_name || "",
      email: item.email || "",
      phone: item.phone || "",
      password: item.password || "",
      palace_name: item.palace_name || "",
    });
    setEditId(item._id);
    window.scrollTo(0, 0);
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Place Registration</h2>
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
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                />
              </div>

             

              <div className="mb-3">
                <label className="form-label">Palace Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="palace_name"
                  value={formData.palace_name}
                  onChange={handleInput}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div className="row mt-5">
        <div className="col">
          <h3>Place List</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Palace Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr key={item._id}>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.palace_name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {dataList.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data available.
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

export default PlaceRegistration1;