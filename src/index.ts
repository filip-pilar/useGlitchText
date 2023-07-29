import { useState, useEffect } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/= ";

interface GlitchTextProps {
  text: string;
  timePerChar?: number;
  sequentialReveal?: boolean;
}

const useGlitchText = ({ text, timePerChar = 100, sequentialReveal = true }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [position, setPosition] = useState(0);

  const totalDuration = text.length * timePerChar;

  useEffect(() => {
    let initialText = "";
    for (let i = 0; i < text.length; i++) {
      initialText += letters[Math.floor(Math.random() * letters.length)];
    }
    setDisplayText(initialText);
  }, [text]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (position >= text.length) {
        setDisplayText(text);
        return;
      }

      let randomText = "";
      for (let i = 0; i < text.length; i++) {
        randomText +=
          sequentialReveal && i < position
            ? text[i]
            : letters[Math.floor(Math.random() * letters.length)];
      }
      setDisplayText(randomText);
    }, 50);

    const textInterval = setInterval(() => {
      setPosition((pos) => pos + 1);
    }, totalDuration / text.length);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(textInterval);
    };
  }, [text, totalDuration, position, sequentialReveal]);

  return displayText;
};

export default useGlitchText;