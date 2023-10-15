import { useState } from "react";

const FontSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  function OpenCloseFontSelector() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className="text-sm font-bold relative">
      <div className="flex flex-row items-center gap-4" onClick={OpenCloseFontSelector}>
        <p>Mono</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`stroke-accent-1 w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="bg-search_bar w-32 rounded-lg p-4 shadow-themeSelector absolute top-10 right-0 flex flex-col gap-2">
          <p>Sans Serif</p>
          <p>Serif</p>
          <p>Mono</p>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
