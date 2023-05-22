import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 shadow-lg p-6">
        <div className="container mx-auto px-2">
          <nav className="md:flex md:justify-between md:items-center text-white">
            <div className="flex justify-between items-center">
              <div>
                <Link to="/" className="text-2xl font-bold">
                  Chain 4
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open menu</span>
                  {/* Icon when menu is closed. */}
                  {!isOpen && <HiMenu className="block h-6 w-6 text-white" />}
                  {/* Icon when menu is open. */}
                  {isOpen && <HiX className="block h-6 w-6 text-white" />}
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="mt-4 md:mt-0 md:flex md:items-center">
                <div className="flex items-center"></div>
                <div className="mt-3 md:mt-0 md:ml-6">
                  <ConnectButton chainStatus="icon" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-full w-full z-10 transition transform origin-top-right md:hidden">
          <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 w-full shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-2 space-y-1">
              <div className="flex justify-center">
                <ConnectButton chainStatus="icon" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
