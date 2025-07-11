import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GuestHouseRegistration2() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const fileInputRef = useRef();

  const isEdit = state?.edit === true;
  const editId = state?._id;

  const [formData, setFormData] = useState({
    room_count: "",
    guesthouse_types: [],
    furnishing: "",
    amenities: [],
    guesthouse_images: [],
    description: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const [allData, setAllData] = useState([]);

  const handleInput = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "guesthouse_images") {
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
          guesthouse_images: [...prev.guesthouse_images, ...base64Images],
        }));
        fileInputRef.current.value = "";
      });
    } else if (name === "guesthouse_types" || name === "amenities") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
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
      propertyType: "Guest House",
    };

    try {
      const response = await fetch(
        `http://localhost:2002/guesthouse${isEdit ? `/${editId}` : ""}`,
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) throw new Error("Server error");

      alert(`Guest House ${isEdit ? "Updated" : "Registered"} Successfully`);

      setFormData({
        room_count: "",
        guesthouse_types: [],
        furnishing: "",
        amenities: [],
        guesthouse_images: [],
        description: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });

      fetchData();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:2002/guesthouse");
      const data = await res.json();
      setAllData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const res = await fetch(`http://localhost:2002/guesthouse/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Delete failed");
        alert("Deleted Successfully");
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Error deleting guest house");
      }
    }
  };

  const handleEdit = (item) => {
    const step1Fields = {
      full_name: item.full_name,
      email: item.email,
      phone: item.phone,
      password: item.password,
      guesthouse_name: item.guesthouse_name,
      city: item.city,
    };

    const step2Fields = {
      room_count: item.room_count,
      guesthouse_types: item.guesthouse_types,
      furnishing: item.furnishing,
      amenities: item.amenities,
      guesthouse_images: item.guesthouse_images,
      description: item.description,
      state: item.state,
      city: item.city,
      pincode: item.pincode,
      address: item.address,
    };

    navigate("/dashboard/GuestHouseRegistration1", {
      state: {
        ...step1Fields,
        ...step2Fields,
        edit: true,
        _id: item._id,
      },
    });
  };

  useEffect(() => {
    fetchData();

    if (isEdit) {
      setFormData({
        room_count: state.room_count || "",
        guesthouse_types: state.guesthouse_types || [],
        furnishing: state.furnishing || "",
        amenities: state.amenities || [],
        guesthouse_images: state.guesthouse_images || [],
        description: state.description || "",
        state: state.state || "",
        city: state.city || "",
        pincode: state.pincode || "",
        address: state.address || "",
      });
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          {isEdit ? "Update Guest House" : "Register Guest House"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label>Total Rooms</label>
              <input
                type="number"
                name="room_count"
                className="form-control"
                value={formData.room_count}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3 col-md-6">
              <label>Furnishing</label>
              <select
                name="furnishing"
                className="form-select"
                value={formData.furnishing}
                onChange={handleInput}
                required
              >
                <option value="">Select</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div className="mb-3 col-12">
              <label>Types</label>
              <div>
                {["Standard", "Deluxe", "Suite"].map((type) => (
                  <div className="form-check form-check-inline" key={type}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="guesthouse_types"
                      value={type}
                      checked={formData.guesthouse_types.includes(type)}
                      onChange={handleInput}
                    />
                    <label className="form-check-label">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3 col-12">
              <label>Amenities</label>
              <div>
                {["Wi-Fi", "TV", "Parking", "Power Backup", "Laundry"].map(
                  (item) => (
                    <div className="form-check form-check-inline" key={item}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="amenities"
                        value={item}
                        checked={formData.amenities.includes(item)}
                        onChange={handleInput}
                      />
                      <label className="form-check-label">{item}</label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-3 col-md-4">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleInput}
                required
              />
            </div>
            <div className="mb-3 col-md-4">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleInput}
                required
              />
            </div>
            <div className="mb-3 col-md-4">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                value={formData.pincode}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3 col-12">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                rows={2}
                value={formData.address}
                onChange={handleInput}
                required
              />
            </div>

            <div className="mb-3 col-12">
              <label>Upload Images</label>
              <input
                type="file"
                name="guesthouse_images"
                accept="image/*"
                multiple
                className="form-control"
                onChange={handleInput}
                ref={fileInputRef}
              />
              <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.guesthouse_images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    height="60"
                    width="60"
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-3 col-12">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows={2}
                value={formData.description}
                onChange={handleInput}
              />
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            {isEdit ? "Update" : "Submit"} Guest House
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h4 className="text-center mb-3">Registered Guest Houses</h4>
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Rooms</th>
                <th>Types</th>
                <th>Furnishing</th>
                <th>Amenities</th>
                <th>State</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Address</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData.length === 0 ? (
                <tr>
                  <td colSpan="10">No data found</td>
                </tr>
              ) : (
                allData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.room_count}</td>
                    <td>{item.guesthouse_types.join(", ")}</td>
                    <td>{item.furnishing}</td>
                    <td>{item.amenities.join(", ")}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.pincode}</td>
                    <td>{item.address}</td>
                    <td>
                      {item.guesthouse_images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="img"
                          width="50"
                          height="50"
                          style={{ objectFit: "cover", marginRight: "4px" }}
                        />
                      ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(item)}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GuestHouseRegistration2;
