import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Salvos from "../../components/Salvos";
import SaveButton from "../../components/SaveButton";
import OuvirVerso from "../../components/OuvirVerso";
import { useTextToSpeech } from "../../context/TTSContextProvider";

export default function Livros() {
  const { abbrev } = useParams();
  const [abrev, setAbrev] = useState([]);
  const [pagina, setPagina] = useState(0);
  const navigate = useNavigate();
  const { convertTextToSpeech, setText } = useTextToSpeech();
  const [loading, setLoading] = useState({}); 
  const [marqiTxt, setMarqiTxt] = useState(false)

  const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`;

  useEffect(() => {
    const fetchBook = async () => {
      const req = await fetch(`/books/${atob(abbrev)}.json`);
      const res = await req.json();
      setTimeout(() =>{
        setAbrev(res);
      },600)
    };
    fetchBook();
  }, [abbrev]);

  useEffect(() => {
    const hashPage = window.location.hash;
    const page = hashPage ? parseInt(hashPage.substring(1), 10) : 0;
    
    if (!isNaN(page) && page >= 0) {
      setPagina(page);
    } else {
      setPagina(0);
    }
  }, []);
  
  const handleTTSClick = async (index) => {
    setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
    await convertTextToSpeech();
    setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
  };

  if (!abrev.chapters) {
    return          <div className="h-full flex place-items-center absolute w-full justify-center gap-6">
                       <div className="text-gray-950 dark:text-gray-400 animate-spin dark:invert" dangerouslySetInnerHTML={{__html:loadSpin}} />
                       <span className="text-gray-600 dark:text-gray-300">carregando...</span>
                    </div>
  }

  return (
    <>
      <Salvos />
      <Header className="fixed top-0 z-50" />
      <article className="max-w-[1280px] text-left mx-auto flex flex-col lg:flex-row relative h-full gap-10 py-16 px-8 font-['Poppins']">

          <div className="lg:top-[9rem] top-28 lg:w-4/12 w-full sticky h-full z-20 bg-[linear-gradient(to_bottom,#f0f0f0_70%,_transparent)] dark:bg-[linear-gradient(to_bottom,#313131_70%,_transparent)] lg:py-0 py-8">
            {abrev.chapters.length > 1 && (
              <>
                <small className="text-gray-400 tracking-widest block text-center">NAVEGUE PELOS CAPÍTULOS:</small> 
                <div className="flex gap-2 flex-wrap items-center justify-center [&>.active]:bg-gray-600 dark:[&>.active]:bg-gray-800 cl:px-8 px-0 overflow-y-scroll h-24 lg:h-auto">
                    {abrev.chapters.map((_, index) => (
                        <button key={index} onClick={() => setPagina(index)} className={`w-6 h-6 rounded text-gray-200 text-center hover:bg-gray-700 dark:bg-gray-600 bg-gray-400 text-xs ${pagina === index ? 'active' : ''}`}>
                        {index + 1}
                        </button>
                    ))}
                </div>
              </>
            )}
            <OuvirVerso marqiTxt={marqiTxt} className={'lg:flex-col flex-row'} now={true} mrq={true}/>
          </div>

        <div className="lg:w-1/2 w-full relative z-10 py-24 ">

          <div className="flex justify-between items-center mb-12">
            <button className="text-gray-950 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-200 cl:px-8 px-0" onClick={() => navigate('/')}>
              &lt; voltar
            </button>
            <h2 className="text-gray-600 dark:text-gray-400 font-extrabold cl:text-3xl text-xl ">{abrev.name}: {pagina+1}</h2>
          </div>

          {abrev.chapters[pagina].map((quote, index) => (
            <div key={index} className="relative [&:last-of-type_hr]:opacity-0 cl:pr-0 pr-10 cl:pl-0 pl-1" onMouseEnter={()=>setText(quote)} onTouchStart={()=>setText(quote)}>
              <span className="dark:text-gray-400 text-gray-700 block py-5">
                <sup className="px-0.5 py-0.5 rounded-full text-[.6rem] z-10 relative backdrop-blur-sm bg:text-gray-100 text-gray-800 dark:text-gray-500 mr-1">
                  {index + 1}
                </sup>
                {quote}
              </span>

              <div className="flex flex-col top-0 right-1 absolute items-center gap-3">
                  <button onClick={() => {handleTTSClick(index), setMarqiTxt(quote) }}
                          dangerouslySetInnerHTML={{ __html: loading[index] ? loadSpin : hasVoice }}
                          className={`${loading[index] ? 'animate-spin' : ''} text-gray-700 tts hover:text-gray-500 flex mx-auto gap-2 
                                    dark:[&_svg_path]:stroke-gray-400 [&>svg_path]:stroke-gray-600 hover:[&_svg]:brightness-150 duration-200 transition-all`}>
                  </button>

                  <SaveButton className="right-1 bottom-3" book={`${abrev.name} - ${pagina + 1}:${index + 1} - ${atob(abbrev)}`} />
              </div>

              <hr className="border-gray-600/60 w-[95%] mx-auto" />
            </div>
          ))}

        </div>
      </article>
      <Footer />
    </>
  );
}
