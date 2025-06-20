import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { username, email, password } = form;

    if (!email || !password || (isRegistering && !username)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegistering
        ? 'YOUR_REGISTER_ENDPOINT_HERE'
        : 'YOUR_LOGIN_ENDPOINT_HERE';

      const payload = isRegistering ? { username, email, password } : { email, password };

      const res = await axios.post(endpoint, payload);
      alert(res.data.message);
      console.log(isRegistering ? 'Registered as:' : 'Logged in as:', res.data.username);
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl transition-all">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            {isRegistering ? 'Please register to continue' : 'Login to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-400 text-black rounded-xl hover:border-purple-600 hover:ring-2 hover:ring-purple-500 hover:ring-offset-1 cursor-pointer transition"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-400 text-black rounded-xl hover:border-purple-600 hover:ring-2 hover:ring-purple-500 hover:ring-offset-1 cursor-pointer transition"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-400 text-black rounded-xl hover:border-purple-600 hover:ring-2 hover:ring-purple-500 hover:ring-offset-1 cursor-pointer transition"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm sm:text-base transition-transform transform hover:scale-105 bg-gradient-to-r from-green-300 to-green-500 hover:shadow-lg"
          >
            {loading ? 'Please wait...' : isRegistering ? 'Sign Up' : 'Sign In'}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => setIsRegistering(!isRegistering)}
              className={`cursor-pointer font-medium underline ${isRegistering ? 'text-blue-600' : 'text-blue-600'
                }`}
            >
              {isRegistering ? 'Login' : 'Register'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
