import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { isLoading, forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    navigate("/reset-password", { state: { email } });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card shadow rounded-4 p-4 border-0">
              <div className="card-body">
                <h2 className="text-center fw-bold mb-3 text-success">Forgot Password</h2>
                <p className="text-center text-muted mb-4">
                  Enter your email and we'll send you an OTP to reset your password.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 position-relative">
                    <Mail
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      size={18}
                    />
                    <input
                      type="email"
                      className="form-control ps-5 py-3 rounded-3"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-3 rounded-3 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      />
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </form>
              </div>
              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="text-decoration-none text-success d-inline-flex align-items-center"
                >
                  <ArrowLeft size={16} className="me-2" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
