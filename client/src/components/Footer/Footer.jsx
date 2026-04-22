import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6 text-2xl">
         <img src="/favicon.svg" alt="Bookify logo" className="w-8 h-8" />
         <h1>bookify</h1>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Empowering creators worldwide with the most advanced AI content
          creation tools. Transform your ideas into reality.
        </p>
      </div>
      <div className="border-t border-zinc-400">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a href="https://prebuiltui.com">bookify</a> ©2025. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
