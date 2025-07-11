import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertySelector() {
  const [selectcategory, setselectcategory] = useState("Hotel");
  const [selectedtype, setselectedtype] = useState("");

  const navigate = useNavigate();

  const categoryData = {
    Hotel: [
      {
        label: "Hotel",
        desc: "A hotel provides lodging with amenities like dining and room service.",
        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/169124334.jpg?k=f7c9caabf8254663949bebfc15302612f6fa37aeecc6ec0715d6648a049311ca&o=&hp=1",
      },
      {
        label: "Resort",
        desc: "A resort offers luxury lodging and amenities like pools, spas, etc.",
        img: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?cs=srgb&dl=pexels-pixabay-261169.jpg&fm=jpg",
      },
      {
        label: "Lodge",
        desc: "A lodge offers rustic lodging often in natural settings.",
        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/171537290.jpg?k=6d5f3038ef0dbed61e8270690b87cc8b48ae4b00eb8cd9e1e3d49a6a945be152&o=&hp=1",
      },
      {
        label: "Guest House",
        desc: "A cozy home-like accommodation with limited rooms.",
        img: "https://hips.hearstapps.com/hmg-prod/images/4672-livingston-ave-34-6668692983094.jpg",
      },
      {
        label: "Palace",
        desc: "A royal property offering luxury stays.",
        img: "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20190116165528/Umaid-bhawan-jodhpur.jpg",
      },
      {
        label: "Houseboat",
        desc: "Floating lodging often found in lakes or backwaters.",
        img: "https://kerala.me/wp-content/uploads/2015/11/Houseboat-structure.jpg",
      },
    ],
    "Homestays & Villas": [
      {
        label: "Villa",
        desc: "Standalone bungalow-style homes available for rent.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu4XCPj5N7GXcd1xkqAsKQcj9A0kwRkWBDTg&s",
      },
      {
        label: "Homestay",
        desc: "Private house offered to guests; host may/may not stay.",
        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501528790.jpg?k=ab62245fd0c7a103e2cb34e587058afcddbe8981d1ada06b4c9dd968de46da47&o=&hp=1",
      },
      {
        label: "Cottage",
        desc: "Small leisure houses with minimal hotel-like amenities.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX37lsDviG6xA_a_bN1PzuTlHADfvhVrRIkXchVs6CugBan-u_qb1_gFuS63jONrnUkAg&usqp=CAU",
      },
      {
        label: "Apartment",
        desc: "1BHK or 2BHK unit with hall/kitchen for guests.",
        img: "https://storables.com/wp-content/uploads/2023/11/how-tall-is-a-3-story-apartment-building-1700108112.jpg",
      },
      {
        label: "Apart-Hotel",
        desc: "Studio apartment style units with hotel features.",
        img: "https://www.kayak.co.uk/rimg/himg/08/48/a6/expediav2-398423-45b465-481119.jpg?width=836&height=607&crop=true",
      },
      {
        label: "Hostel",
        desc: "Budget dorms with shared or private rooms and common spaces.",
        img: "https://ipshostel.in/mitavod/site/resources/uploads/big_dsc_0598.jpg",
      },
    ],
  };

  
  const handleCardClick = (type) => {
  setselectedtype(type);

  const routeMap = {
    Hotel: "/dashboard/HotelRegistration1",
    Resort: "/dashboard/ResortRegistration1",
    Lodge: "/dashboard/LodgeRegistration1",
    "Guest House": "/dashboard/GuestHouseRegistration1",
    Palace: "/dashboard/PlaceRegistration1",
   Houseboat:"/dashboard/HouseboatRegistration1",
   Villa:"/dashboard/VillaRegistration1",
   Homestay:"/dashboard/HomestayRegistration1",
   Cottage:"/dashboard/CottageRegistration1",
   Apartment:"/dashboard/ApartmentRegistration1",
   "Apart-Hotel":"/dashboard/AparthouseRegistration1",
   Hostel:"/dashboard/HostelRegistration1"
  };

  const route = routeMap[type];

  if (route) {
    navigate(route);
  } else {
    alert("Unknown property type");
  }
};

  return (
    <div className="container py-4">
      <h4>Which Property type would you like to list</h4>
      <p className="text-muted">Please select your property type below options</p>

      <div className="d-flex gap-3 my-3">
        {["Hotel", "Homestays & Villas"].map((c) => (
          <div
            key={c}
            className={`p-3 border rounded flex-fill ${selectcategory === c ? "border-primary" : ""}`}
            onClick={() => {
              setselectcategory(c);
              setselectedtype("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h5>{c}</h5>
            <p className="text-muted small">
              {c === "Hotel"
                ? "Accommodations with facilities like dining venues, meeting rooms & more"
                : "Large independent homes / bungalows for guests that can be rented entirely or by room"}
            </p>
          </div>
        ))}
      </div>

      <h5 className="mt-4">Types of {selectcategory}</h5>

      <div className="row">
        {categoryData[selectcategory].map((type) => (
          <div className="col-md-4 mb-4" key={type.label}>
            <div
              className={`card h-100 ${selectedtype === type.label ? "border-primary" : ""}`}
              onClick={() => handleCardClick(type.label)} //  Call the function
              style={{ cursor: "pointer" }}
            >
              <img
                src={type.img}
                className="card-img-top"
                alt={type.label}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6>{type.label}</h6>
                <p className="text-muted small">{type.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertySelector;
