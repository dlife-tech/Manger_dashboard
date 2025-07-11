import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResortRegistration1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    
    resort_name: "",
    _id: null, // <-- Add _id for edit support
  });

  const [resorts, setResorts] = useState([]);

  // Fetch resort list
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/resort");
      if (res.ok) {
        const result = await res.json();
        setResorts(result);
      } else {
        alert("Failed to fetch data");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // On mount
  useEffect(() => {
    fetchData();
  }, []);

  // Prefill form if edit data exists
  useEffect(() => {
    if (location.state) {
      setFormData({
        ...location.state,
        _id: location.state._id || null,
      });
    }
  }, [location.state]);

  // Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass _id if editing
    navigate("/dashboard/ResortRegistration2", { state: formData });
  };

  // Edit handler
  const handleEdit = (item) => {
    // Pass _id for edit
    navigate("/dashboard/ResortRegistration1", { state: item });
  };

  return (
    <div className="container mt-4">
      {/* Resort Registration Form */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Resort Registration</h2>
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
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              

              <div className="mb-3">
                <label className="form-label">Resort Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="resort_name"
                  value={formData.resort_name}
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

      {/* Resort List Table */}
      <div className="mt-5">
        <h3 className="mb-3">Registered Resorts</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Resort Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resorts.map((resort) => (
                <tr key={resort._id}>
                  <td>{resort.full_name}</td>
                  <td>{resort.email}</td>
                  <td>{resort.phone}</td>
                  <td>{resort.resort_name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(resort)}
                    >
                      Edit
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResortRegistration1;