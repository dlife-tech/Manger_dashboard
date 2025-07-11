import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResortRegistration2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    resort_count: "",
    resort_types: [],
    furnishing: "",
    amenities: [],
    resort_images: [],
    description: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [resorts, setResorts] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch resorts
  const fetchResorts = async () => {
    try {
      const res = await fetch("http://localhost:2002/resort");
      const data = await res.json();
      setResorts(data);
    } catch (error) {
      console.error("Error fetching resorts:", error);
    }
  };

  useEffect(() => {
    fetchResorts();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        resort_count: state.resort_count || "",
        resort_types: state.resort_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        resort_images: state.resort_images || [],
        description: state.description || "",
        address: state.address || "",
        state: state.state || "",
        city: state.city || "",
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
            resort_images: [...prev.resort_images, ...base64Images],
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/ResortRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Resort",
    };

    try {
      const url = editId
        ? `http://localhost:2002/resort/${editId}`
        : "http://localhost:2002/resort";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Resort ${editId ? "updated" : "registered"} successfully`);
        fetchResorts();
        setFormData({
          resort_count: "",
          resort_types: [],
          furnishing: "",
          amenities: [],
          resort_images: [],
          description: "",
          address: "",
          state: "",
          city: "",
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
      console.error(error);
    }
  };

  const handleEdit = (resort) => {
    setEditId(resort._id);
    setFormData({
      resort_count: resort.resort_count || "",
      resort_types: resort.resort_types || [],
      furnishing: resort.furnishing || "",
      amenities: resort.amenities || [],
      resort_images: resort.resort_images || [],
      description: resort.description || "",
      address: resort.address || "",
      state: resort.state || "",
      city: resort.city || "",
      pincode: resort.pincode || "",
    });

    navigate("/dashboard/ResortRegistration1", { state: resort });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resort?")) {
      try {
        const res = await fetch(`http://localhost:2002/resort/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchResorts();
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
      <h2 className="mb-4">{editId ? "Edit Resort Registration" : "Resort Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Resort Count</label>
            <input
              type="number"
              className="form-control"
              name="resort_count"
              value={formData.resort_count}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Resort Types</label>
            <div>
              {["Luxury", "Budget", "Eco", "Waterfront"].map((type) => (
                <div className="form-check form-check-inline" key={type}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`resort_type_${type}`}
                    name="resort_types"
                    value={type}
                    checked={formData.resort_types.includes(type)}
                    onChange={(e) => handleCheckboxChange(e, "resort_types")}
                  />
                  <label className="form-check-label" htmlFor={`resort_type_${type}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Furnishing</label>
            <select
              className="form-select"
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi Furnished">Semi Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Amenities</label>
            <div>
              {["Pool", "Wi-Fi", "Gym", "Parking"].map((amenity) => (
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
          <div className="col-md-12 mb-3">
            <label className="form-label">Resort Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="mt-2 d-flex flex-wrap gap-2">
              {formData.resort_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`resort-${idx}`}
                  width="80"
                  height="80"
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />
              ))}
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            ></textarea>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              maxLength={6}
              pattern="\d{6}"
              title="6 digit pincode"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100">
          {editId ? "Update Resort" : "Register Resort"}
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/dashboard/ResortRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Resorts</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Images</th>
              <th>Count</th>
              <th>Types</th>
              <th>Furnishing</th>
              <th>Amenities</th>
              <th>State</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Address</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resorts.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No resorts registered yet.
                </td>
              </tr>
            ) : (
              resorts.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {item.resort_images?.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`resort-${i}`}
                          width="60"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                        />
                      ))}
                    </div>
                  </td>
                  <td>{item.resort_count}</td>
                  <td>{(item.resort_types || []).join(", ")}</td>
                  <td>{item.furnishing}</td>
                  <td>{(item.amenities || []).join(", ")}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>{item.pincode}</td>
                  <td>{item.address}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mb-1 w-100"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResortRegistration2;