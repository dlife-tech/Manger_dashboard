import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  if (user) return null;

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card shadow border-0">
            <div
              className="card-header text-white text-center"
              style={{
                background: "linear-gradient(to right, #38b2ac, #2c7a7b)",
              }}
            >
              <h3 className="mb-0">Welcome Back</h3>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 d-flex justify-content-end">
                  <Link to="/forgot-password" className="text-decoration-none text-success">
                    Forgot password?
                  </Link>
                </div>

                {error && <p className="text-danger fw-semibold">{error}</p>}

                <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm text-light" role="status" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer bg-light text-center py-3">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none text-success">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
