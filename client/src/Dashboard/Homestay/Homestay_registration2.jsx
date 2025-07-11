import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomestayRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    homestay_count: "",
    homestay_types: [],
    furnishing: "",
    amenities: [],
    homestay_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [homestays, setHomestays] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchHomestays = async () => {
    try {
      const res = await fetch("http://localhost:2002/homestay");
      const data = await res.json();
      setHomestays(data);
    } catch (error) {
      console.error("Error fetching homestays:", error);
    }
  };

  useEffect(() => {
    fetchHomestays();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        homestay_count: state.homestay_count || "",
        homestay_types: state.homestay_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        homestay_images: state.homestay_images || [],
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
            homestay_images: base64Images,
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/HomestayRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Homestay",
    };

    try {
      const url = editId
        ? `http://localhost:2002/homestay/${editId}`
        : "http://localhost:2002/homestay";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Homestay ${editId ? "updated" : "registered"} successfully`);
        fetchHomestays();
        setFormData({
          homestay_count: "",
          homestay_types: [],
          furnishing: "",
          amenities: [],
          homestay_images: [],
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
      console.error(error);
    }
  };

  const handleEdit = (homestay) => {
    setEditId(homestay._id);
    setFormData({
      homestay_count: homestay.homestay_count || "",
      homestay_types: homestay.homestay_types || [],
      furnishing: homestay.furnishing || "",
      amenities: homestay.amenities || [],
      homestay_images: homestay.homestay_images || [],
      description: homestay.description || "",
      address: homestay.address || "",
      city: homestay.city || "",
      state: homestay.state || "",
      pincode: homestay.pincode || "",
    });

    navigate("/dashboard/HomestayRegistration1", { state: homestay });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this homestay?")) {
      try {
        const res = await fetch(`http://localhost:2002/homestay/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchHomestays();
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
      <h2 className="mb-4">{editId ? "Edit Homestay Registration" : "Homestay Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="homestay_count" className="form-label">
            Homestay Count
          </label>
          <input
            type="number"
            id="homestay_count"
            name="homestay_count"
            value={formData.homestay_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
  <label className="form-label">Homestay Types</label>
  <div>
    {["Premium", "Medium", "Budget"].map((type) => (
      <div className="form-check form-check-inline" key={type}>
        <input
          className="form-check-input"
          type="checkbox"
          id={`homestay_type_${type}`}
          name="homestay_types"
          value={type}
          checked={formData.homestay_types.includes(type)}
          onChange={(e) => handleCheckboxChange(e, "homestay_types")}
        />
        <label className="form-check-label" htmlFor={`homestay_type_${type}`}>
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
            {["WiFi", "Parking", "Pool", "Gym"].map((amenity) => (
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
          <label htmlFor="homestay_images" className="form-label">
            Homestay Images
          </label>
          <input
            type="file"
            id="homestay_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.homestay_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.homestay_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`homestay-${idx}`}
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
          {editId ? "Update Homestay" : "Register Homestay"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/HomestayRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Homestays</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Homestay Count</th>
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
            {homestays.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No homestays registered yet.
                </td>
              </tr>
            ) : (
              homestays.map((homestay) => (
                <tr key={homestay._id}>
                  <td>{homestay.homestay_count}</td>
                  <td>{(homestay.homestay_types || []).join(", ")}</td>
                  <td>{homestay.furnishing}</td>
                  <td>{(homestay.amenities || []).join(", ")}</td>
                  <td>
                    {(homestay.homestay_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`homestay-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{homestay.description}</td>
                  <td>{homestay.address}</td>
                  <td>{homestay.city}</td>
                  <td>{homestay.state}</td>
                  <td>{homestay.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(homestay)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(homestay._id)}
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

export default HomestayRegistration2;