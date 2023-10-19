import FontSelector from "./FontSelector";
import ThemeSelector from "./ThemeSelector";

interface HeaderProps {
  changeFont: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  clearData: () => void;
  font: string;
}

const Header: React.FC<HeaderProps> = ({ changeFont, clearData, font }: HeaderProps) => {
  return (
    <header className="max-w-full flex flex-row items-center justify-between">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 38"
        className="w-8 h-8 md:w-10 md:h-10 stroke-text-gray cursor-pointer"
        onClick={clearData}
      >
        <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="1.5">
          <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"></path>
          <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"></path>
          <path d="M11 9h12"></path>
        </g>
      </svg>
      <div className="flex flex-row justify-center items-center">
        <FontSelector font={font} changeFont={changeFont} />
        <ThemeSelector />
      </div>
    </header>
  );
};

export default Header;
