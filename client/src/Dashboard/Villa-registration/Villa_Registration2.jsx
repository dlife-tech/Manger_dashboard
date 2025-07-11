import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VillaRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    villa_count: "",
    villa_types: [],
    furnishing: "",
    amenities: [],
    villa_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [villas, setVillas] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchVillas = async () => {
    try {
      const res = await fetch("http://localhost:2002/villa");
      const data = await res.json();
      setVillas(data);
    } catch (error) {
      console.error("Error fetching villas:", error);
    }
  };

  useEffect(() => {
    fetchVillas();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        villa_count: state.villa_count || "",
        villa_types: state.villa_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        villa_images: state.villa_images || [],
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

 // ...existing code...
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
          villa_images: [...prev.villa_images, ...base64Images], // append new images
        }));
      })
      .catch((err) => console.error("Image upload error:", err));
  }
};
// ...existing code...

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/VillaRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Villa",
    };

    try {
      const url = editId
        ? `http://localhost:2002/villa/${editId}`
        : "http://localhost:2002/villa";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Villa ${editId ? "updated" : "registered"} successfully`);
        fetchVillas();
        setFormData({
          villa_count: "",
          villa_types: [],
          furnishing: "",
          amenities: [],
          villa_images: [],
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

  const handleEdit = (villa) => {
    setEditId(villa._id);
    setFormData({
      villa_count: villa.villa_count || "",
      villa_types: villa.villa_types || [],
      furnishing: villa.furnishing || "",
      amenities: villa.amenities || [],
      villa_images: villa.villa_images || [],
      description: villa.description || "",
      address: villa.address || "",
      city: villa.city || "",
      state: villa.state || "",
      pincode: villa.pincode || "",
    });

    navigate("/dashboard/VillaRegistration1", { state: villa });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this villa?")) {
      try {
        const res = await fetch(`http://localhost:2002/villa/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchVillas();
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
      <h2 className="mb-4">{editId ? "Edit Villa Registration" : "Villa Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="villa_count" className="form-label">
            Villa Count
          </label>
          <input
            type="number"
            id="villa_count"
            name="villa_count"
            value={formData.villa_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Villa Types</label>
          <div>
            {["Luxury", "Standard", "Budget"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`villa_type_${type}`}
                  name="villa_types"
                  value={type}
                  checked={formData.villa_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "villa_types")}
                />
                <label className="form-check-label" htmlFor={`villa_type_${type}`}>
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
            {["WiFi", "Parking", "Pool", "Gym", "Garden"].map((amenity) => (
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
          <label htmlFor="villa_images" className="form-label">
            Villa Images
          </label>
          <input
            type="file"
            id="villa_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.villa_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.villa_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`villa-${idx}`}
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
          {editId ? "Update Villa" : "Register Villa"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/VillaRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Villas</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Villa Count</th>
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
            {villas.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No villas registered yet.
                </td>
              </tr>
            ) : (
              villas.map((villa) => (
                <tr key={villa._id}>
                  <td>{villa.villa_count}</td>
                  <td>{(villa.villa_types || []).join(", ")}</td>
                  <td>{villa.furnishing}</td>
                  <td>{(villa.amenities || []).join(", ")}</td>
                  <td>
                    {(villa.villa_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`villa-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{villa.description}</td>
                  <td>{villa.address}</td>
                  <td>{villa.city}</td>
                  <td>{villa.state}</td>
                  <td>{villa.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(villa)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(villa._id)}
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
}
export default VillaRegistration2