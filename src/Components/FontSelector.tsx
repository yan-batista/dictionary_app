import { useState } from "react";

interface FontSelectorProps {
  changeFont: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ changeFont }: FontSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function OpenCloseFontSelector() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <div className="text-sm font-bold relative">
      <div className="flex flex-row items-center gap-4" onClick={OpenCloseFontSelector}>
        <p id="font-name-placeholder">Mono</p>
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
          className="bg-search_bar w-32 rounded-lg p-4 shadow-themeSelector absolute top-10 right-0 flex flex-col gap-2 z-10"
          id="font-selector-list"
        >
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="inter" defaultChecked={true} />
            <label className="font-inter">Sans Serif</label>
          </div>
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="lora" defaultChecked={false} />
            <label className="font-lora">Serif</label>
          </div>
          <div onClick={changeFont} className="font-inter">
            <input type="radio" className="hidden" name="font" value="inconsolata" defaultChecked={false} />
            <label className="font-inconsolata">Mono</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
