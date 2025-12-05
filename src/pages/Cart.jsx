import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/slice/cartSlice";

export default function Cart() {
  const cart = useSelector(state => state.cart.items); // Reduxdan olish
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", card: "" });

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId)); // Redux orqali remove
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const sendToTelegram = (name, email, total) => {
    const BOT_TOKEN = "8527872106:AAHE3ibx1OiQpC2ja4SYi_YTXYOu-KXvwbA";
    const CHAT_ID = "7116299492";
    const message = `
New Payment Alert!
Name: ${name}
Email: ${email}
Total: $${total}
    `;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    })
      .then(res => res.json())
      .then(data => console.log("Message sent:", data))
      .catch(err => console.error("Error sending message:", err));
  };

  const handlePayAll = (e) => {
    e.preventDefault();
    sendToTelegram(formData.name, formData.email, totalPrice);
    setShowForm(false);
    // Redux bilan cartni tozalash
    cart.forEach(item => dispatch(removeFromCart(item.id)));
    setFormData({ name: "", email: "", card: "" });
    alert("Payment completed and sent to Telegram!");
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Cart bo‘sh 😢</h2>
        <p className="text-gray-500">Siz hali hech narsa qo‘shmadingiz.</p>
        <Link
          to="/product"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
        >
          Barcha Productsga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Cart ({cart.length})</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {cart.map(item => (
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
            <p className="text-purple-600 font-bold mb-2">${item.price}</p>

            <button
              onClick={() => handleRemove(item.id)}
              className="px-3 py-1 w-12 h-12 absolute right-4 top-4 rounded-md text-white bg-gray-900 hover:bg-gray-700 transition"
            >
              ❌
            </button>

            <Link
              to={`/checkout/${item.id}`}
              className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mt-auto"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: <span className="text-purple-600">${totalPrice}</span>
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Pay All
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Complete Payment
            </h2>
            <form className="flex flex-col gap-3" onSubmit={handlePayAll}>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Card Number"
                className="border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                value={formData.card}
                onChange={(e) => setFormData({ ...formData, card: e.target.value })}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              >
                Pay ${totalPrice}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
