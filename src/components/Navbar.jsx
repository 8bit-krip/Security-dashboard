import { Link } from 'react-router-dom';
import Logo from '../assets/conslteklogo.png';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <a
        href="https://consltek.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        <img src={Logo} alt="Consltek Logo" className="h-10 w-auto" />
      </a>
      <Link
        to="/login"
        className="px-4 py-2 bg-[#935010] text-white rounded hover:bg-[#15587B] transition"
      >
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
