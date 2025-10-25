import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-gray-800">
        <div className="container mx-auto px-6 xl:px-40 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col pl-5">
              <h1 className="font-bold text-xl mb-2">Get to Know Us</h1>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>About Ecommerce</li>
                <li>Careers</li>
                <li>Press Releases</li>
                <li>Ecommerce Science</li>
              </ul>
            </div>
            <div className="flex flex-col pl-5">
              <h1 className="font-bold text-xl mb-2">Connect with Us</h1>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className="flex flex-col pl-5">
              <h1 className="font-bold text-xl mb-2">Make Money with Us</h1>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Sell on Ecommerce</li>
                <li>Affiliate Program</li>
                <li>Advertise</li>
              </ul>
            </div>
            <div className="flex flex-col pl-5">
              <h1 className="font-bold text-xl mb-2">Help</h1>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Customer Service</li>
                <li>Returns</li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 px-4 sm:px-10 md:px-20 lg:px-40 py-4 text-gray-300 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-3 mb-1">
          <a href="">Conditions of Use & Sale</a>
          <a href="">Privacy Notice</a>
          <a href="">Interest-Based Ads</a>
        </div>
        <p>© 1996–2025, Ecommerce.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default Footer;
