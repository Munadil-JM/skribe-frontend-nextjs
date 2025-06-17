"use client";

import { Suspense, useState, lazy, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi2";
import ContactUs from "./ContactUs";

const HiMenu = lazy(() =>
  import("react-icons/hi").then((m) => ({ default: m.HiMenu }))
);
const HiX = lazy(() =>
  import("react-icons/hi").then((m) => ({ default: m.HiX }))
);

const Navbar = () => {
  const productsDropDownRef = useRef(null);
  const resourcesDropDownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  // const { pathname } = useLocation();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMenuClose = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMenuClose);

    return () => mediaQuery.removeEventListener("change", handleMenuClose);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        productsDropDownRef.current &&
        !productsDropDownRef.current.contains(e.target)
      ) {
        setIsProductsOpen(false);
      }

      if (
        resourcesDropDownRef.current &&
        !resourcesDropDownRef.current.contains(e.target)
      ) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#002B5B] font-inter sticky z-50 top-0 left-0 py-3 px-5 lg:px-10">
      <ContactUs
        open={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />

      <nav className="container mx-auto flex items-center justify-between md:gap-10 xl:gap-20">
        <div className="flex items-center justify-between md:gap-10 xl:gap-20">
          <Link href={"/"}>
            <img
              src="/assets/logo-footer.png"
              alt="Skribe Logo"
              className="h-8"
            />
          </Link>

          <ul
            className={`text-[#EDF5FF] items-start lg:items-center gap-6 ${
              isMenuOpen
                ? "flex flex-col absolute top-14 pt-6 left-0 px-10 h-dvh z-10 font-semibold bg-[#002B5B] w-full text-xl"
                : "hidden lg:flex font-medium lg:text-sm"
            }`}
          >
            <li>
              <Link href="/">Home</Link>
            </li>

            <li className="relative w-full" ref={productsDropDownRef}>
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsProductsOpen((p) => !p)}
              >
                Products
                <HiChevronDown
                  className={`${isProductsOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 cursor-pointer`}
                />
              </button>

              {isProductsOpen && (
                <ul
                  className={`bg-[#002B5B] p-2 pr-6 w-fit flex flex-col gap-2 ${isMenuOpen ? "relative left-0" : "absolute top-8 -left-2"}`}
                >
                  <li>
                    <Link href="/discover">Discover</Link>
                  </li>
                  <li>
                    <Link href="/monitoring">Monitoring</Link>
                  </li>
                  <li>
                    <Link href="/analytics">Analytics</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* <li>
              <Link href="/pricing">Pricing</Link>
            </li> */}

            <li className="relative w-full" ref={resourcesDropDownRef}>
              <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={() => setIsResourcesOpen((p) => !p)}
              >
                Resources
                <HiChevronDown
                  className={`${isResourcesOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 cursor-pointer`}
                />
              </button>

              {isResourcesOpen && (
                <ul
                  className={`bg-[#002B5B] p-2 pr-6 w-fit flex flex-col gap-2 ${isMenuOpen ? "relative left-0" : "absolute top-8 -left-2"}`}
                >
                  {/* <li>
                    <Link href="/case-studies" className="whitespace-nowrap">
                      Case Studies
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/chai-time">Chai Time</Link>
                  </li>
                  <li>
                    <Link href="/skribe365">Skribe 365</Link>
                  </li>
                  <li>
                    <Link
                      href="/projournalist-list"
                      className="whitespace-nowrap"
                    >
                      Top Journalists
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/careers">Careers</Link>
            </li>

            <li>
              <Link className="whitespace-nowrap" href="/about-us">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <aside className="flex items-center gap-5">
          <button
            className="hidden lg:block cursor-pointer text-white py-1 px-3 text-sm rounded-md font-medium"
            type="button"
            onClick={() => setIsContactUsOpen(true)}
          >
            Request Demo
          </button>

          <Link
            href="/signup"
            className="hidden lg:block cursor-pointer hover:bg-white hover:text-[#002B5B] border-2 border-white text-white py-1 px-3 text-sm rounded-md font-medium"
          >
            Signup
          </Link>

          <Link
            className="cursor-pointer bg-[#EDF5FF] hover:bg-[#002B5B] hover:text-white border-2 border[#002B5B] text-[#002B5B] font-medium py-1 px-3 text-sm rounded-lg"
            href="/login"
          >
            Login
          </Link>

          <button
            className="cursor-pointer lg:hidden"
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            <Suspense>
              {isMenuOpen ? (
                <HiX size={28} className="text-[#EDF5FF]" />
              ) : (
                <HiMenu size={28} className="text-[#EDF5FF]" />
              )}
            </Suspense>
          </button>
        </aside>
      </nav>
    </header>
  );
};

export default Navbar;
