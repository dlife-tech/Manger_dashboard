import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Influ() {
  const [influencer, setInfluencer] = useState({
    name: 'Riya Sharma',
    category: 'Travel & Lifestyle',
    hotelBookings: 27,
    totalHotelSales: 34200,
    bookingDates: [
      { date: '2025-06-01', count: 5 },
      { date: '2025-06-03', count: 4 },
      { date: '2025-06-05', count: 6 },
    ],
    lastPaymentDate: '2025-06-10',
    transactionId: 'TXN8845234',
    approved: null,
  });

  const handleApproval = (status) => {
    setInfluencer({ ...influencer, approved: status });
  };

  return (
    <div className="container mt-4">
        <h2 className='mb-4'>Hotel Influencer</h2>
      <div className="card shadow">
        <div className="card-body">
          <div className="mb-4">
            <h4 className="mb-1">{influencer.name}</h4>
            <p className="text-muted mb-1">{influencer.category}</p>
          </div>

          <div className="row text-sm mb-3">
            <div className="col-md-6 mb-2">
              <strong>Total Bookings (Your Hotel):</strong><br />
              {influencer.hotelBookings}
            </div>
            <div className="col-md-6 mb-2">
              <strong>Total Sales:</strong><br />
              ₹{influencer.totalHotelSales}
            </div>
            <div className="col-md-6 mb-2">
              <strong>Last Payment Date:</strong><br />
              {influencer.lastPaymentDate}
            </div>
            <div className="col-md-6 mb-2">
              <strong>Transaction ID:</strong><br />
              {influencer.transactionId}
            </div>
          </div>

          <div className="mb-3">
            <h6>Booking History:</h6>
            <ul className="list-group">
              {influencer.bookingDates.map((item, idx) => (
                <li className="list-group-item" key={idx}>
                  {item.date} – {item.count} bookings
                </li>
              ))}
            </ul>
          </div>

          {influencer.approved === null ? (
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => handleApproval(true)}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleApproval(false)}
              >
                Reject
              </button>
            </div>
          ) : influencer.approved ? (
            <p className="text-success fw-bold">✅ Approved for Campaign</p>
          ) : (
            <p className="text-danger fw-bold">❌ Rejected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Influ;
