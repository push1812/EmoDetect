import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-secondary fixed top-0 w-full z-50 px-5 md:px-20 py-4 flex flex-wrap justify-between items-center">
      {/* Website Name / Logo */}
      <Link to="/">
        <div className="font-bold font-logo text-3xl md:text-5xl text-white">
          emoti<span className="text-[#f5cb5c]">.cam</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-6 text-md md:text-xl text-white">
        <Link
          to="/"
          className="hover:text-[#f5cb5c] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/detect"
          className="hover:text-[#f5cb5c] transition-colors duration-200"
        >
          Detect
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
