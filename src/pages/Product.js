// import React from "react";

// function Product({ product }) {
//   return (
//     <div className="bg-white mt-5 mb-5 rounded-lg shadow hover:shadow-lg transition duration-300 p-3">
//       <img
//         src={product.imageSrc}
//         alt={product.imageAlt}
//         className="w-full h-48 object-cover rounded"
//       />
//       <div className="mt-2">
//         <h3 className="text-lg font-semibold text-gray-800">
//           {product.title}
//         </h3>
//         <p className="text-gray-500 text-sm">
//           {product.name} ({product.category})
//         </p>
//         <p className="text-gray-700 text-sm">
//           Owner: {product.ownerName}
//         </p>
//         <p className="text-gray-700 text-sm">Phone: {product.phone}</p>
//         <p className="text-indigo-600 font-bold mt-2">{product.price}</p>
//       </div>
//     </div>
//   );
// }

// export default Product;



import React from "react";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mandalchart/temple?name=${encodeURIComponent(product.templeName)}`);
  };

  return (
    <div
      className="bg-white mt-5 mb-5 rounded-lg shadow hover:shadow-lg transition duration-300 p-3 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm">
          {product.name} ({product.category})
        </p>
        <p className="text-gray-700 text-sm">Owner: {product.ownerName}</p>
        <p className="text-gray-700 text-sm">Phone: {product.phone}</p>
      </div>
    </div>
  );
}

export default Product;
