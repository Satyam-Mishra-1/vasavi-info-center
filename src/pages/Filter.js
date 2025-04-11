import React from "react";

function Filter({ selectedFilters, setSelectedFilters, getAvailableOptions }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", district: "", region: "", category: "" }),
      ...(name === "state" && { district: "", region: "", category: "" }),
      ...(name === "district" && { region: "", category: "" }),
      ...(name === "city" && { category: "" }),
    }));
  };
    
  const filterFields = [
    { id: "country", label: "Country" },
    { id: "state", label: "State" },
    { id: "district", label: "District" },
    { id: "city", label: "City" },
    { id: "category", label: "Category" },
  ];

  return (
    <div className="w-72 bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
      {filterFields.map((filter) => (
        <div key={filter.id}>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {filter.label}
          </label>
          <select
            name={filter.id}
            value={selectedFilters[filter.id]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
           <option value="">All</option>
            {getAvailableOptions(filter.id).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default Filter;
