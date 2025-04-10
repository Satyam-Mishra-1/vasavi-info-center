import React, { useState } from 'react';

// Example mockData (replace this with your real one)
const mockData = [
    { id: 1, name: "User 1", country: "India", state: "Telangana", mandal: "Mandal A", region: "North" },
    { id: 2, name: "User 2", country: "India", state: "Andhra Pradesh", mandal: "Mandal B", region: "South" },
    { id: 3, name: "User 3", country: "USA", state: "California", mandal: "Mandal C", region: "West" },
    { id: 4, name: "User 4", country: "India", state: "Telangana", mandal: "Mandal D", region: "South" },
    { id: 5, name: "User 5", country: "India", state: "Andhra Pradesh", mandal: "Mandal E", region: "East" },
    { id: 6, name: "User 6", country: "USA", state: "Texas", mandal: "Mandal F", region: "South" },
    { id: 7, name: "User 7", country: "India", state: "Karnataka", mandal: "Mandal G", region: "West" },
    { id: 8, name: "User 8", country: "India", state: "Maharashtra", mandal: "Mandal H", region: "West" },
    { id: 9, name: "User 9", country: "USA", state: "New York", mandal: "Mandal I", region: "East" },
    { id: 10, name: "User 10", country: "India", state: "Karnataka", mandal: "Mandal J", region: "North" },
    { id: 11, name: "User 11", country: "USA", state: "California", mandal: "Mandal K", region: "South" },
    { id: 12, name: "User 12", country: "India", state: "Maharashtra", mandal: "Mandal L", region: "East" },
    { id: 13, name: "User 13", country: "China", state: "Shenghai", mandal: "Mandal F", region: "South" },
    { id: 14, name: "User 14", country: "China", state: "Shenzi", mandal: "Mandal G", region: "West" },
    { id: 15, name: "User 15", country: "China", state: "Taiwan", mandal: "Mandal H", region: "West" },
  ];
  

const Filter = () => {
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    mandal: "",
    region: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", mandal: "", region: "" }),
      ...(name === "state" && { mandal: "", region: "" }),
      ...(name === "mandal" && { region: "" }),
    }));
  };

  const handleFilter = () => {
    const result = mockData.filter((item) => {
      return (
        (filters.country === "" || item.country === filters.country) &&
        (filters.state === "" || item.state === filters.state) &&
        (filters.mandal === "" || item.mandal === filters.mandal) &&
        (filters.region === "" || item.region === filters.region)
      );
    });

    setFilteredData(result);
    setShowResults(true);
  };

  const handleCancel = () => {
    setFilters({ country: "", state: "", mandal: "", region: "" });
    setFilteredData([]);
    setShowResults(false);
  };

  // Get dynamic options based on higher level selections
  const getAvailableStates = () => {
    return [
      ...new Set(
        mockData
          .filter((item) => !filters.country || item.country === filters.country)
          .map((item) => item.state)
      ),
    ];
  };

  const getAvailableMandals = () => {
    return [
      ...new Set(
        mockData
          .filter((item) =>
            (!filters.country || item.country === filters.country) &&
            (!filters.state || item.state === filters.state)
          )
          .map((item) => item.mandal)
      ),
    ];
  };

  const getAvailableRegions = () => {
    return [
      ...new Set(
        mockData
          .filter((item) =>
            (!filters.country || item.country === filters.country) &&
            (!filters.state || item.state === filters.state) &&
            (!filters.mandal || item.mandal === filters.mandal)
          )
          .map((item) => item.region)
      ),
    ];
  };

  return (
    <div>
      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-4 justify-center mb-4">
        {/* Country Dropdown */}
        <select
          name="country"
          onChange={handleChange}
          value={filters.country}
          className="border p-2 rounded"
        >
          <option value="">Country</option>
          {[...new Set(mockData.map(item => item.country))].map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          name="state"
          onChange={handleChange}
          value={filters.state}
          className="border p-2 rounded"
          disabled={!filters.country}
        >
          <option value="">State</option>
          {getAvailableStates().map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        {/* Mandal Dropdown */}
        <select
          name="mandal"
          onChange={handleChange}
          value={filters.mandal}
          className="border p-2 rounded"
          disabled={!filters.state}
        >
          <option value="">Mandal</option>
          {getAvailableMandals().map((mandal) => (
            <option key={mandal} value={mandal}>{mandal}</option>
          ))}
        </select>

        {/* Region Dropdown */}
        <select
          name="region"
          onChange={handleChange}
          value={filters.region}
          className="border p-2 rounded"
          disabled={!filters.mandal}
        >
          <option value="">Region</option>
          {getAvailableRegions().map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        {/* Buttons */}
        <button
          onClick={handleFilter}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Apply Filter
        </button>

        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-red-500 transition"
        >
          Cancel Filter
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Filtered Results</h3>
          {filteredData.length > 0 ? (
            <ul className="list-disc list-inside">
              {filteredData.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.country}, {item.state}, {item.mandal}, {item.region}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
