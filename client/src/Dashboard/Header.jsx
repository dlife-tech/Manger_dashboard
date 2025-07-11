import { useAuthStore } from "../store/authStore";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify
} from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

function Header({ OpenSidebar }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Zustand logout
    navigate("/login"); // 🔁 Redirect to login
  };

  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-light sticky-top" style={{ height: '70px' }}>
      
      {/* Menu icon */}
      <div className="d-flex align-items-center">
        <BsJustify
          className="fs-3 cursor-pointer"
          onClick={OpenSidebar}
          style={{ userSelect: 'none' }}
          title="Toggle Sidebar"
        />
      </div>

      {/* Search icon */}
      <div className="d-flex align-items-center">
        <BsSearch className="fs-4 text-secondary" title="Search" />
      </div>

      {/* Right side icons */}
      <div className="d-flex align-items-center gap-4">
        <BsFillBellFill className="fs-4 text-secondary" title="Notifications" />
        <BsFillEnvelopeFill className="fs-4 text-secondary" title="Messages" />
        <BsPersonCircle className="fs-4 text-secondary" title="Profile" />

        {/* Logout */}
        <div
          className="d-flex align-items-center gap-2"
          title="Logout"
          style={{ fontSize: '1.1rem' }}
        >
          <BiLogOut className="fs-4 text-danger" />
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
