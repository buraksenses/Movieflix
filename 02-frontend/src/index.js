import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import RatingStars from "./components/Utils/RatingStars";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <RatingStars color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {<App />}
    {/* <RatingStars
      maxRating={5}
      color="yellow"
      size={48}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={0}
    />
    <RatingStars maxRating={4} color="red" size={36} defaultRating={3} />
    <Test />*/}
  </React.StrictMode>
);
