import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";

const VersodoDia = () =>{
    const data = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(new Date());
    const [verseOfDay, setVerseOfDay] = useState({ verso: '', referencia: '', abrv:'' });

    const abbrevs = [
      'gn', 'ex', 'lv', 'nm', 'dt', 'js', 'jz', 'rt', '1sm', '2sm', '1rs', '2rs', '1cr', '2cr', 'ed', 'ne', 'et', 'joh', 'sl', 'pv', 'ec', 'ct',
      'is', 'jr', 'lm', 'ez', 'dn', 'os', 'jl', 'am', 'ob', 'jn', 'mq', 'nm', 'hc', 'sf', 'ag', 'zc', 'ml', 'mt', 'mc', 'lc', 'joh', 'atos', 'rm',
      '1co', '2co', 'gl', 'ef', 'fp', 'cl', '1ts', '2ts', '1tm', '2tm', 'tt', 'fm', 'hb', 'tg', '1pe', '2pe', '1jo', '2jo', '3jo', 'jd', 'ap'
    ];

    useEffect(() => {
      const versodeHoje = localStorage.getItem('versodia')
      let expirado = true

      if(versodeHoje){
            const dateVerso = JSON.parse(versodeHoje);
            const hoje = new Date().getTime();
            const vinte4horas = 24 * 60 * 60 * 1000;
            if (hoje - dateVerso[1] < vinte4horas) {
                expirado = false;
                setVerseOfDay(dateVerso[0]);
            }
      }
      
      if(expirado){
          const fetchCh = async () => {
            const randomAbbrev = abbrevs[Math.floor(Math.random() * abbrevs.length)];
            const request = await fetch(`/books/${randomAbbrev}.json`);
            const result = await request.json();
            const randomVerse = getRandomVerse(result.chapters, result.name, result.abbrev );
            setVerseOfDay(randomVerse);
            localStorage.setItem('versodia',JSON.stringify({0:randomVerse, 1:new Date().getTime()}))
        }
        fetchCh();
      }      
      
    }, []);

    const getRandomVerse = (chapters, name, abbrev) => {
        const capitulo = Math.floor(Math.random() * chapters.length);
        const verso = chapters[capitulo];
        const i = Math.floor(Math.random() * verso.length);
        return { 
            verso: verso[i], 
            referencia: `${name} | ${capitulo + 1}:${i + 1}`,
            abrv: `${abbrev}`
        };
    };

    const book = verseOfDay.referencia.split('|').join('-').trim()+' - '+verseOfDay.abrv

    
    return (
        <section className="relative w-full max-w-[1550px] mx-auto md:my-16 my-0">

            <time className="bg-red-500 h-[70px] inline-block absolute -top-5 right-5 rounded-md z-10 text-center" 
                dangerouslySetInnerHTML={{
                    __html: `<p>${data.split(' de ')[1].trim()}</p><br>
                            <strong>${data.split(' de ')[0].trim()}</strong>`
                }}>
            </time>

           <SaveButton book={book} className={'left-3 top-3 absolute'}/>

            <article className="h-auto bg-[#fafafa] dark:bg-gray-900/30 rounded-xl cl:px-16 px-5 py-20 relative flex flex-col w-full mx-auto">               
                {verseOfDay.verso && (
                    <>
                      <h1 className="font-[500] leading-[1.3] text-[clamp(1rem,_-0.2rem_+_6.4vw,_3rem)] text-center text-gray-600 dark:text-gray-400 cl:px-10 px-4 py-8"
                          dangerouslySetInnerHTML={{__html:verseOfDay.verso.split('. ').join('<br>—').replace(/\"/g,'').replace(/\;/g,'. ')}}>
                      </h1>
                      
                      <h2 className="text-right text-gray-500 dark:text-gray-300 text-sm cl:self-end self-center cl:order-1 -order-1 font-semibold">
                        <Link to={`/livros/${verseOfDay.referencia.split('|')[0].trim().split(' ').join('')}/${btoa(verseOfDay.abrv)}`}>{verseOfDay.referencia} </Link>
                      </h2>
                    </>
                )}
                <Link to={`/livros/${verseOfDay.referencia.split('|')[0].trim().split(' ').join('')}/${btoa(verseOfDay.abrv)}`}
                      className="py-3 px-5 bg-gray-600 rounded-lg text-white border border-gray-600 hover:bg-transparent hover:text-gray-600 duration-100 font-['Poppins'] lg:w-48 w-full mx-auto block text-center">
                    Ler Capítulo
                </Link>
            </article>
            

        </section>
    );
}

export default memo(VersodoDia)

