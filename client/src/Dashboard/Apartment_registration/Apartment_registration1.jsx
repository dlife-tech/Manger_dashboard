import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ApartmentRegistration1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    
    apartment_name: "",
  });

  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Prefill data if location.state exists
  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
      setEditId(location.state._id || null);
    }
  }, [location.state]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all apartments
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/apartment");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDataList(data);
    } catch (error) {
      console.error("Error fetching apartment data:", error);
      alert("Failed to fetch apartment data. Please try again later.");
    }
  };

  // Handle form input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic validation
  const validateForm = () => {
    const { full_name, email, phone, password, apartment_name } = formData;
    if (!full_name || !email || !phone || !password || !apartment_name) {
      alert("All fields are required.");
      return false;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    // Basic phone number check (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    // Password length check
    if (password.length < 4) {
      alert("Password must be at least 4 characters.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/dashboard/ApartmentRegistration2", {
      state: { ...formData, _id: editId },
    });
  };

  // Handle edit button
  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
    window.scrollTo(0, 0); // Scroll to form
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Apartment Registration</h2>
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
                  maxLength={10}
                />
              </div>
             
              <div className="mb-3">
                <label className="form-label">Apartment Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="apartment_name"
                  value={formData.apartment_name}
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

      {/* Data Table */}
      <div className="row mt-5">
        <div className="col">
          <h3>Apartment List</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Apartment Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => (
                <tr key={item._id}>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.apartment_name}</td>
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
                  <td colSpan="6" className="text-center">
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

export default ApartmentRegistration1