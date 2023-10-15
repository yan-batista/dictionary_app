import { useState } from "react";
import Header from "./Components/Header";
import "./styles/global.css";

function App() {
  const [font, setFont] = useState("inter");

  function changeFont(event: React.MouseEvent<HTMLParagraphElement>) {
    const fontInput = event.currentTarget.querySelector("input");
    if (fontInput) {
      fontInput.checked = true;
      setFont(fontInput.value);
      updateFontNamePlaceholder(fontInput);
    }
  }

  function updateFontNamePlaceholder(fontInput: HTMLInputElement) {
    const inputLabel = fontInput.nextElementSibling;
    const fontNamePlaceholder = document.querySelector("#font-name-placeholder");

    if (inputLabel && fontNamePlaceholder) {
      fontNamePlaceholder.innerHTML = inputLabel.innerHTML;
    }
  }

  const fontVariants = {
    inter: "font-inter",
    lora: "font-lora",
    inconsolata: "font-inconsolata",
  };

  return (
    <div className={`text-text-normal max-w-screen-[100%] p-6 ${fontVariants[font as keyof typeof fontVariants]}`}>
      <Header changeFont={changeFont} />
      <form className="bg-search_bar rounded-2xl flex flex-row items-center justify-start mt-6 relative">
        <input
          type="text"
          placeholder="Search for any word..."
          id="search"
          name="q"
          className="bg-transparent w-full outline-none caret-accent-1 placeholder:text-text-gray rounded-2xl border border-bg focus:border-accent-1 px-6 py-4"
        ></input>
        <p className="absolute text-xs text-red-500 top-16 hidden">Whoops, can't be empty...</p>
        <button className="absolute right-4 hover:bg-bg rounded-full flex flex-row justify-center items-center p-2 ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" className="w-4 h-4">
            <path
              fill="none"
              stroke="#A445ED"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            />
          </svg>
        </button>
      </form>

      <div className="flex flex-col justify-center items-center gap-6 mt-[5rem]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 38" className="w-8 h-8 stroke-text-gray">
          <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="1.5">
            <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"></path>
            <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"></path>
            <path d="M11 9h12"></path>
          </g>
        </svg>
        <h1 className="text-lg font-bold">Welcome to Dictionary App</h1>
        <p>Start searching for any word...</p>
      </div>
    </div>
  );
}

export default App;
