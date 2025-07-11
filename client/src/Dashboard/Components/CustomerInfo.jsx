function CustomerInfo({ data = [] }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Hotel Bookings</h2>
      <div className="row g-4">
        {data.map((u, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-2">{u.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {u.email}</p>
                <p className="card-text mb-1"><strong>Mobile:</strong> {u.countryCode} {u.mobile}</p>
                <p className="card-text mb-2"><strong>Address:</strong> {u.address}</p>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerInfo;
