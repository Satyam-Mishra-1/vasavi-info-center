import React, { useState, useEffect } from "react";
import Product from "./Product";
import Filter from "./Filter";

function Products({ products, filters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    country: "",
    state: "",
    mandal: "",
    region: "",
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
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
