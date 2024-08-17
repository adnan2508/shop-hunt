import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setItems(data);
      });
  }, []);

  const filterItems = (e) => {
    setItems(products.filter(product => product.category === e));
  };

  return (
    <div>
      <h2 className="text-center mt-8">this is Home: {items.length}</h2>

      <div className="w-11/12 mx-auto flex gap-2 md:gap-8 mb-8">
      <input type="text" placeholder="Search here..." className="input input-secondary max-w-xs" />
      <select className="select select-secondary max-w-xs">
  <option disabled selected>Sort By</option>
  <option>Price(Low to High)</option>
  <option>Price(High to Low)</option>
  <option>Alphabetically(A-Z)</option>
  <option>Alphabetically(Z-A)</option>
</select>
      </div>

      {/* Filter buttons */}
      <div className="w-11/12 mx-auto flex gap-3">
        <div className="flex flex-col lg:flex-row gap-2">
          <button className="btn btn-secondary" onClick={()=>setItems(products)}>All Products</button>
          <button className="btn btn-secondary" onClick={()=>filterItems("men's clothing")}>men's clothing</button>
          <button className="btn btn-secondary" onClick={()=>filterItems("women' clothing")}>women's clothing</button>
          <button className="btn btn-secondary" onClick={()=>filterItems("jewelery")}>jewelery</button>
          <button className="btn btn-secondary" onClick={()=>filterItems("electronics")}>electronics</button>
        </div>
      </div>

      {/* Product card */}
      <div className="w-11/12 mx-auto my-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Mapping through products */}
        {products.map((product) => (
          <div key={product.id} className="block border border-black-700 rounded-lg p-4 shadow-lg shadow-indigo-100">
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
