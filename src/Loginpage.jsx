import React, { useState } from "react";
import axios from "axios";

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("link to post", {    //add post link
        email,
        password,
      });

      alert(res.data.message);
      setError("");
      console.log("Logged in as:", res.data.username);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm w-full bg-white p-8 rounded-2xl mt-10 mx-auto shadow-lg">
      <h2 className="text-3xl font-semibold text-purple-800 text-center mb-6">
        Login
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-purple-700 block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-purple-700 block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-purple-600 underline hover:text-purple-800 transition"
        >
          Register
        </a>
      </p>
    </div>
  );
};

export default Loginpage;
