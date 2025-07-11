import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [username, setUsername] = useState(""); // ✅ new field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup({ username, email, password, passwordConfirm }); // ✅ include username
      navigate("/verify-email");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6 col-lg-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSignUp}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email address:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>

            {/* Error Alert */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default SignUpPage;
