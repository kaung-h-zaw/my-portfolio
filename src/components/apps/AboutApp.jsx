import React from "react";

export default function AboutApp() {
  return (
    <div className="p-8 font-mono max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <div className="w-40 h-40 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_black]">
          <img
            src="/me-nb.png"
            alt="Kaung"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black uppercase">Kaung Htet Zaw</h1>
          <div className="border-l-4 border-black pl-4">
            <p className="text-lg font-bold">
              Full-Stack Developer based in Bangkok.
            </p>
          </div>
          <p className="text-sm leading-relaxed">
            I build clean, responsive UIs using React and Tailwind CSS.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold bg-black text-white inline-block px-1 mb-2 text-sm">
            CURRENTLY
          </h3>
          <div className="text-sm">
            Working on <strong>Sendo</strong> e-book app.
          </div>
        </div>
        <div>
          <h3 className="font-bold bg-black text-white inline-block px-1 mb-2 text-sm">
            EDUCATION
          </h3>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>
              <strong>B.IT (Computer Science)</strong> - QUT (2023-2024)
            </li>
            <li>
              <strong>HND Computing</strong> - GUSTO College (2019-2023)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
