import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slice/wishlistSlice";
import { Link } from "react-router-dom";

export default function Product() {
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const lap = await fetch("https://dummyjson.com/products/category/laptops").then(r => r.json());
      const ph = await fetch("https://dummyjson.com/products/category/smartphones").then(r => r.json());
      setProducts([...lap.products, ...ph.products]);
    }
    fetchData();
  }, []);

  function toggleWishlist(item) {
    if (wishlist.some(w => w.id === item.id)) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Barcha Products: <span className="text-purple-500">(Laptops + Smartphones)</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {products.map(prod => (
          <div key={prod.id} className="flex flex-col shadow-lg p-4 rounded-xl border hover:shadow-xl transition h-full relative">
            <div className="flex-1 flex items-center justify-center">
              <img src={prod.thumbnail} alt={prod.title} className="w-full h-48 object-cover rounded-lg mb-3" />
            </div>

            <h3 className="font-semibold text-lg mb-2">{prod.title}</h3>

            <button
              onClick={() => toggleWishlist(prod)}
              className={`px-3 py-1 w-12 h-12 absolute right-4 top-4 rounded-md text-white mb-3 
                ${wishlist.some(w => w.id === prod.id) ? "bg-gray-900" : "bg-gray-700"}`}
            >
              {wishlist.some(w => w.id === prod.id) ? "❤️" : "🤍"}
            </button>

            <Link
              to={`/checkout/${prod.id}`}
              className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md mt-auto"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
