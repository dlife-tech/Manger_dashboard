import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail, resendOtp } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const chars = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = chars[i] || "";
      }
      setCode(newCode);
      const focusIndex = newCode.findLastIndex((d) => d !== "");
      inputRefs.current[Math.min(focusIndex + 1, 5)]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = code.join("");
    try {
      const res = await verifyEmail(otpCode);
      setSuccessMessage(res.message || "Email verification successful!");
      toast.success(res.message || "Email verified successfully");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
      console.error("OTP Error:", err);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (code.every((d) => d)) {
      const otpCode = code.join("");
      const timer = setTimeout(async () => {
        try {
          const res = await verifyEmail(otpCode);
          setSuccessMessage(res.message || "Email verification successful!");
          toast.success(res.message || "Email verified successfully");
          setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
          toast.error(err?.response?.data?.message || "Verification failed");
          console.error("OTP Error:", err);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [code, verifyEmail, navigate]);

  // Cooldown timer for resend button
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleResend = async () => {
    try {
      await resendOtp();
      toast.success("OTP resent successfully");
      setResendCooldown(30);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          {successMessage && (
            <div className="alert alert-success text-center fw-bold" role="alert">
              {successMessage}
            </div>
          )}
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">Verify Your Email</h3>
              <p className="text-center mb-4">
                Enter the 6-digit code sent to your email.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between mb-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="form-control text-center fw-bold mx-1"
                      style={{
                        width: "45px",
                        height: "45px",
                        fontSize: "20px",
                      }}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-danger text-center mb-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || code.some((d) => !d)}
                  className="btn btn-success w-100 mb-3"
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

              <div className="text-center">
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend OTP in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
