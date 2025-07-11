import { Link } from 'react-router-dom'
// import HostelRegistration1 from './Dashboard/Hostel_registration/Hostel_registration1.jsx';
import {
    BsCart3,
    BsGrid1X2Fill,
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsListCheck,
    BsMenuButtonWideFill,
} from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside
            id="sidebar"
            className={`sticky-top border-end vh-100 d-flex flex-column ${openSidebarToggle ? 'd-block' : 'd-none d-md-flex'}`}
            style={{ minWidth: '250px', backgroundColor: '#495057' }}
        >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <div className="d-flex align-items-center fs-4 fw-bold text-primary">
                    <BsCart3 className="me-2" />
                    HOTELS
                </div>
                <button
                    className="btn btn-outline-secondary btn-sm d-md-none"
                    onClick={OpenSidebar}
                    aria-label="Close Sidebar"
                >
                    ✕
                </button>
            </div>

            <ul className="nav flex-column mt-3 px-2">
                <li className="nav-item mb-2">
                    <h1 className="nav-link d-flex align-items-center text-light">
                        <BsGrid1X2Fill className="me-2 fs-5" />
                        Dashboard
                    </h1>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/Products" className="nav-link d-flex align-items-center text-light">
                        <BsFillArchiveFill className="me-2 fs-5" />
                        Business Listing
                    </Link>
                </li>

                {/* ✅ New Hotel Registration Link
                <li className="nav-item mb-2">
                    <Link to="/dashbord/" className="nav-link d-flex align-items-center text-light">
                        <BsFillArchiveFill className="me-2 fs-5" />
                        Hotel Registration
                    </Link>
                </li> */}

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link d-flex align-items-center text-light">
                        <BsFillGrid3X3GapFill className="me-2 fs-5" />
                        Customers
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link d-flex align-items-center text-light">
                        <BsPeopleFill className="me-2 fs-5" />
                        Bookings
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link d-flex align-items-center text-light">
                        <BsListCheck className="me-2 fs-5" />
                        Booking Requests
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link d-flex align-items-center text-light">
                        <BsMenuButtonWideFill className="me-2 fs-5" />
                        Reviews / Reports
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
