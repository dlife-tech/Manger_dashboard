import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LodgeRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    lodge_count: "",
    lodge_types: [],
    furnishing: "",
    amenities: [],
    lodge_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [lodges, setLodges] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchLodges = async () => {
    try {
      const res = await fetch("http://localhost:2002/lodge");
      const data = await res.json();
      setLodges(data);
    } catch (error) {
      console.error("Error fetching lodges:", error);
    }
  };

  useEffect(() => {
    fetchLodges();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        lodge_count: state.lodge_count || "",
        lodge_types: state.lodge_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        lodge_images: state.lodge_images || [],
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
            lodge_images: base64Images,
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/LodgeRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Lodge",
    };

    try {
      const url = editId
        ? `http://localhost:2002/lodge/${editId}`
        : "http://localhost:2002/lodge";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Lodge ${editId ? "updated" : "registered"} successfully`);
        fetchLodges();
        setFormData({
          lodge_count: "",
          lodge_types: [],
          furnishing: "",
          amenities: [],
          lodge_images: [],
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

  const handleEdit = (lodge) => {
    setEditId(lodge._id);
    setFormData({
      lodge_count: lodge.lodge_count || "",
      lodge_types: lodge.lodge_types || [],
      furnishing: lodge.furnishing || "",
      amenities: lodge.amenities || [],
      lodge_images: lodge.lodge_images || [],
      description: lodge.description || "",
      address: lodge.address || "",
      city: lodge.city || "",
      state: lodge.state || "",
      pincode: lodge.pincode || "",
    });

    navigate("/dashboard/LodgeRegistration1", { state: lodge });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lodge?")) {
      try {
        const res = await fetch(`http://localhost:2002/lodge/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchLodges();
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
      <h2 className="mb-4">{editId ? "Edit Lodge Registration" : "Lodge Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="lodge_count" className="form-label">
            Lodge Count
          </label>
          <input
            type="number"
            id="lodge_count"
            name="lodge_count"
            value={formData.lodge_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Lodge Types</label>
          <div>
            {["Type1", "Type2", "Type3"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`lodge_type_${type}`}
                  name="lodge_types"
                  value={type}
                  checked={formData.lodge_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "lodge_types")}
                />
                <label className="form-check-label" htmlFor={`lodge_type_${type}`}>
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
          <label htmlFor="lodge_images" className="form-label">
            Lodge Images
          </label>
          <input
            type="file"
            id="lodge_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.lodge_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.lodge_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`lodge-${idx}`}
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
          {editId ? "Update Lodge" : "Register Lodge"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/LodgeRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Lodges</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Lodge Count</th>
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
            {lodges.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No lodges registered yet.
                </td>
              </tr>
            ) : (
              lodges.map((lodge) => (
                <tr key={lodge._id}>
                  <td>{lodge.lodge_count}</td>
                  <td>{(lodge.lodge_types || []).join(", ")}</td>
                  <td>{lodge.furnishing}</td>
                  <td>{(lodge.amenities || []).join(", ")}</td>
                  <td>
                    {(lodge.lodge_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`lodge-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{lodge.description}</td>
                  <td>{lodge.address}</td>
                  <td>{lodge.city}</td>
                  <td>{lodge.state}</td>
                  <td>{lodge.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(lodge)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(lodge._id)}
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

export default LodgeRegistration2;
