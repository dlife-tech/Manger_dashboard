import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HouseboatRegistration2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {}; // Data from Step 1

  const [formData, setFormData] = useState({
    houseboat_count: "",
    houseboat_types: [],
    furnishing: "",
    amenities: [],
    houseboat_images: [],
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [registrations, setRegistrations] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:2002/houseboat")
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // If coming from step1 with edit state
  useEffect(() => {
    if (location.state?.edit) {
      handleEdit(location.state.edit);
    }
  }, [location.state]);

  // Upload image and convert to base64
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setFormData({ ...formData, houseboat_images: images });
      })
      .catch((error) => console.error("Error reading files:", error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updated = formData[name].includes(value)
        ? formData[name].filter((item) => item !== value)
        : [...formData[name], value];
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...state,
      ...formData,
      propertyType: "Houseboat",
    };

    const url = editId
      ? `http://localhost:2002/houseboat/${editId}`
      : "http://localhost:2002/houseboat";

    const method = editId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert(editId ? "Updated successfully" : "Submitted successfully");
        setFormData({
          houseboat_count: "",
          houseboat_types: [],
          furnishing: "",
          amenities: [],
          houseboat_images: [],
          description: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
        setEditId(null);
         navigate("/dashboard");
        fetch("http://localhost:2002/houseboat")
          .then((res) => res.json())
          .then((data) => setRegistrations(data));
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const res = await fetch(`http://localhost:2002/houseboat/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Deleted successfully");
          setRegistrations(registrations.filter((r) => r._id !== id));
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = (houseboat) => {
    setEditId(houseboat._id);
    setFormData({
      houseboat_count: houseboat.houseboat_count || "",
      houseboat_types: houseboat.houseboat_types || [],
      furnishing: houseboat.furnishing || "",
      amenities: houseboat.amenities || [],
      houseboat_images: houseboat.houseboat_images || [],
      description: houseboat.description || "",
      address: houseboat.address || "",
      city: houseboat.city || "",
      state: houseboat.state || "",
      pincode: houseboat.pincode || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    navigate("/dashboard/HouseboatRegistration1", {
      state: state,
    });
  };

  const handleEditClick = (item) => {
    // Send step 1 data and step 2 data together to Step2
    navigate("/dashboard/HouseboatRegistration1", {
      state: {
        ...item, // both step1 and step2 fields
        edit: item, // this will trigger handleEdit()
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>{editId ? "Edit Houseboat Info" : "Houseboat Registration - Step 2"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Houseboat Count</label>
          <input
            type="number"
            name="houseboat_count"
            className="form-control"
            value={formData.houseboat_count}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Houseboat Types</label><br />
          {["Deluxe", "Premium", "Luxury"].map((type) => (
            <div className="form-check form-check-inline" key={type}>
              <input
                type="checkbox"
                name="houseboat_types"
                value={type}
                checked={formData.houseboat_types.includes(type)}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">{type}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Furnishing</label>
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Furnishing</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Amenities</label><br />
          {["WiFi", "Parking", "Kitchen", "AC"].map((amenity) => (
            <div className="form-check form-check-inline" key={amenity}>
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">{amenity}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control"
          />
          <div className="mt-2">
            {formData.houseboat_images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                width={80}
                height={60}
                className="me-2 mb-2 border rounded"
              />
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            ⬅ Back to Step 1
          </button>
          <button type="submit" className="btn btn-primary">
            {editId ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <hr className="my-5" />

      <h4>Registered Houseboats</h4>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Count</th>
              <th>Types</th>
              <th>Furnishing</th>
              <th>Amenities</th>
              <th>Description</th>
              <th>Location</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((item, idx) => (
              <tr key={idx}>
                <td>{item.houseboat_count}</td>
                <td>{item.houseboat_types?.join(", ")}</td>
                <td>{item.furnishing}</td>
                <td>{item.amenities?.join(", ")}</td>
                <td>{item.description}</td>
                <td>
                  {item.address}, {item.city}, {item.state} - {item.pincode}
                </td>
                <td>
                  {item.houseboat_images?.slice(0, 2).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="img"
                      width={60}
                      height={40}
                      className="me-2 mb-1 rounded border"
                    />
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseboatRegistration2;
