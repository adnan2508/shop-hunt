import React, { useEffect, useState } from "react";
import "animate.css";
import { FaStar } from "react-icons/fa6";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Search functionality
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Sorting functionality
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case "Price(Low to High)":
        return products.sort((a, b) => a.price - b.price);
      case "Price(High to Low)":
        return products.sort((a, b) => b.price - a.price);
      case "Alphabetically(A-Z)":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "Alphabetically(Z-A)":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "Rating":
        return products.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  };

  const filterProducts = products.filter((product) => {
    return (
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedProducts = sortProducts(filterProducts);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="w-11/12 mx-auto flex gap-2 md:gap-8 my-8">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search here..."
          className="input input-secondary max-w-xs"
          value={search}
          onChange={handleSearchChange}
        />

        {/* Sort box */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="select select-secondary max-w-xs"
        >
          <option value="" disabled selected>
            Sort By
          </option>
          <option value="Price(Low to High)">Price(Low to High)</option>
          <option value="Price(High to Low)">Price(High to Low)</option>
          <option value="Alphabetically(A-Z)">Alphabetically(A-Z)</option>
          <option value="Alphabetically(Z-A)">Alphabetically(Z-A)</option>
          <option value="Rating">Rating</option>
        </select>
      </div>

      {/* Filter buttons */}
      <div className="w-11/12 mx-auto flex gap-3">
        <div className="flex flex-col lg:flex-row gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-secondary ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product card */}
      <div className="w-11/12 mx-auto my-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Mapping through products */}
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="block border border-black-700 rounded-lg p-4 shadow-lg shadow-indigo-100"
          >
            <img
              alt=""
              src={product.image}
              className="hover:scale-110 duration-500 h-60 w-56 rounded-lg mx-auto"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dd className="text-lg text-gray-500">${product.price}</dd>
                </div>

                <div>
                  {/* <dt className="sr-only">Address</dt> */}
                  <dd className="font-bold text-xl">{product.title}</dd>
                </div>

                <p className="mt-2">
                  {" "}
                  {product.description.substring(0, 140) + "..."}
                </p>
              </dl>

              <div className="mt-6 flex justify-between items-center gap-8 text-xs">
                <div className="mt-1.5 sm:mt-0">
                  <div className="badge badge-secondary">
                    {product.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-lg text-yellow-400"/>
                  <p className="text-base">{product.rating.rate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : "btn-secondary"
              } mx-1`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
