import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slice/wishlistSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  if (wishlist.length === 0) {
    return (
      <div className="p-8 text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Wishlist bo‘sh 😢</h2>
        <p className="text-gray-500">Siz hali hech narsa qo‘shmadingiz.</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
        >
          Barcha Productsga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">❤️ Wishlist ({wishlist.length})</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {wishlist.map(item => (
          <div
            key={item.id}
            className="flex flex-col shadow-lg p-4 rounded-xl border hover:shadow-xl transition h-full relative"
          >
            <div className="flex-1 flex items-center justify-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            </div>

            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

            <button
              onClick={() => handleRemove(item.id)}
              className="px-3 py-1 w-12 h-12 absolute right-4 top-4 rounded-md text-white bg-gray-900 hover:bg-gray-700 transition"
            >
              ❤️
            </button>

            <Link
              to={`/checkout/${item.id}`}
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
