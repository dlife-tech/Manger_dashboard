import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav
			className="navbar navbar-expand-lg"
			style={{
				background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
			}}
		>
			<div className="container">
				<Link
					className="navbar-brand fw-bold"
					to="/"
					style={{ color: "#ffd700", fontSize: "1.7rem" }}
				>
					MyAuthApp
				</Link>

				{/* Toggler Button */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Collapsible Nav */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto">
						{!user ? (
							<>
								<li className="nav-item">
									<Link
										to="/signup"
										className="nav-link"
										style={{
											color: "#fff",
											fontWeight: "500",
											marginRight: "10px",
										}}
									>
										Signup
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/login"
										className="nav-link"
										style={{ color: "#ffd700", fontWeight: "500" }}
									>
										Login
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link
										to="/dashbord"
										className="nav-link"
										style={{
											color: "#fff",
											fontWeight: "500",
											marginRight: "10px",
										}}
									>
										Dashboard
									</Link>
								</li>
								<li className="nav-item">
									<button
										onClick={handleLogout}
										className="btn btn-link nav-link"
										style={{
											color: "#ffd700",
											fontWeight: "500",
											cursor: "pointer",
										}}
									>
										Logout
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
