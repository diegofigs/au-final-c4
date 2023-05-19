import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 shadow-lg p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <nav className="md:flex md:justify-between md:items-center text-white">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/" className="text-2xl font-bold">
                Chain 4
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:flex md:items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className="mx-2 text-sm font-medium hover:text-purple-200"
              >
                Home
              </Link>
            </div>
            <div className="mt-3 md:mt-0 md:ml-6">
              <ConnectButton />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
