function OwnerInfo({ data = [] }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Owner Details</h2>
      <div className="row g-4">
        {data.map((u, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card shadow-sm h-100">
              <img
                src={u.image}
                alt="Hotel"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{u.full_name}</h5>
                <p className="card-text"><strong>Email:</strong> {u.email}</p>
                <p className="card-text"><strong>Mobile:</strong> {u.contact}</p>
                <p className="card-text"><strong>Hotel:</strong> {u.hotelName}</p>
                <p className="card-text"><strong>Address:</strong> {u.hotelAddress}, {u.city}, {u.state} - {u.pincode}</p>
                <p className="card-text"><strong>Type:</strong> {u.hotelType}</p>
                <p className="card-text"><strong>Rooms:</strong> {u.rooms}</p>
                {/* Avoid showing password in public */}
                 <p className="card-text"><strong>Password:</strong> {u.password}</p> 
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerInfo;
