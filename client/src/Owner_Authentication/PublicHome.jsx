import React from "react";

function PublicHome() {
  return (
    <div className="container mt-5">
      <div className="p-4 border rounded shadow text-center" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h1 className="mb-3">Welcome to MyAuthApp</h1>
        <p>
          This is a simple authentication app.<br />
          Use the navigation bar to Signup, Login, or Reset your password.
        </p>
      </div>
    </div>
  );
}

export default PublicHome;