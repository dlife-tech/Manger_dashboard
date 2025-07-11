import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GuestHouseRegistration1() {
  const navigate = useNavigate();
  const location = useLocation();

  const [guestHouses, setGuestHouses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    guest_house_name: "",
  });

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
      setEditMode(true);
      setEditId(location.state._id || null);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/dashboard/GuestHouseRegistration2", {
      state: { ...formData, _id: editId },
    });
  };

  const handleEdit = (guestHouse) => {
    navigate("/dashboard/GuestHouseRegistration1", { state: guestHouse });
  };

  useEffect(() => {
    const fetchGuestHouses = async () => {
      try {
        const response = await fetch("http://localhost:2002/guesthouse");
        const data = await response.json();
        setGuestHouses(data);
      } catch (error) {
        console.error("Error fetching guest house data:", error);
      }
    };

    fetchGuestHouses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4 shadow">
            <h2 className="mb-4">Guest House</h2>
            <form onSubmit={handleNext}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                />
              </div>

              

              <div className="mb-3">
                <label className="form-label">Guest House Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="guest_house_name"
                  value={formData.guest_house_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {editMode ? "Update & Next" : "Next Step"}
              </button>
            </form>
          </div>
        </div>

        <div className="container mt-5">
          <h2 className="mb-4">Registered Guest Houses</h2>
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Guest House Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {guestHouses.length > 0 ? (
                guestHouses.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.full_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.guest_house_name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(item)}
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

export default GuestHouseRegistration1;
