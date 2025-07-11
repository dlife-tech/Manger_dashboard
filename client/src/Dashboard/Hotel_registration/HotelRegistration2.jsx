import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HotelRegistration2() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    hotel_types: [],
    furnishing: "",
    amenities: [],
    room_count: "",
    hotel_images: [],
    state: "",
    city: "",
    pincode: "",
    address: "",
    description: "",
  });

  const [hotelList, setHotelList] = useState([]);

  // Prefill data from state if editing
  useEffect(() => {
    if (state) {
      const {
        hotel_types = [],
        furnishing = "",
        amenities = [],
        room_count = "",
        hotel_images = [],
        state: st = "",
        city = "",
        pincode = "",
        address = "",
        description = "",
      } = state;

      setFormData((prev) => ({
        ...prev,
        hotel_types,
        furnishing,
        amenities,
        room_count,
        hotel_images,
        state: st,
        city,
        pincode,
        address,
        description,
      }));
    }
  }, [state]);

  const handleInput = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "hotel_images") {
      const selectedFiles = Array.from(files);
      const readers = selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          hotel_images: [...prev.hotel_images, ...base64Images],
        }));
      });
    } else if (name === "hotel_types" || name === "amenities") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...state,
      ...formData,
      propertyType: "Hotel",
    };

    try {
      const res = await fetch(`http://localhost:2002/hotel${state?._id ? `/${state._id}` : ""}`, {
        method: state?._id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert(state?._id ? "Hotel Updated Successfully" : "Hotel Registered Successfully");
        fetchData();
        navigate("/dashboard");
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/hotel");
      if (res.ok) {
        const result = await res.json();
        setHotelList(result);
      } else {
        alert("Failed to fetch hotel data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:2002/hotel/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Hotel deleted successfully");
        fetchData();
      } else {
        alert("Failed to delete hotel");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = (hotel) => {
    navigate("/dashboard/HotelRegistration1", { state: hotel });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">
        {state?._id ? "Update Hotel Details" : "Complete Hotel Registration"}
      </h3>

      {/* ==================== FORM ==================== */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row">
          <div className="col-md-4">
            <label>Hotel Types:</label><br />
            {["Hotel", "Motel", "Resort"].map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  name="hotel_types"
                  value={type}
                  checked={formData.hotel_types.includes(type)}
                  onChange={handleInput}
                />
                <label className="ms-1">{type}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <label>Furnishing:</label>
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={handleInput}
              className="form-select"
            >
              <option value="">Select</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi Furnished">Semi Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Amenities:</label><br />
            {["WiFi", "AC", "TV", "Geyser"].map((amenity) => (
              <div key={amenity}>
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleInput}
                />
                <label className="ms-1">{amenity}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <label>Room Count:</label>
            <input
              type="number"
              name="room_count"
              value={formData.room_count}
              onChange={handleInput}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-3">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInput}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-3">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInput}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-3">
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInput}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInput}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInput}
              className="form-control"
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className="mt-3">
          <label>Hotel Images:</label>
          <input
            type="file"
            name="hotel_images"
            accept="image/*"
            multiple
            onChange={handleInput}
            className="form-control"
          />
          <div className="d-flex mt-2 flex-wrap">
            {formData.hotel_images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                height={50}
                width={50}
                className="me-2 mb-2 rounded border"
                style={{ objectFit: "cover" }}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          {state?._id ? "Update Hotel" : "Submit Hotel"}
        </button>
         <button
          type="button"
          className="btn btn-secondary mt-4 ms-2"
          onClick={() => navigate("/dashboard/HotelRegistration1")}
        >
          Back to Step 1
        </button>
      </form>

      {/* ==================== CARD DISPLAY ==================== */}
      <h4 className="text-center mb-3">Registered Hotels</h4>
      <div className="row">
        {hotelList.length === 0 ? (
          <p className="text-center">No hotels registered.</p>
        ) : (
          hotelList.map((hotel, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                {hotel.hotel_images && hotel.hotel_images.length > 0 && (
                  <img
                    src={hotel.hotel_images[0]}
                    className="card-img-top"
                    alt="hotel"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{hotel.hotel_types?.join(", ")}</h5>
                  <p className="card-text mb-1"><strong>Furnishing:</strong> {hotel.furnishing}</p>
                  <p className="card-text mb-1"><strong>Room Count:</strong> {hotel.room_count}</p>
                  <p className="card-text mb-1"><strong>Amenities:</strong> {hotel.amenities?.join(", ")}</p>
                  <p className="card-text mb-1"><strong>Address:</strong> {hotel.address}, {hotel.city}, {hotel.state} - {hotel.pincode}</p>
                  <p className="card-text"><strong>Description:</strong> {hotel.description}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(hotel)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(hotel._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HotelRegistration2;
