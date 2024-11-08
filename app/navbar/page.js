import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-16 w-full bg-cyan-600 shadow-sm gap-6 text-white p-4 flex items-center justify-start mt-0">
      <button>
        <Link
          href="/servicecheck"
          className="p-2 bg-white text-black flex items-center justify-center rounded-md"
        >
          Service
        </Link>
      </button>

      <button>
        <Link
          href="/sim"
          className="p-2 bg-white text-black flex items-center justify-center rounded-md"
        >
          Robi Sim
        </Link>
      </button>
    </div>
  );
};

export default NavBar;
