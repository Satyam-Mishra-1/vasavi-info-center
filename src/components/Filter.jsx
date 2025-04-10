import React from "react";
import Products from "../pages/Products";
import family from "../public/family-slide.jpg";

const filters = [];
const products = [
    {
      id: 1,
      name: "User 1",
      title: "Classic Crewneck",
      ownerName: "Alice",
      phone: "1234567890",
      country: "India",
      state: "Telangana",
      mandal: "Mandal A",
      region: "North",
      category: "Tees",
      imageSrc: family,
      imageAlt: "Crewneck",
      price: "$35",
    },
    {
      id: 2,
      name: "User 2",
      title: "Premium Hoodie",
      ownerName: "Bob",
      phone: "9876543210",
      country: "India",
      state: "Andhra Pradesh",
      mandal: "Mandal B",
      region: "South",
      category: "Sweatshirts",
      imageSrc: family,
      imageAlt: "Hoodie",
      price: "$40",
    },
    {
      id: 3,
      name: "User 3",
      title: "Comfort Tee",
      ownerName: "Charlie",
      phone: "1112223333",
      country: "USA",
      state: "California",
      mandal: "Mandal C",
      region: "West",
      category: "Tees",
      imageSrc: family,
      imageAlt: "Tee",
      price: "$30",
    },
    {
        id: 4,
        name: "User 3",
        title: "Comfort Tee",
        ownerName: "Charlie",
        phone: "1112223333",
        country: "USA",
        state: "California",
        mandal: "Mandal C",
        region: "West",
        category: "Tees",
        imageSrc: family,
        imageAlt: "Tee",
        price: "$30",
      },
      {
        id: 5,
        name: "User 3",
        title: "Comfort Tee",
        ownerName: "Charlie",
        phone: "1112223333",
        country: "Japan",
        state: "California",
        mandal: "Mandal C",
        region: "West",
        category: "Tees",
        imageSrc: family,
        imageAlt: "Tee",
        price: "$30",
      },
      {
        id: 6,
        name: "User 3",
        title: "Comfort Tee",
        ownerName: "Charlie",
        phone: "1112223333",
        country: "USA",
        state: "California",
        mandal: "Mandal C",
        region: "West",
        category: "Tees",
        imageSrc: family,
        imageAlt: "Tee",
        price: "$30",
      },
      {
        id: 7,
        name: "User 3",
        title: "Comfort Tee",
        ownerName: "Charlie",
        phone: "1112223333",
        country: "China",
        state: "California",
        mandal: "Mandal C",
        region: "West",
        category: "Tees",
        imageSrc: family,
        imageAlt: "Tee",
        price: "$30",
      },
  ];

function Filter() {
  return (
    <div>
      {/* <Products products={products} filterData={filterData} />*/}
      <Products products={products} filters={filters} />
    </div>
  );
}

export default Filter;
