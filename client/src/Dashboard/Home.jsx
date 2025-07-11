// import Add_prod from '../Componts/Add_Products'
import { useState } from 'react'

import PropertySelector from './Components/Hoteltypes'
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'


function Home() {

  let [data, setdata] = useState()


 
  return (
    <main className="p-4">
      <div className="mb-4">
        <h3 className="fw-bold"> MANAGER DASHBOARD</h3>
      </div>

      {/* Cards Row */}
      <div className="row g-3 mb-5">
        {/* Add Products Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-muted mb-1"> 
                 Owner Registration </h5> 
                {/* / <h3 className="mb-0">300</h3> */}
               
              </div>
              <div>
                <BsFillArchiveFill className="fs-2 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-muted mb-1">Total Bookings</h5>
                <h3 className="mb-0">12</h3>
              </div>
              <div>
                <BsFillGrid3X3GapFill className="fs-2 text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <Link>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title text-muted mb-1">CUSTOMERS</h5>
                  <h3 className="mb-0">33</h3>
                </div>
                <div>
                  <BsPeopleFill className="fs-2 text-warning" />
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Alerts Card */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-muted mb-1">Pending Orders</h5>
                <h3 className="mb-0">42</h3>
              </div>
              <div>
                <BsFillBellFill className="fs-2 text-danger" />
              </div>
            </div>
          </div>
        </div>
      </div> 

        {/* <OwnerInfo data={ownerData}/>
        {/* Customer data */}
        
       <PropertySelector/>
       {/* <Owner/> */}
        {/* <Owner2/> */}
      
    
      
         {/* <CustomerInfo data={customerData} />
         <Influ/>
         */}

      

    </main>
  )
}

export default Home
