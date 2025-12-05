import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

export default function Checkout() {
  const { id } = useParams();
  const cart = useSelector(state => state.cart.items); // Redux
  const wishlist = useSelector(state => state.wishlist.items); // Redux
  const dispatch = useDispatch();

  const [prod, setProd] = useState(null);
  const [comments, setComments] = useState([]);
  const [related, setRelated] = useState([]);
  const [showForm, setShowForm] = useState(false);

  if(showForm){
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // Fetch product by ID
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json())
      .then(data => setProd(data));
  }, [id]);

  useEffect(() => {
    setComments([
      { id: 1, name: "Alice", text: "Great product!" },
      { id: 2, name: "Bob", text: "Satisfied." }
    ]);
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/smartphones?limit=5`)
      .then(r => r.json())
      .then(data => setRelated(data.products));
  }, []);

  if (!prod) return <h2 className="text-center text-2xl mt-20">Loading...</h2>;

  const handleAddToCart = () => {
    if (!cart.some(c => c.id === prod.id)) {
      dispatch(addToCart(prod));
    }
  };

  const handlePay = () => {
    if (cart.length === 0) {
      alert("Cart bo‘sh! Avval mahsulot qo‘shing.");
      return;
    }
    setShowForm(true);
  };

  const totalPrice = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">{prod.title}</h1>

      <div className="flex flex-col md:flex-row gap-6 shadow-lg p-6 rounded-xl border hover:shadow-xl transition">
        <div className="flex-1 flex items-center justify-center">
          <img src={prod.thumbnail} alt={prod.title} className="w-full max-w-sm h-72 object-cover rounded-lg" />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-white mb-4">{prod.description}</p>
            <h3 className="text-2xl font-semibold mb-2">${prod.price}</h3>
            <p className="text-sm text-gray-500">Brand: {prod.brand}</p>
            <p className="text-sm text-gray-500">Category: {prod.category}</p>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handlePay}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Pay Now
            </button>
            <Link
              to="/"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className="border p-4 rounded-md">
              <p className="font-semibold">{c.name}</p>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{640:{slidesPerView:2}, 1024:{slidesPerView:3}}}>
            {related.map(r => (
              <SwiperSlide key={r.id}>
                <div className="flex flex-col shadow-lg p-4 rounded-xl border hover:shadow-xl transition h-full relative">
                  <img src={r.thumbnail} alt={r.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h3 className="font-semibold text-lg">{r.title}</h3>
                  <p className="text-sm text-gray-500">${r.price}</p>
                  <Link
                    to={`/checkout/${r.id}`}
                    className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md mt-2"
                  >
                    Buy Now
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Payment Form */}
      {showForm && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Complete Payment
            </h2>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Payment of $${totalPrice} completed!`);
                setShowForm(false);
              }}
            >
              <input type="text" placeholder="Name" required className="border p-2 rounded-md" />
              <input type="email" placeholder="Email" required className="border p-2 rounded-md" />
              <input type="text" placeholder="Card Number" required className="border p-2 rounded-md" />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
                Pay ${totalPrice}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
