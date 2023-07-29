export interface GlitchTextProps {
    text: string;
    timePerChar?: number;
    sequentialReveal?: boolean;
}

declare const useGlitchText: ({ text, timePerChar, sequentialReveal }: GlitchTextProps) => string;
export default useGlitchText;