import { useState } from "react";

interface FontSelectorProps {
  font: string;
  changeFont: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ font, changeFont }: FontSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function OpenCloseFontSelector() {
    setIsOpen((prevState) => !prevState);
  }

  const fontNames = {
    inter: "Sans Serif",
    lora: "Serif",
    inconsolata: "Mono",
  };

  return (
    <div className="text-sm font-bold relative cursor-pointer">
      <div className="flex flex-row items-center gap-4" onClick={OpenCloseFontSelector}>
        <p id="font-name-placeholder" className="select-none md:text-lg">
          {fontNames[font as keyof typeof fontNames]}
        </p>
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
        <div
          className="bg-search_bar w-32 md:w-36 md:text-lg rounded-lg p-4 shadow-themeSelector absolute top-10 right-0 flex flex-col gap-2 z-10"
          id="font-selector-list"
        >
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="inter" defaultChecked={true} />
            <label className={`cursor-pointer select-none font-inter ${font === "inter" ? "text-accent-1" : ""}`}>
              Sans Serif
            </label>
          </div>
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="lora" defaultChecked={false} />
            <label className={`cursor-pointer select-none font-lora ${font === "lora" ? "text-accent-1" : ""}`}>
              Serif
            </label>
          </div>
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="inconsolata" defaultChecked={false} />
            <label
              className={`cursor-pointer select-none font-inconsolata ${font === "inconsolata" ? "text-accent-1" : ""}`}
            >
              Mono
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
