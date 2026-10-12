import { Link } from "react-router-dom";
import { FileText, Plus } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-gray-800 bg--gray px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-white transition hover:text-gray-300"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-md">
            <FileText size={22} />
          </div>

          <span>Notes App</span>
        </Link>

        {/* Create Note Button */}
       {/* Create Note Button */}
<Link
  to="/create"
  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-lg"
>
  <Plus size={18} />
  <span>Create Note</span>
</Link>

      </div>
    </nav>
  );
}

export default Navbar;