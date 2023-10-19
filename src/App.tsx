import { useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import "./styles/global.css";

interface DataType {
  word: string;
  phonetic: string;
  phonetics: [{ text: string; audio: string }];
  meanings: [
    {
      partOfSpeech: string;
      definitions: [
        {
          definition: string;
          example: string;
        }
      ];
      synonyms: string[];
      antonyms: string[];
    }
  ];
  sourceUrls: string[];
}

function App() {
  const [font, setFont] = useState("inter");
  const [data, setData] = useState<DataType | null | undefined>(null);
  const [formError, setFormError] = useState<boolean>(false);

  async function fetchData(word: string) {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data[0]);
      window.scrollTo(0, 0);
    } catch (error) {
      setData(undefined);
    }
  }

  function clearData() {
    setData(null);
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const wordSearchInput: HTMLInputElement | null = event.currentTarget.querySelector("#word_search");
    if (wordSearchInput && wordSearchInput.value !== "") {
      setFormError(false);
      fetchData(wordSearchInput.value);
      wordSearchInput.value = "";
    } else if (wordSearchInput && wordSearchInput.value === "") {
      setFormError(true);
    }
  }

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

  function playWordPronunciation(audioURL: string) {
    const audio = new Audio(audioURL);
    audio.play();
  }

  const fontVariants = {
    inter: "font-inter",
    lora: "font-lora",
    inconsolata: "font-inconsolata",
  };

  return (
    <div
      className={`text-text-normal max-w-screen-[100%] p-6 md:px-9 md:py-12 lg:w-[52rem] lg:py-16 ${
        fontVariants[font as keyof typeof fontVariants]
      }`}
    >
      <Header changeFont={changeFont} clearData={clearData} font={font} />
      <form
        className="bg-search_bar rounded-2xl flex flex-row items-center justify-start mt-6 md:mt-12 relative"
        onSubmit={onFormSubmit}
        autoComplete="off"
        id="search_word_form"
      >
        <input
          type="text"
          placeholder="Search for any word..."
          id="word_search"
          name="q"
          className={`bg-transparent w-full outline-none caret-accent-1 placeholder:text-text-gray font-bold rounded-2xl border ${
            formError ? "border-red-500 focus:border-red-500" : "border-bg"
          } focus:border-accent-1 px-6 py-4 md:text-xl`}
        ></input>
        {formError && <p className="absolute text-xs text-red-500 top-16">Whoops, can't be empty...</p>}
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

      {data === null && (
        <div className="flex flex-col justify-center items-center gap-6 mt-[5rem] md:mt-28">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 38" className="w-8 h-8 stroke-text-gray">
            <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="1.5">
              <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"></path>
              <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"></path>
              <path d="M11 9h12"></path>
            </g>
          </svg>
          <h1 className="text-lg md:text-2xl font-bold">Welcome to Dictionary App</h1>
          <p className="md:text-lg">Start searching for any word...</p>
        </div>
      )}

      {data === undefined && (
        <div className="flex flex-col justify-center gap-6 items-center text-center w-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a445ed"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12 md:w-16 md:h-16 mt-[5rem] md:mt-28 mb-[1.5rem]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
          <p className="font-bold md:text-xl">No Definitions Found</p>
          <p className="leading-4 md:text-lg">
            Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at
            later time or head to the web instead.
          </p>
        </div>
      )}

      {data && (
        <>
          <div className="flex flex-row justify-between items-center mt-5 md:mt-16">
            <div>
              <p className="text-3xl md:text-[64px] font-bold ">{data.word}</p>
              <p className="text-accent-1 text-lg md:text-2xl md:mt-4 font-inter">{data.phonetic}</p>
            </div>
            <button
              className="group bg-accent-2 rounded-full p-4 md:p-6 flex justify-center items-center hover:bg-accent-1 duration-150"
              onClick={() => playWordPronunciation(data.phonetics[data.phonetics.length - 1].audio)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-4 h-4 md:w-6 md:h-6 fill-accent-1 group-hover:fill-white duration-150"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g id="play">
                      <polygon points="4,0 28,16 4,32"></polygon>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>

          {data.meanings.map((meaning) => {
            return (
              <div className="mt-6 flex flex-col gap-6" key={`meaning-${data.word}-${meaning.partOfSpeech}`}>
                <div className="flex flex-row items-center gap-4">
                  <p className="md:text-2xl font-bold italic">{meaning.partOfSpeech}</p>
                  <span className="border-t border-search_bar w-full h-0"></span>
                </div>

                <p className="text-text-gray md:text-xl">Meaning</p>
                <ul className="list-disc marker:text-accent-1 list-outside ml-[1.3rem] md:ml-10">
                  {meaning.definitions.map((definition, index) => {
                    return (
                      <li className="md:text-lg" key={`definition-${index}`}>
                        <p className="py-1">{definition.definition}</p>
                        {definition.example && (
                          <span className="block text-sm md:text-lg text-text-gray py-3 md:py-2">
                            {definition.example}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {meaning.synonyms.length > 0 && (
                  <div className="flex flex-row gap-6">
                    <p className="text-text-gray md:text-xl">Synonyms</p>
                    <div className="flex flex-row flex-wrap">
                      {meaning.synonyms.map((synonym, index) => {
                        return (
                          <a
                            onClick={() => fetchData(synonym)}
                            className="text-accent-1 font-bold md:text-xl cursor-pointer hover:underline"
                            key={`synonym-${index}`}
                          >
                            {synonym}
                            {index < meaning.synonyms.length - 1 && <>,&nbsp;</>}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {meaning.antonyms.length > 0 && (
                  <div className="flex flex-row gap-6">
                    <p className="text-text-gray md:text-xl">Antonyms</p>
                    <div className="flex flex-row flex-wrap">
                      {meaning.antonyms.map((antonym, index) => {
                        return (
                          <a
                            onClick={() => fetchData(antonym)}
                            className="text-accent-1 font-bold md:text-xl cursor-pointer hover:underline"
                            key={`antonym-${index}`}
                          >
                            {antonym}
                            {index < meaning.antonyms.length - 1 && <>,&nbsp;</>}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <hr className="border border-t-0 border-search_bar border-b-1 w-full my-4" />
          <div className="flex flex-row gap-6">
            <p className="text-text-gray md:text-lg">Source</p>

            <div className="flex flex-col flex-wrap">
              {data.sourceUrls.map((url, index) => {
                return (
                  <a
                    className="underline break-all md:text-lg hover:text-accent-1 duration-150"
                    key={`source-${index}`}
                    href={url}
                    target="_blank"
                  >
                    {url}
                    <svg
                      className="ml-1 inline-block h-4 w-4 stroke-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
