import React from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e2ecf0] relative overflow-hidden">
      <Navbar />

      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#34808A] opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#935010] opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] pt-[80px] px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#15587B] mb-6 text-center">
            Login to <span className="text-[#34808A]">Consltek Dashboard</span>
          </h2>

          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name</label>
              <input
                type="text"
                placeholder="e.g. Consltek Solutions"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34808A] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                placeholder="Kishan@consltek.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34808A] bg-white"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-[#34808A] to-[#15587B] text-white font-semibold rounded-lg shadow hover:scale-105 hover:from-[#15587B] hover:to-[#34808A] transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
