"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/= ";
const useGlitchText = ({ text, timePerChar = 100, sequentialReveal = true }) => {
    const [displayText, setDisplayText] = (0, react_1.useState)("");
    const [position, setPosition] = (0, react_1.useState)(0);
    const totalDuration = text.length * timePerChar;
    (0, react_1.useEffect)(() => {
        let initialText = "";
        for (let i = 0; i < text.length; i++) {
            initialText += letters[Math.floor(Math.random() * letters.length)];
        }
        setDisplayText(initialText);
    }, [text]);
    (0, react_1.useEffect)(() => {
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
exports.default = useGlitchText;
//# sourceMappingURL=index.js.map