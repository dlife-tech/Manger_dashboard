import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="container-fluid p-0">
      <Header OpenSidebar={OpenSidebar} />
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          OpenSidebar={OpenSidebar} 
          className={`bg-light border-end ${openSidebarToggle ? 'd-block' : 'd-none d-md-block'}`} 
          style={{ minWidth: '250px' }}
        />
        
        {/* Main Content */}
        <main className="flex-grow-1 p-3">
          <Outlet /> {/* 👈 This will render nested routes like Owner2, Owner, Home */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
