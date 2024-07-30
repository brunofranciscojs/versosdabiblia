import React, { useState, useEffect } from "react"
import Header from "../../components/Header"
import Salvos from "../../components/Salvos"
import OuvirVerso from "../../components/OuvirVerso"
import { useTextToSpeech } from "../../context/TTSContextProvider"
import SaveButton from "../../components/SaveButton"
import { useParams } from "react-router-dom"
import Busca from "../../components/busca"

export default function Ouvir(){
     const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
     const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`;
     const chList = `<svg fill="none" height="20px" width="20px" viewBox="0 0 24 24" xml:space="preserve"><path d="M5,24H3v-3H0v-2h3v-3h2v3h3v2H5V24z M19,21h-9v-2h7V6H5v8H3V4h4V0h16v17h-4V21z M19,15h2V2H9v2h10V15z"/></svg>`

     const [capitulos, setCapitulos] = useState([])
     const [livroAtivo, setLivroAtivo] = useState(false)
     const [book, setBook] = useState('')
     const { convertTextToSpeech, setText, text } = useTextToSpeech();
     const [loading, setLoading] = useState({}); 
     const { name, abbrev } = useParams();
     const [playerInfo, setPlayerInfo] = useState('')
     const [width, setWidth] = useState(window.innerWidth);
     const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
     },[]);

     useEffect(() => {
         fetchBook(abbrev ? atob(abbrev) : 'gn' )
     }, [name, abbrev]);
      
     useEffect(() => {
       const fetchCapitulos = async () => {
         const request = await fetch('/books/books.json');
         const result = await request.json();
         setCapitulos(result);
      };
   
       fetchCapitulos();
     },[]);
          
      const fetchBook = async (abbrev) =>{
        const req = await fetch(`/books/${abbrev}.json`)
        const res = await req.json()
        setBook(res)
      }

      const handleTTSClick = async (index) => {
      setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
      await convertTextToSpeech();
      setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
    };

      useEffect(() => {
        const desver = (e) => {
          if ( !document.querySelector('ol')?.contains(e.target) && e.target.tagName !== 'BUTTON') {
            setOpen(false);
          }
        };
        
        window.addEventListener('click', desver);
        return () =>   window.removeEventListener('click', desver); 
    }, []);


     return(
         <>
          <Salvos />
          <Header className="fixed top-0 shadow-none"/>

          <section className="flex flex-col player relative">
             <div className="flex">

              {width > 1024 && 
                  <ol className='flex flex-col text-left [&>li]:text-xl max-w-[270px] w-full overflow-y-scroll h-dvh pb-32 pt-48 listaCH font-["Poppins"]
                                dark:bg-black/20 bg-white dark:[&:has(li.active)_li.active]:text-white [&:has(li.active)_li.active]:text-black'>
                    <Busca className={'w-full busca pt-5 px-2'} mainSearh={false} altSearch={true} placeholder=""/>
                      {Array.from(capitulos).map((cap, index) => (
                        <li className={`flex text-gray-400  hover:text-gray-950 dark:hover:text-gray-300 duration-300 text-xs xxs:text-base cursor-pointer hover:bg-[#f7f5ee] px-8 py-3 ${livroAtivo === cap.abbrev ? 'active' : ''}`} key={index} 
                            onClick={()=> {setLivroAtivo(cap.abbrev), fetchBook(cap.abbrev)}}>
                            {cap.name}
                        </li>
                      ))}
                  </ol>
                }

                {width < 1024 && open &&                     
                    <ol className='flex flex-col text-left [&>li]:text-sm max-w-[250px] w-full rounded-xl overflow-y-scroll h-[70dvh] absolute left-5 bottom-10 listaCH font-["Poppins"]
                              dark:bg-[#313131] bg-gray-100 dark:[&:has(li.active)_li.active]:text-white [&:has(li.active)_li.active]:text-black z-10'>
                        <Busca className={'w-full busca pt-5 px-2'} mainSearh={false} altSearch={true} placeholder=""/>
                        {Array.from(capitulos).map((cap, index) => (
                          <li className={`flex text-gray-400  hover:text-gray-950 dark:hover:text-gray-300 duration-300 text-xs xxs:text-base cursor-pointer dark:hover:bg-[#000] hover:bg-[#fff] px-8 py-2 ${livroAtivo === cap.abbrev ? 'active' : ''}`} key={index} 
                              onClick={()=> {setLivroAtivo(cap.abbrev), fetchBook(cap.abbrev), setOpen(false)}}>
                              {cap.name}
                          </li>
                        ))}
                    </ol>
                }

               <div className="flex flex-col w-full dark:bg-[#474743] bg-[#f7f5ee] py-28 overflow-y-scroll h-dvh relative ativoCH">

                  {book.chapters && book.chapters?.map((chapter, index) => (
                    <React.Fragment key={index}>
                      <div className="animate-[fade_.9s_forwards] [animation-timeline:view(1200px_60px)] [animation-range:entry_exit] opacity-0" id={`ch${book.abbrev}${index+1}`} 
                                       onMouseEnter={()=> setText(chapter)} onTouchStart={()=> setText(chapter)}>
  
                          <div className="flex gap-5 sticky z-50 top-0 items-center py-6 bg-white dark:bg-[#585858] w-full h-auto justify-start [&:has(.fill)_path]:fill-red-500 pl-12">
                          
                          <SaveButton className={'[&>svg_path]:stroke-red-500 dark:[&>svg_path]:stroke-red-500 absolute lg:right-[20%] right-8 top-[50px] lg:[scale:2] [scale:1.5]'} 
                                                    book={`${book.name} - ch${book.abbrev}${index+1} - ${book.abbrev}`}/>
                                                 
                          <button onClick={() => {handleTTSClick(index), setPlayerInfo(`${book.name} | cap.: ${index+1}`) }}
                                  dangerouslySetInnerHTML={{ __html: loading[index] ? loadSpin : hasVoice }}
                                  className={`${loading[index] ? 'animate-spin' : ''} text-gray-700 tts hover:text-gray-500 z-10
                                            dark:[&_svg_path]:stroke-gray-400 [&>svg_path]:stroke-gray-600 hover:[&_svg]:brightness-150 duration-200 transition-all`}>
                          </button>
  
                          <strong className=" dark:text-white text-gray-900 duration-500 z-10 font-['Poppins']">
                            {book.name.toUpperCase()} CAPÍTULO {index+1 > 9 ? index+1 : '0'+(index+1)}
                          </strong>
                        </div>
  
                        <span dangerouslySetInnerHTML={{__html:chapter.join('<br>—').replace(/\"/g,'').replace(/\;/g,'. ')}}
                              className="text-gray-600 dark:text-gray-300 py-12 lg:px-20 px-12 block z-0 relative">
                        </span>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="fixed bottom-0 left-0 w-full h-[100px] dark:bg-[#212121ee] bg-[#ffffffdd] border-2 border-l-0 border-b-0 border-r-0 
                            dark:border-gray-700 border-gray-300 flex flex-row-reverse lg:flex-row items-center px-8" style={{justifyContent:width < 1024 && playerInfo.length < 1 ? 'center' : 'space-between'}}>
                        <span className="text-gray-800 block dark:text-gray-300 font-['Poppins'] text-base">
                          {playerInfo}
                        </span>

                        {width < 1024 &&  
                              <button onClick={() => setOpen(prevOpen => !prevOpen)} 
                                      dangerouslySetInnerHTML={{__html:`${chList} Livros`}}
                                      className="[&>svg_path]:fill-gray-500 dark:[&>svg_path]:fill-gray-500 [&>svg]:pointer-events-none flex items-center text-gray-600 dark:text-gray-300 gap-1">
                              </button>
                        }

                      <div className="flex gap-5">
                        <OuvirVerso mrq={false} className={'flex flex-wrap w-full mx-auto [&:has(.marqi)_.marqi]:after:hidden justify-center items-center'} now={false}/>
                      </div>

                      <div className="h-5 w-20 hidden lg:block"></div>
                  </div> 
                  
               </div> 
             </div>
          </section>
         </>
     )
}