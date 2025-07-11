import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ApartmentRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    apartment_count: "",
    apartment_types: [],
    furnishing: "",
    amenities: [],
    apartment_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [apartments, setApartments] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchApartments = async () => {
    try {
      const res = await fetch("http://localhost:2002/apartment");
      const data = await res.json();
      setApartments(data);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        apartment_count: state.apartment_count || "",
        apartment_types: state.apartment_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        apartment_images: state.apartment_images || [],
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
            apartment_images: base64Images,
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/ApartmentRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Apartment",
    };

    try {
      const url = editId
        ? `http://localhost:2002/apartment/${editId}`
        : "http://localhost:2002/apartment";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Apartment ${editId ? "updated" : "registered"} successfully`);
        fetchApartments();
        setFormData({
          apartment_count: "",
          apartment_types: [],
          furnishing: "",
          amenities: [],
          apartment_images: [],
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

  const handleEdit = (apartment) => {
    setEditId(apartment._id);
    setFormData({
      apartment_count: apartment.apartment_count || "",
      apartment_types: apartment.apartment_types || [],
      furnishing: apartment.furnishing || "",
      amenities: apartment.amenities || [],
      apartment_images: apartment.apartment_images || [],
      description: apartment.description || "",
      address: apartment.address || "",
      city: apartment.city || "",
      state: apartment.state || "",
      pincode: apartment.pincode || "",
    });

    navigate("/dashboard/ApartmentRegistration1", { state: apartment });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      try {
        const res = await fetch(`http://localhost:2002/apartment/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchApartments();
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
      <h2 className="mb-4">{editId ? "Edit Apartment Registration" : "Apartment Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="apartment_count" className="form-label">
            Apartment Count
          </label>
          <input
            type="number"
            id="apartment_count"
            name="apartment_count"
            value={formData.apartment_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apartment Types</label>
          <div>
            {["Studio", "1BHK", "2BHK"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`apartment_type_${type}`}
                  name="apartment_types"
                  value={type}
                  checked={formData.apartment_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "apartment_types")}
                />
                <label className="form-check-label" htmlFor={`apartment_type_${type}`}>
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
            {["WiFi", "Parking", "Lift", "Security"].map((amenity) => (
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
          <label htmlFor="apartment_images" className="form-label">
            Apartment Images
          </label>
          <input
            type="file"
            id="apartment_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.apartment_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.apartment_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`apartment-${idx}`}
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
          {editId ? "Update Apartment" : "Register Apartment"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/ApartmentRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Apartments</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Apartment Count</th>
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
            {apartments.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No apartments registered yet.
                </td>
              </tr>
            ) : (
              apartments.map((apartment) => (
                <tr key={apartment._id}>
                  <td>{apartment.apartment_count}</td>
                  <td>{(apartment.apartment_types || []).join(", ")}</td>
                  <td>{apartment.furnishing}</td>
                  <td>{(apartment.amenities || []).join(", ")}</td>
                  <td>
                    {(apartment.apartment_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`apartment-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{apartment.description}</td>
                  <td>{apartment.address}</td>
                  <td>{apartment.city}</td>
                  <td>{apartment.state}</td>
                  <td>{apartment.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(apartment)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(apartment._id)}
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

export default ApartmentRegistration2;