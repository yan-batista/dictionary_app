import "./styles/global.css";

function App() {
  return (
    <div className="bg-bg/90 text-text-normal font-inter">
      <input
        type="text"
        className="bg-search_bar outline-none w-96 py-4 rounded-lg font-bold "
        placeholder="Search for any word..."
      ></input>
      <h1 className="text-xl">Heading</h1>
      <p>paragraph</p>
      <p className="text-text-gray">gray paragraph</p>
      <button className="border border-accent-2 hover:border-accent-1 bg-accent-2 hover:bg-accent-1 rounded-full p-4">
        OK
      </button>
    </div>
  );
}

export default App;
