import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PlaceRegistration2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state; // Step1 data from previous page

  const [formData, setFormData] = useState({
   
    room_count: "",
    place_types: [],
    furnishing: "",
    amenities: [],
    place_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [places, setPlaces] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchPlaces = async () => {
    try {
      const res = await fetch("http://localhost:2002/palace", {
        method: "GET",
      });
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();

    if (state && state._id) {
      setEditId(state._id);
      setFormData({
       
        room_count: state.room_count || "",
        place_types: state.place_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        place_images: state.place_images || [],
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
            place_images: [...prev.place_images, ...base64Images],
          }));
        })
        .catch((err) => console.error("Image upload error:", err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state) {
      alert("Step 1 data missing. Please complete Step 1 first.");
      navigate("/dashboard/PlaceRegistration1");
      return;
    }

    const fullData = {
      ...state,
      ...formData,
      propertyType: "Place",
    };

    try {
      const url = editId
        ? `http://localhost:2002/palace/${editId}`
        : "http://localhost:2002/palace";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (res.ok) {
        alert(`Place ${editId ? "updated" : "registered"} successfully`);
        fetchPlaces();
        setFormData({
          
          room_count: "",
          place_types: [],
          furnishing: "",
          amenities: [],
          place_images: [],
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

  const handleEdit = (place) => {
    setEditId(place._id);
    setFormData({
     
      room_count: place.room_count || "",
      place_types: place.place_types || [],
      furnishing: place.furnishing || "",
      amenities: place.amenities || [],
      place_images: place.place_images || [],
      description: place.description || "",
      address: place.address || "",
      city: place.city || "",
      state: place.state || "",
      pincode: place.pincode || "",
    });

    navigate("/dashboard/PlaceRegistration1", { state: place });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        const res = await fetch(`http://localhost:2002/palace/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          fetchPlaces();
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
      <h2 className="mb-4">{editId ? "Edit Place Registration" : "Place Registration Step 2"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="palace_name" className="form-label">
            Palace Name
          </label>
          <input
            type="text"
            id="palace_name"
            name="palace_name"
            value={formData.palace_name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="room_count" className="form-label">
            Room Count
          </label>
          <input
            type="number"
            id="room_count"
            name="room_count"
            value={formData.room_count}
            onChange={handleChange}
            required
            className="form-control"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Place Types</label>
          <div>
            {["Farmhouse", "Bungalow", "Cottage"].map((type) => (
              <div className="form-check form-check-inline" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`place_type_${type}`}
                  name="place_types"
                  value={type}
                  checked={formData.place_types.includes(type)}
                  onChange={(e) => handleCheckboxChange(e, "place_types")}
                />
                <label className="form-check-label" htmlFor={`place_type_${type}`}>
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
            {["Garden", "Pool", "Parking", "Security"].map((amenity) => (
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
          <label htmlFor="place_images" className="form-label">
            Place Images
          </label>
          <input
            type="file"
            id="place_images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="form-control"
          />
          {formData.place_images.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.place_images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`place-${idx}`}
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
          {editId ? "Update Place" : "Register Place"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard/PlaceRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      <hr className="my-4" />

      <h3>Registered Places</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              
              <th>Room Count</th>
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
            {places.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center">
                  No places registered yet.
                </td>
              </tr>
            ) : (
              places.map((place) => (
                <tr key={place._id}>
                 
                  <td>{place.room_count}</td>
                  <td>{(place.place_types || []).join(", ")}</td>
                  <td>{place.furnishing}</td>
                  <td>{(place.amenities || []).join(", ")}</td>
                  <td>
                    {(place.place_images || []).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`place-${idx}`}
                        width="50"
                        height="40"
                        className="me-1 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </td>
                  <td>{place.description}</td>
                  <td>{place.address}</td>
                  <td>{place.city}</td>
                  <td>{place.state}</td>
                  <td>{place.pincode}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(place)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(place._id)}
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
export default PlaceRegistration2;