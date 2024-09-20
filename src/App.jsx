import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data?.quotes?.length);
      setQuote(data?.quotes?.[randomIndex]);
      setLoading(false);
    } catch {
      console.log("Error fetching quote");
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div id="quote-box">
      <div id="text">{`${quote.quote}`}</div>
      <div id="author">{`-${quote.author}`}</div>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `"${quote.quote}" — ${quote.author}`
        )}`}
        id="tweet-quote"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet
      </a>
      <button onClick={() => getQuote()} id="new-quote">
        new quote
      </button>
    </div>
  );
}

export default App;
