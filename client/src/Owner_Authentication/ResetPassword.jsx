import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { resetPassword, error, isLoading, message } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			await resetPassword({ email, otp, newPassword: password });

			if (!error) {
				toast.success("Password reset successful!");
				setTimeout(() => navigate("/login"), 2000);
			} else {
				toast.error(error);
			}
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="d-flex align-items-center justify-content-center min-vh-100">
			<div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "420px" }}>
				<h3 className="text-center mb-4 fw-bold">Reset Password</h3>

				{error && <div className="alert alert-danger text-center">{error}</div>}
				{message && <div className="alert alert-success text-center">{message}</div>}

				<form onSubmit={handleSubmit}>
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

					<div className="mb-3">
						<label className="form-label">OTP:</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter OTP"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">New Password:</label>
						<input
							type="password"
							className="form-control"
							placeholder="Enter new password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="mb-4">
						<label className="form-label">Confirm Password:</label>
						<input
							type="password"
							className="form-control"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					<button
						type="submit"
						className="btn btn-success w-100 fw-semibold"
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</button>
				</form>

				<div className="text-center mt-3">
					Back to <a href="/login">Login</a>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
