import "./Quote.css";
import { useState, useEffect } from "react";
const Quote = () => {
  const [quote, setQuote] = useState(
    "Its better to fail in originality than to succeed in limitation"
  );

  // async function fetchText() {
  //   let response = await fetch("https://api.adviceslip.com/advice");
  //   let data = await response.json();
  //   console.log(data.slip.advice);
  //   setQuote(data.slip.advice);
  // }
  // useEffect(() => {
  //   fetchText();
  // }, []);
  useEffect(() => {
    let interval = setInterval(async () => {
      let response = await fetch("https://api.adviceslip.com/advice");
      let data = await response.json();
      console.log(data.slip.advice);
      setQuote(data.slip.advice);
    }, 60000);
  }, []);
  return (
    <div className="quote">
      <h3>Quote #1</h3>
      {/* <p>"Its better to fail in originality than to succeed in limitation"</p> */}
      <p>{quote}</p>

      <img src="./images/refresh.svg"></img>
    </div>
  );
};
export default Quote;
