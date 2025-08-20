import React, { useState, useEffect } from 'react';
import DonutChart from '../components/DonutChart';
import SubheadingModal from '../components/SubheadingModal';
import { fetchSheetData } from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import ConsltekLogo from '../assets/Conslteklogo.png';
import CUKCLogo from '../assets/CUKC_logo.png';
import { FiHome, FiRefreshCw } from 'react-icons/fi';

const COLOR_MAP = {
  Green: '#228B22',
  Red: '#D93434',
  Gray: '#A0AEC0',
  Other:"#FF9900"
};

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSheetData();
      setData(res);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.message === "Network Error"
          ? "Could not connect to the API. Please ensure the server is running and the API URL is correct."
          : "An unexpected error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (title, values) => {
    const hasSubheadings = values?.Subheading && Object.keys(values.Subheading).length > 0;
    if (hasSubheadings) setSelectedService({ title, ...values });
  };

  const items = Object.entries(data?.Sheet1 || {});

  if (loading && !items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
        <svg className="animate-spin h-8 w-8 text-[#34808A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
        </svg>
        <p className="text-gray-700 text-lg font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-8">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-red-200">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchData}
            className="mt-6 px-6 py-2.5 text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e2ecf0] px-6 md:px-10 py-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 p-4 bg-white rounded-xl shadow-lg">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <img
            src={CUKCLogo}
            alt="Consltek Logo"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#15587B] tracking-tight">
            Security Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-[#15587B] hover:bg-[#0e4461] text-white rounded-full shadow-md transition duration-300 transform hover:scale-105"
            title="Home"
          >
            <FiHome size={22} />
          </button>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-3 bg-[#34808A] hover:bg-[#2d6e75] text-white rounded-full shadow-md transition duration-300 transform hover:scale-105 disabled:opacity-50"
            title="Refresh Data"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V8l-4 4 4 4v-4a8 8 0 010 16z"
                />
              </svg>
            ) : (
              <FiRefreshCw size={22} />
            )}
          </button>

          {/* Logo on right */}
          <img
            src={ConsltekLogo}
            alt="CUKC Logo"
            className="h-14 w-auto object-contain"
          />
        </div>
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {items.map(([title, values], idx) => {
          const compliantColor = COLOR_MAP[values?.status_C?.colour] || COLOR_MAP.Green;
          const nonCompliantColor = COLOR_MAP[values?.status_E?.colour] || COLOR_MAP.Red;
          const hasSubheadings = values?.Subheading && Object.keys(values.Subheading).length > 0;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(title, values)}
              className={`bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between transition-all duration-300 ${hasSubheadings ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-[#34808A]' : ''
                }`}
            >
              <div className="flex flex-col items-center gap-3">
                <h2 className="text-lg font-semibold text-center text-gray-800 w-full truncate">{title}</h2>
                <div className="flex gap-2 text-xs font-semibold flex-wrap justify-center">
                  {values?.status_C && (
                    <span
                      className="px-3 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: compliantColor }}
                    >
                      {values.status_C.name}
                    </span>
                  )}
                  {values?.status_E && (
                    <span
                      className="px-3 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: nonCompliantColor }}
                    >
                      {values.status_E.name}
                    </span>
                  )}
                  {values.Other > 0 && (
                    <span
                      className="px-3 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: COLOR_MAP.Other }}
                    >
                      Other
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center mt-6">
                <DonutChart
                  compliant={values.Compliant}
                  total={values.Total}
                  other={values.Other || 0}
                  colors={[compliantColor, nonCompliantColor, COLOR_MAP.Gray]}
                  labels={[
                    values?.status_C?.name || 'Compliant',
                    values?.status_E?.name || 'Non-Compliant',
                    'Other',
                  ]}
                />
                <p className="text-sm mt-3 text-gray-600 font-medium">
                  {values.Compliant} / {values.Total} &nbsp; ({values['%Compliant'] || 'N/A'})
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedService && (
        <SubheadingModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default Dashboard;
