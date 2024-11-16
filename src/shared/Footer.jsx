import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-20 rounded-t-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <img className="w-44" src="/logo.png" alt="" />
            <p className="mt-4 ">
              We provide exceptional service and high-quality products to help
              your business thrive. Contact us to learn more about what we
              offer.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-lg font-semibold">Useful links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#home" className="hover:underline ">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline ">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline ">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline ">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#home" className="hover:underline ">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline ">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline ">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline ">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-4 ">Email: info@example.com</p>
            <p className="">Phone: +1 (555) 123-4567</p>
            <p className="">Address: 123 Main Street, City, Country</p>
          </div>
        </div>

        {/* Footer Bottom: Copyright */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-8">
          <div className="flex gap-5">
            <FaFacebookF className=" text-3xl  hover:bg-green p-1 hover:rounded-full" />
            <FaXTwitter className=" text-3xl  hover:bg-green p-1 hover:rounded-full" />
            <FaYoutube className=" text-3xl text-rose-700  hover:bg-green p-1 hover:rounded-full" />
            <FaInstagram className=" text-3xl  hover:bg-green p-1 hover:rounded-full" />
          </div>
          <div className="">
            <p className="text-center ">
              &copy;2024 My Company. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
