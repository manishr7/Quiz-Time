import React, { useState, useRef } from "react";
import { Card, Button, Toast } from "flowbite-react";

import winSound from "../assets/sounds/win.mp3";
import loseSound from "../assets/sounds/lose.mp3";

const Question = ({ data, onAnswer, index }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // useRef for storing audio instances
  const winAudioRef = useRef(new Audio(winSound));
  const loseAudioRef = useRef(new Audio(loseSound));

  const handleAnswerClick = (isCorrect, chosenOption) => {
    if (isCorrect) {
      setToastMessage("✅ Correct! +4 marks");
      setToastType("success");
      winAudioRef.current.currentTime = 0; // Reset to the beginning
      winAudioRef.current.volume = 1; // Set volume
      winAudioRef.current
        .play()
        .catch((err) => console.error("Error playing win sound:", err));
    } else {
      setToastMessage("❌ Incorrect! -1 mark");
      setToastType("failure");
      loseAudioRef.current.currentTime = 0;
      loseAudioRef.current.volume = 1;
      loseAudioRef.current
        .play()
        .catch((err) => console.error("Error playing lose sound:", err));
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);

    onAnswer(isCorrect, chosenOption, index);
  };

  return (
    <div className="relative">
      <Card className="h-fit md:h-[20rem]">
        <h2 className="text-lg md:text-base font-semibold mb-4">
          {data.description}
        </h2>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {data.options.map((answer, idx) => (
            <Button
              className="bg-gradient-to-br from-indigo-500 to-blue-700"
              key={idx}
              onClick={() =>
                handleAnswerClick(answer.is_correct, answer.description)
              }
            >
              {answer.description}
            </Button>
          ))}
        </div>
      </Card>
      <div
        className={`fixed top-5 right-5 transition-all duration-500 ease-in-out transform ${
          showToast
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Toast
          className={`text-white px-4 py-2 rounded-lg shadow-lg ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          onClose={() => setShowToast(false)}
        >
          <span className="text-lg font-semibold">{toastMessage}</span>
        </Toast>
      </div>
    </div>
  );
};

export default Question;
