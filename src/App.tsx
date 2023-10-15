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
  const [font, setFont] = useState("inconsolata");
  const [data, setData] = useState<DataType | null | undefined>(null);

  async function fetchData(word: string) {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data[0]);
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
    if (wordSearchInput) {
      fetchData(wordSearchInput.value);
      wordSearchInput.value = "";
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
    <div className={`text-text-normal max-w-screen-[100%] p-6 ${fontVariants[font as keyof typeof fontVariants]}`}>
      <Header changeFont={changeFont} clearData={clearData} />
      <form
        className="bg-search_bar rounded-2xl flex flex-row items-center justify-start mt-6 relative"
        onSubmit={onFormSubmit}
      >
        <input
          type="text"
          placeholder="Search for any word..."
          id="word_search"
          autoComplete="false"
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

      {!data && (
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
      )}

      {data && (
        <>
          <div className="flex flex-row justify-between items-center mt-5">
            <div>
              <p className="text-3xl font-bold ">{data.word}</p>
              <p className="text-accent-1 text-lg font-inter">{data.phonetic}</p>
            </div>
            <button
              className="bg-accent-2 rounded-full p-4 flex justify-center items-center"
              onClick={() => playWordPronunciation(data.phonetics[data.phonetics.length - 1].audio)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-accent-1">
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
                  <p>{meaning.partOfSpeech}</p>
                  <span className="border-t border-search_bar w-full h-0"></span>
                </div>

                <p className="text-text-gray">Meaning</p>
                <ul>
                  {meaning.definitions.map((definition, index) => {
                    return (
                      <li className="list-disc" key={`definition-${index}`}>
                        {definition.definition}
                        <span className="block text-sm text-text-gray py-3">{definition.example}</span>
                      </li>
                    );
                  })}
                </ul>

                {meaning.synonyms.length > 0 && (
                  <div className="flex flex-row gap-6">
                    <p className="text-text-gray">Synonyms</p>
                    <div className="flex flex-row flex-wrap">
                      {meaning.synonyms.map((synonym, index) => {
                        return (
                          <a
                            onClick={() => fetchData(synonym)}
                            className="text-accent-1 font-bold"
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
                    <p className="text-text-gray">Antonyms</p>
                    <div className="flex flex-row flex-wrap">
                      {meaning.antonyms.map((antonym, index) => {
                        return (
                          <a
                            onClick={() => fetchData(antonym)}
                            className="text-accent-1 font-bold"
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
            <p className="text-text-gray">Source</p>

            <div className="flex flex-col flex-wrap">
              {data.sourceUrls.map((url, index) => {
                return (
                  <a className="underline break-all" key={`source-${index}`} href={url} target="_blank">
                    {url}
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
