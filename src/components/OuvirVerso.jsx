import React, { useState, useRef, useEffect } from "react";
import { useTextToSpeech } from "../context/TTSContextProvider";
import Marquee from "react-fast-marquee";

const OuvirVerso = ({marqiTxt, className, now, mrq}) => {
  const pauseIcon = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M8 5V19M16 5V19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const playIcon = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke-width="2" stroke-linejoin="round"/></svg>`;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { audioUrl, text } = useTextToSpeech();

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioUrl]);

  const playTTS = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseTTS = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`flex justify-center items-center py-2 lg:py-8 ${className}`}>
      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} id="audio-element" className="hidden"></audio>
          {!isPlaying ? (
          
              <button onClick={playTTS} dangerouslySetInnerHTML={{ __html: playIcon }}
                      className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 
                      [&_svg]:stroke-gray-500 dark:hover:[&_svg]:stroke-gray-200 hover:[&_svg]:stroke-gray-700 duration-200 transition-all" />
          ) : (
              <button onClick={pauseTTS} dangerouslySetInnerHTML={{ __html: pauseIcon }}
                      className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 
                              [&_svg]:stroke-gray-500 dark:hover:[&_svg]:stroke-gray-200 hover:[&_svg]:stroke-gray-700 duration-200 transition-all" />
          )}

            {marqiTxt && 
             <div className="flex flex-col items-center relative">
                 {now && <small className="text-gray-500 dark:text-gray-500 lg:translate-x-0 -translate-x-8">tocando agora:</small>}

                  {mrq && <Marquee speed={40} className="text-gray-600 dark:text-gray-300 marqi 
                                        after:content-[''] 
                                        after:z-40 
                                        after:absolute 
                                        after:top-0 
                                        after:left-0 
                                        after:w-full 
                                        after:h-full 
                                        after:dark:bg-[linear-gradient(to_left,#313131,transparent,transparent,transparent,#313131)] 
                                        after:bg-[linear-gradient(to_left,#f0f0f0,transparent,transparent,transparent,#f0f0f0)] ![&>div]:break-words [&>div]:text-balance" >
                      {marqiTxt}
                  </Marquee>}
             </div>}
        </>
      )}
    </div>
  );
};

export default OuvirVerso;
