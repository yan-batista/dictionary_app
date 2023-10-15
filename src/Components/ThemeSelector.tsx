import { useState } from "react";

const ThemeSelector = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  function changeTheme() {
    setIsThemeDark((prevState) => !prevState);
  }

  return (
    <div className="flex flex-row gap-3 items-center border-l border-text-gray ml-4 pl-4" onClick={changeTheme}>
      <div>
        <div
          className={`w-10 h-5 rounded-full flex flex-row items-center px-[2px] ${
            isThemeDark ? "bg-accent-1 justify-end" : "bg-text-gray justify-start"
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white"></div>
        </div>
        <input type="checkbox" className="hidden" defaultChecked={isThemeDark} />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
          className={`${isThemeDark ? "stroke-accent-1" : "stroke-text-gray"}`}
        ></path>
      </svg>
    </div>
  );
};

export default ThemeSelector;
