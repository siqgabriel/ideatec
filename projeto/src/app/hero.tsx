"use client";

import { useDarkMode } from '@/context/darkModeContext';
import { useEffect, useState } from "react";

export default function Hero() {
  const { isDarkMode } = useDarkMode();
  const [iframeUrl, setIframeUrl] = useState("");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);

    const timeout = setTimeout(() => {
      const url = isDarkMode
        ? "https://lottie.host/embed/1d2c9307-27db-4073-9c5a-df453b8f9bbb/iwtCVq0Ibw.json"
        : "https://lottie.host/embed/bed7f01e-8f01-4da4-8764-f57b49d62d2b/HKEmgAN2lD.json";
      
      setIframeUrl(url);

      setIsFading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [isDarkMode]);

  return (
    <section className="sec-1">
      <iframe
        src={iframeUrl}
        width="100%"
        height="500"
        className={`${isFading ? "blur-md" : "blur-0"} transition-all duration-1 ease-in-out`}
      />
      <div className="mx-8 lg:mx-16 w-[70%] -mt-24 rounded-xl bg-white dark:bg-zinc-900 p-5 md:p-14 shadow-md  translate-y-[-150px]">
        <div>
          <h1 className="text-4xl pb-5 dark:text-white">
            Learning App
          </h1>
          <p className="font-normal text-gray-500 pr-52 dark:text-white">
            Download our app to dive into a vast library of courses, tutorials,
            and study materials on a wide range of subjects - from programming
            and language learning to personal development and beyond
          </p>
        </div>
      </div> 
    </section>
  );
}
  