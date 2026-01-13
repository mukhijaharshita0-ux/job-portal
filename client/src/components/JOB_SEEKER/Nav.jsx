import hero from "../images/hero-image.png";
import cat from "../images/cat-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Nav() {
  const navigate = useNavigate();

  // ✅ ROLE BASED REDIRECT
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "employee") {
      navigate("/single", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              JobPortal
            </span>
          </a>

          <div className="flex items-center gap-3 md:order-2">
            <button
              onClick={handleLogout}
              className="text-blue bg-brand hover:bg-brand-strong font-medium rounded-base text-sm px-3 py-2"
            >
              Logout
            </button>
          </div>

          <div className="hidden md:flex md:order-1">
            <ul className="flex gap-8 font-medium">
              <li><a href="/" className="text-blue">Home</a></li>
              <li><a href="/jobs" className="hover:text-blue">Jobs</a></li>
            </ul>
          </div>

        </div>
      </nav>




      {/* SECOND SECTION — CAT IMAGE WITH OVERLAY */}

      <div className="mt-[120px] w-full">
        <figure className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={cat}
            alt="Cat background"
            className="w-full h-full object-cover"
          />

          {/* Overlay text */}

          <figcaption
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >

            <p className="text-white text-xl md:text-2xl font-semibold text-center px-6">
              Do you want to get notified when new jobs are posted?
            </p>
          </figcaption>

        </figure>
      </div>


      {/* THIRD SECTION — MESSAGE + HERO IMAGE */}
      <div className="mt-20 flex flex-col md:flex-row items-center justify-center px-6 gap-10">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:ml-20">
          <p
            className="text-4xl font-semibold mb-5 text-center md:text-left
                       font-[Poppins] tracking-tight text-gray-800 capitalize"
          >
            For any query, message us
          </p>

          <div
            className="flex items-center gap-2 border-2 border-gray-300 rounded-xl
                       px-4 py-2 text-gray-600 cursor-pointer
                       hover:border-gray-500 transition duration-200 w-fit"
          >
            <span className="text-base">Message here</span>
            <span className="material-icons text-gray-400">chat</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={hero}
            alt="contact"
            className="w-full max-w-md h-auto object-cover rounded-lg"
          />
        </div>

      </div>
    </>
  );
}

export default Nav;
