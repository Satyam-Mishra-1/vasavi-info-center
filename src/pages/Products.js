// import React, { useState, useEffect } from "react";
// import Product from "./Product";
// import Filter from "./Filter";

// function Products({ products, filters }) {
//   const [selectedFilters, setSelectedFilters] = useState({
//     country: "India",
//     state: "Andhra Pradesh",
//     district: "Prakasham",
//     city: "Markapur",
//     category: "",
//   });

//   const [filteredProducts, setFilteredProducts] = useState(products);

//   useEffect(() => {
//     let filtered = products;

//     Object.entries(selectedFilters).forEach(([key, value]) => {
//       if (value) {
//         filtered = filtered.filter((item) => item[key] === value);
//       }
//     });

//     setFilteredProducts(filtered);
//   }, [selectedFilters, products]);

//   const getAvailableOptions = (key) => {
//     let filtered = products;

//     Object.entries(selectedFilters).forEach(([k, v]) => {
//       if (v && k !== key) {
//         filtered = filtered.filter((item) => item[k] === v);
//       }
//     });

//     const uniqueValues = [
//       ...new Set(filtered.map((product) => product[key])),
//     ];

//     return uniqueValues;
//   };

//   return (
//     <div className="flex gap-6">
//       <Filter
//          selectedFilters={selectedFilters}
//          setSelectedFilters={setSelectedFilters}
//          getAvailableOptions={getAvailableOptions}
//       />

//       <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;









import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";

function Products({ products: initialProducts }) {
  const defaultProducts = [
    {
      id: 1,
      title: "Spiritual Center",
      name: "Pulivendala Temple",
      category: "Temple",
      ownerName: "Brahma Kumaris",
      phone: "9701509241",
      price: "Free Entry",
      imageSrc: "https://source.unsplash.com/400x300/?temple,pulivendala",
      imageAlt: "Pulivendala Temple",
      templeName: "Pulivendala",
      country: "India",
      state: "Andhra Pradesh",
      district: "Kadapa",
      city: "Pulivendala",
    },
    // Add more sample products if needed
  ];

  const products = initialProducts && initialProducts.length > 0
    ? initialProducts
    : defaultProducts;

  const [selectedFilters, setSelectedFilters] = useState({
    country: "India",
    state: "Andhra Pradesh",
    district: "Prakasham",
    city: "Markapur",
    category: "",
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedFilters, products]);

  const getAvailableOptions = (key) => {
    let filtered = products;

    Object.entries(selectedFilters).forEach(([k, v]) => {
      if (v && k !== key) {
        filtered = filtered.filter((item) => item[k] === v);
      }
    });

    const uniqueValues = [
      ...new Set(filtered.map((product) => product[key])),
    ];

    return uniqueValues;
  };

  return (
    <div className="flex gap-6">
      <Filter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        getAvailableOptions={getAvailableOptions}
      />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Product key={product.id || product.name} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
