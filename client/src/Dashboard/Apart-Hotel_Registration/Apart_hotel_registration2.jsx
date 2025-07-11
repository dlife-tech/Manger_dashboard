import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ApartHotel2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
    apart_hotel_count: "",
    apart_hotel_types: [],
    furnishing: "",
    amenities: [],
    apart_hotel_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [apartHotels, setApartHotels] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchApartHotels = async () => {
    try {
      const res = await fetch("http://localhost:2002/aparthotel");
      const data = await res.json();
      setApartHotels(data);
    } catch (error) {
      console.error("Error fetching apart hotels:", error);
    }
  };

  useEffect(() => {
    fetchApartHotels();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
        apart_hotel_count: state.apart_hotel_count || "",
        apart_hotel_types: state.apart_hotel_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        apart_hotel_images: state.apart_hotel_images || [],
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
            apart_hotel_images: base64Images,
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/ApartHotelRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "ApartHotel",
    };

    try {
      const url = editId
        ? `http://localhost:2002/aparthotel/${editId}`
        : "http://localhost:2002/aparthotel";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Apart Hotel ${editId ? "updated" : "registered"} successfully`);
        fetchApartHotels();
        setFormData({
          apart_hotel_count: "",
          apart_hotel_types: [],
          furnishing: "",
          amenities: [],
          apart_hotel_images: [],
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

  const handleEdit = (hotel) => {
    setEditId(hotel._id);
    setFormData({
      apart_hotel_count: hotel.apart_hotel_count || "",
      apart_hotel_types: hotel.apart_hotel_types || [],
      furnishing: hotel.furnishing || "",
      amenities: hotel.amenities || [],
      apart_hotel_images: hotel.apart_hotel_images || [],
      description: hotel.description || "",
      address: hotel.address || "",
      city: hotel.city || "",
      state: hotel.state || "",
      pincode: hotel.pincode || "",
    });

    navigate("/dashboard/ApartHotelRegistration1", { state: hotel });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this apart hotel?")) {
      try {
        const res = await fetch(`http://localhost:2002/aparthotel/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchApartHotels();
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
      <h2 className="mb-4">{editId ? "Edit Apart Hotel Registration" : "Apart Hotel Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="apart_hotel_count" className="form-label">
            Apart Hotel Count
          </label>
          <input
            type="number"
            id="apart_hotel_count"
            name="apart_hotel_count"
            value={formData.apart_hotel_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apart Hotel Types</label>
          <div>
            {["Serviced Apartment", "Suite", "Apart Hotel"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`apart_hotel_type_${type}`}
                  name="apart_hotel_types"
                  value={type}
                  checked={formData.apart_hotel_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "apart_hotel_types")}
                />
                <label className="form-check-label" htmlFor={`apart_hotel_type_${type}`}>
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
          <label htmlFor="apart_hotel_images" className="form-label">
            Apart Hotel Images
          </label>
          <input
            type="file"
            id="apart_hotel_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.apart_hotel_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.apart_hotel_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`apart-hotel-${idx}`}
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
          {editId ? "Update Apart Hotel" : "Register Apart Hotel"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/ApartHotelRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Apart Hotels</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Apart Hotel Count</th>
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
            {apartHotels.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No apart hotels registered yet.
                </td>
              </tr>
            ) : (
              apartHotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td>{hotel.apart_hotel_count}</td>
                  <td>{(hotel.apart_hotel_types || []).join(", ")}</td>
                  <td>{hotel.furnishing}</td>
                  <td>{(hotel.amenities || []).join(", ")}</td>
                  <td>
                    {(hotel.apart_hotel_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`apart-hotel-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{hotel.description}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.city}</td>
                  <td>{hotel.state}</td>
                  <td>{hotel.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(hotel)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(hotel._id)}
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

export default ApartHotel2;