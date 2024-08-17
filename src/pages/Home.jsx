import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState([
    "all", 
    "men's clothing", 
    "women's clothing", 
    "jewelery", 
    "electronics"
]);
  // const [categories, setCategories] = useState([]);
  // const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");

  // const fetchData = (search) => {
  //   let url = `https://fakestoreapi.com/products`;

  //   if (search !== '') {
  //     url = `https://fakestoreapi.com/products/search?q=${search}`;
  //   };
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  // }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // fetch("https://fakestoreapi.com/products/categories")
    //   .then((res) => res.json())
    //   .then((json) => setCategories(json))
    //   .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Search functionality
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // filtering categories
  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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

  return (
    <div>
      <h2 className="text-center mt-8">this is Home: {products.length}</h2>

      <div className="w-11/12 mx-auto flex gap-2 md:gap-8 mb-8">
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
          <option disabled selected>
            Sort By
          </option>
          <option>Price(Low to High)</option>
          <option>Price(High to Low)</option>
          <option>Alphabetically(A-Z)</option>
          <option>Alphabetically(Z-A)</option>
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
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="block border border-black-700 rounded-lg p-4 shadow-lg shadow-indigo-100"
          >
            <img
              alt=""
              src={product.image}
              className="h-[500px] w-full rounded-md"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dd className="text-sm text-gray-500">${product.price}</dd>
                </div>

                <div>
                  {/* <dt className="sr-only">Address</dt> */}
                  <dd className="font-medium">{product.title}</dd>
                </div>

                <p className="mt-2">
                  {" "}
                  {product.description.substring(0, 140) + "..."}
                </p>
              </dl>

              <div className="mt-6 flex items-center gap-8 text-xs">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <div className="mt-1.5 sm:mt-0">
                    <div className="badge badge-secondary">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
