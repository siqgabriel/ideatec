import React, { useState, useEffect } from 'react';

const TypingEffect: React.FC = () => {
  const phrases = ["O FUTURO NAS NOSSAS MÃOS", "A TECNOLOGIA NOS GUIA", "INOVAÇÃO CONSTANTE"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const typeNextChar = () => {
      if (charIndex < currentPhrase.length) {
        setDisplayedText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setIsTyping(false);
        setTimeout(() => setIsTyping(true), 500); 
      }
    };

    // Limpa o texto e prepara para a próxima frase
    if (isTyping) {
      const typingInterval = setInterval(typeNextChar, 200);
      return () => clearInterval(typingInterval);
    } else {
      const clearTextInterval = setInterval(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === '') {
          setCharIndex(0);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          clearInterval(clearTextInterval);
        }
      }, 50);
      return () => clearInterval(clearTextInterval);
    }
  }, [charIndex, isTyping, currentPhraseIndex, displayedText, phrases]);

  return <p className="absolute dark:text-white">{displayedText}</p>;
};

export default TypingEffect;
