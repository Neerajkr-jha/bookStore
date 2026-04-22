import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gray-900 px-6 py-12">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">
        Meet Our Team
      </h1>

      <p className="text-gray-400 text-center mt-3 max-w-xl mx-auto text-sm md:text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                      gap-12 mt-12">

        {[
          {
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: "Donald Jackman",
            role: "Founder & CEO",
          },
          {
            src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: "Michael Brown",
            role: "Head of Engineering",
          },
          {
            src: "https://randomuser.me/api/portraits/men/75.jpg",
            name: "David Thompson",
            role: "Full-Stack Developer",
          },
          {
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: "Olivia Martinez",
            role: "Product Designer",
          },
          {
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            name: "Liam Anderson",
            role: "Backend Developer",
          },
          {
            src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            name: "Jordan Lee",
            role: "Marketing Lead",
          },
        ].map(({ src, name, role }) => (

          <div
            key={name}
            className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={src}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-600 group-hover:border-purple-400 transition"
            />

            <h3 className="text-lg font-semibold text-white mt-3 text-center">
              {name}
            </h3>

            <p className="text-purple-400 text-sm text-center mt-1">
              {role}
            </p>

            <div className="flex gap-3 mt-3">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
             
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <svg width="18" height="18" fill="none">
                  <path d="..." />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;