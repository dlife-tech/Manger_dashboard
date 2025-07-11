import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HostelRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    hostel_count: "",
    hostel_types: [],
    furnishing: "",
    amenities: [],
    hostel_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [hostels, setHostels] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHostels = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:2002/hostel");
      const data = await res.json();
      setHostels(data);
    } catch (error) {
      alert("Error fetching hostels!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHostels();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        hostel_count: state.hostel_count || "",
        hostel_types: state.hostel_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        hostel_images: state.hostel_images || [],
        description: state.description || "",
        address: state.address || "",
        city: state.city || "",
        state: state.state || "",
        pincode: state.pincode || "",
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let arr = prev[field] || [];
      if (checked) {
        arr = [...arr, value];
      } else {
        arr = arr.filter((item) => item !== value);
      }
      return {
        ...prev,
        [field]: arr,
      };
    });
  };

  // Append images instead of replacing
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files);
      Promise.all(
        fileArr.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      )
        .then((base64Images) => {
          setFormData((prev) => ({
            ...prev,
            hostel_images: [...prev.hostel_images, ...base64Images],
          }));
        })
        .catch(() => alert("Image upload error!"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/HostelRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Hostel",
    };

    try {
      const url = editId
        ? `http://localhost:2002/hostel/${editId}`
        : "http://localhost:2002/hostel";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Hostel ${editId ? "updated" : "registered"} successfully`);
        fetchHostels();
        setFormData({
          hostel_count: "",
          hostel_types: [],
          furnishing: "",
          amenities: [],
          hostel_images: [],
          description: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
        setEditId(null);
        navigate("/dashboard");
      } else {
        const errData = await res.json();
        alert("Submission failed: " + (errData.message || res.statusText));
      }
    } catch (error) {
      alert("Submission error: " + error.message);
    }
  };

  const handleEdit = (hostel) => {
    setEditId(hostel._id);
    setFormData({
      hostel_count: hostel.hostel_count || "",
      hostel_types: hostel.hostel_types || [],
      furnishing: hostel.furnishing || "",
      amenities: hostel.amenities || [],
      hostel_images: hostel.hostel_images || [],
      description: hostel.description || "",
      address: hostel.address || "",
      city: hostel.city || "",
      state: hostel.state || "",
      pincode: hostel.pincode || "",
    });

    navigate("/dashboard/HostelRegistration1", { state: hostel });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hostel?")) {
      try {
        const res = await fetch(`http://localhost:2002/hostel/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchHostels();
        } else {
          alert("Delete failed");
        }
      } catch (error) {
        alert("Delete error: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{editId ? "Edit Hostel Registration" : "Hostel Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="hostel_count" className="form-label">
            Hostel Count
          </label>
          <input
            type="number"
            id="hostel_count"
            name="hostel_count"
            value={formData.hostel_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hostel Types</label>
          <div>
            {["Boys", "Girls", "Co-Ed"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`hostel_type_${type}`}
                  name="hostel_types"
                  value={type}
                  checked={formData.hostel_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "hostel_types")}
                />
                <label className="form-check-label" htmlFor={`hostel_type_${type}`}>
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="furnishing" className="form-label">
            Furnishing
          </label>
          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Amenities</label>
          <div>
            {["WiFi", "Mess", "Laundry", "Parking", "Security"].map((amenity) => (
              <div className="form-check form-check-inline" key={amenity}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`amenity_${amenity}`}
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={(e) => handleCheckboxChange(e, "amenities")}
                />
                <label className="form-check-label" htmlFor={`amenity_${amenity}`}>
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="hostel_images" className="form-label">
            Hostel Images
          </label>
          <input
            type="file"
            id="hostel_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.hostel_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.hostel_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`hostel-${idx}`}
                  width="100"
                  height="70"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="form-control"
              maxLength={6}
              pattern="\d{6}"
              title="6 digit pincode"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update Hostel" : "Register Hostel"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/HostelRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Hostels</h3>

      <div className="table-responsive">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Hostel Count</th>
                <th>Types</th>
                <th>Furnishing</th>
                <th>Amenities</th>
                <th>Images</th>
                <th>Description</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostels.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    No hostels registered yet.
                  </td>
                </tr>
              ) : (
                hostels.map((hostel) => (
                  <tr key={hostel._id}>
                    <td>{hostel.hostel_count}</td>
                    <td>{(hostel.hostel_types || []).join(", ")}</td>
                    <td>{hostel.furnishing}</td>
                    <td>{(hostel.amenities || []).join(", ")}</td>
                    <td>
                      {(hostel.hostel_images || []).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`hostel-${idx}`}
                          width="50"
                          height="40"
                          className="me-1 rounded"
                          style={{ objectFit: "cover" }}
                        />
                      ))}
                    </td>
                    <td>{hostel.description}</td>
                    <td>{hostel.address}</td>
                    <td>{hostel.city}</td>
                    <td>{hostel.state}</td>
                    <td>{hostel.pincode}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(hostel)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(hostel._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HostelRegistration2;