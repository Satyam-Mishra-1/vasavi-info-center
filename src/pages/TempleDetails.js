// import React from "react";
// import { useSearchParams } from "react-router-dom";

// const templeData = [
//   {
//     name: "Badvel",
//     address:
//       "Siva Sundara Bhawan, D.no: 11-1-445/1, Pappula Bazar, Badvel, Kadapa-516227, Andhra Pradesh",
//     contacts: ["08569-284743", "9985664124"],
//   },
//   {
//     name: "Chapara",
//     address:
//       "Plot No: 2-21, Trilok Bhawan, Chinna Devara Street, Meliaputti Mandal, Chapara, Srikakulam-532216, Andhra Pradesh",
//     contacts: ["9346178752", "8332814938"],
//     email: "chapara@bkivv.org",
//   },
//   {
//     name: "Chittoor",
//     address:
//       "Shiva Paramatmanubhuti Bhawan, D.no: 16-411/1, M.G.R. Street, Chittoor-517001, Andhra Pradesh",
//     contacts: ["08572-235302", "9441051289"],
//     email: "chittoor@bkivv.org",
//   },
//   {
//     name: "Pulivendala",
//     address:
//       "Diamond House, H.no: 404, 3/7/119, Ammawarisala Street, Pulivendala, Kadapa-516390, Andhra Pradesh",
//     contacts: ["8568-226713", "9701509241", "7036080561"],
//     email: "pulivendala@bkivv.org",
//   },
//   // Add more temples as needed...
// ];

// function TempleDetails() {
//   const [searchParams] = useSearchParams();
//   const templeName = searchParams.get("name");

//   const temple = templeData.find(
//     (t) => t.name.toLowerCase() === templeName?.toLowerCase()
//   );

//   if (!temple) {
//     return (
//       <div className="p-4 text-red-600 text-center">
//         Temple not found. Please select a valid temple.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded shadow p-6 mt-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-3">{temple.name}</h1>
//       <p className="text-gray-700 mb-2">
//         <strong>Address:</strong> {temple.address}
//       </p>
//       <p className="text-gray-700 mb-2">
//         <strong>Contact:</strong> {temple.contacts.join(", ")}
//       </p>
//       {temple.email && (
//         <p className="text-blue-600 mb-2">
//           <strong>Email:</strong>{" "}
//           <a href={`mailto:${temple.email}`} className="underline">
//             {temple.email}
//           </a>
//         </p>
//       )}
//       <img
//         src={`https://source.unsplash.com/600x300/?temple,${temple.name}`}
//         alt={temple.name}
//         className="rounded mt-4 shadow"
//       />
//     </div>
//   );
// }

// export default TempleDetails;



import React from "react";
import { useSearchParams } from "react-router-dom";
import temple from "../public/temple-slide.jpg";

const templeData = [
  {
    name: "Badvel",
    imageSrc:"https://th.bing.com/th/id/OIP.n9a52h5M18i05cWrX0P82AHaIz?rs=1&pid=ImgDetMain",
    address:
      "Siva Sundara Bhawan, D.no: 11-1-445/1, Pappula Bazar, Badvel, Kadapa-516227, Andhra Pradesh",
    contacts: ["08569-284743", "9985664124"],
    description:
      "This serene temple in Badvel serves as a spiritual hub for the local community. It is known for its tranquil atmosphere and daily devotional activities.",
  },
  {
    name: "Chapara",
    imageSrc:"https://th.bing.com/th/id/OIP.n9a52h5M18i05cWrX0P82AHaIz?rs=1&pid=ImgDetMain",
    address:
      "Plot No: 2-21, Trilok Bhawan, Chinna Devara Street, Meliaputti Mandal, Chapara, Srikakulam-532216, Andhra Pradesh",
    contacts: ["9346178752", "8332814938"],
    email: "chapara@bkivv.org",
    description:
      "The Chapara temple is a peaceful retreat for devotees and regularly hosts meditation and yoga sessions.",
  },
  {
    name: "Chittoor",
    imageSrc:"https://th.bing.com/th/id/OIP.n9a52h5M18i05cWrX0P82AHaIz?rs=1&pid=ImgDetMain",
    address:
      "Shiva Paramatmanubhuti Bhawan, D.no: 16-411/1, M.G.R. Street, Chittoor-517001, Andhra Pradesh",
    contacts: ["08572-235302", "9441051289"],
    email: "chittoor@bkivv.org",
    description:
      "Located in the heart of Chittoor, this temple is a vibrant center for spiritual learning and community events.",
  },
  {
    name: "Pulivendala",
    imageSrc:"https://th.bing.com/th/id/OIP.n9a52h5M18i05cWrX0P82AHaIz?rs=1&pid=ImgDetMain",
    address:
      "Diamond House, H.no: 404, 3/7/119, Ammawarisala Street, Pulivendala, Kadapa-516390, Andhra Pradesh",
    contacts: ["8568-226713", "9701509241", "7036080561"],
    email: "pulivendala@bkivv.org",
    description:
      "Pulivendala temple offers a peaceful ambiance and is popular for its weekend spiritual discourses.",
  },
  // Add more temples if needed
];

function TempleDetails() {
  const [searchParams] = useSearchParams();
  const templeName = searchParams.get("name");

  const temple = templeData.find(
    (t) => t.name.toLowerCase() === templeName?.toLowerCase()
  );

  if (!temple) {
    return (
      <div className="p-4 text-red-600 text-center">
        Temple not found. Please select a valid temple.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mt-10 mb-10 mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10">
      <img
        src={temple.imageSrc }
        alt={temple.name}
        className="w-full object-cover h-64"
      />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {temple.name} Temple
        </h1>
        <p className="text-gray-700 text-base mb-4">{temple.description}</p>
        <p className="text-gray-700 mb-2">
          <strong>Address:</strong> {temple.address}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Contact:</strong> {temple.contacts.join(", ")}
        </p>
        {temple.email && (
          <p className="text-blue-600 mb-2">
            <strong>Email:</strong>{" "}
            <a href={`mailto:${temple.email}`} className="underline">
              {temple.email}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}


export default TempleDetails;