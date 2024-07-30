import React,{ useEffect, useState } from 'react';
import { useSalvos } from "../context/Context";
import { HashLink } from 'react-router-hash-link';

export default function Salvos() {
    const savedIcon = `<svg width="25px" height="25px" viewBox="0 0 64 64"><path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z" stroke-width="4"/></svg>`;
    const clear = `<svg width="20px" height="20px" viewBox="0 0 76 76" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00"> <path fill="none" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 28.4718,42.9497L 33.4216,38L 28.4718,33.0502L 31.0502,30.4718L 36,35.4216L 40.9498,30.4718L 43.5282,33.0502L 38.5784,38L 43.5282,42.9497L 40.9498,45.5282L 36,40.5784L 31.0503,45.5282L 28.4718,42.9497 Z M 57.9853,41.5355L 49.0354,50.4854C 47.9317,51.589 47,52 45,52L 24,52C 21.2386,52 19,49.7614 19,47L 19,29C 19,26.2386 21.2386,24 24,24L 45,24C 47,24 47.9317,24.4113 49.0354,25.5149L 57.9853,34.4645C 59.9379,36.4171 59.9379,39.5829 57.9853,41.5355 Z M 45,49C 46,49 46.3952,48.8828 46.914,48.3641L 55.8639,39.4142C 56.645,38.6332 56.645,37.3669 55.8639,36.5858L 46.914,27.6362C 46.3952,27.1175 46,27 45,27.0001L 24,27.0001C 22.8954,27.0001 22,27.8955 22,29.0001L 22,47.0001C 22,48.1046 22.8954,49.0001 24,49.0001L 45,49 Z "/> </svg>`
    const arrow = `<svg width="50" height="60" viewBox="0 0 320 448"><g transform="translate(0,-604.36224)"> <path d="m 16,908.36226 144,-144 144,144 z" /> </g> </svg>`
    const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const [viewSaved, setViewSaved] = useState(false)
    const { salvos, setSalvos} = useSalvos()

    const salvados = Object.entries(salvos).filter(([_,value]) => value === true);
    const salvar = (name) => {
          setSalvos(prevSalvas => {
               const updtSalvas = { ...prevSalvas, [name]: !prevSalvas[name] };
               localStorage.setItem('salvos', JSON.stringify(updtSalvas));
               return updtSalvas;
          });
     };

    const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const bName = (name) => desacentuar(name).split(' ').join('').split('-')[0].toLowerCase()
    const aName = (abr) => btoa(abr.split('-')[2].trim())

    useEffect(() => {
        const desver = (e) => {
          if ( !document.querySelector('ol')?.contains(e.target) && e.target.tagName !== 'BUTTON') {
            setViewSaved(false);
          }
        };
        
        window.addEventListener('click', desver);
        return () =>   window.removeEventListener('click', desver); 
    }, []);

    
    return (
          <>
            <button dangerouslySetInnerHTML={{ __html: viewSaved ? arrow : savedIcon }} title="ver salvos" 
                    style={{top:viewSaved ? '1.6rem' : '2.6rem'}}
                    className='fixed md:left-8 left-4 z-50 [&>svg]:pointer-events-none [&>svg_path]:fill-gray-400/80 dark:[&>svg_path]:fill-[#616161] dark:[&>svg_path]:stroke-[#616161] hover:dark:[&>svg_path]:fill-[#222222]'
                    onClick={() => setViewSaved(true)}>
            </button>

            {viewSaved &&
                <ol className='py-6 fixed md:left-[25px] left-4 md:w-[380px] w-[85%] bg-[#e5e5e5] dark:bg-[#282828] h-[500px] z-50 overflow-hidden flex flex-col backdrop-blur-sm top-[65px] rounded-2xl shadow-xl
                                        after:content-[""] 
                                        after:z-40 
                                        after:pointer-events-none
                                        after:absolute 
                                        after:top-0 
                                        after:left-0 
                                        after:w-full 
                                        after:h-full 
                                        after:dark:bg-[linear-gradient(to_top,#282828_0%,transparent_10%,transparent_80%,#282828_100%)] 
                                        after:bg-[linear-gradient(to_top,#e5e5e5_0%,transparent_10%,transparent_80%,#e5e5e5_100%)]'>

                    <div className="overflow-y-scroll h-full salvos">
                        {salvados.length === 0 && 
    
                            <span className='text-gray-700 dark:text-gray-600 px-8 py-8 relative -translate-y-1/2 top-1/2 flex justify-center'>
                                Nada encontrado.
                            </span>
                        }
    
                        {salvados.map((key,_) => (
                            <div key={key} className="flex px-6 hover:bg-gray-100 dark:hover:bg-gray-700 py-3 duration-200 translate-y-5">
                                <button dangerouslySetInnerHTML={{ __html: clear }} className='hover:brightness-90 fill-gray-500 duration-75 z-50 [&>svg_path]:fill-red-400'
                                    onClick={() => salvar(key[0])}>
                                </button>
    
                                <li className='text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 duration-100 flex gap-2 items-center [&:has(svg)_svg]:inline'>

                                <HashLink smooth className="dark:[&>svg]:invert"
                                        to={
                                            key.find((ch) => typeof ch === 'string' && ch.includes('ch'))
                                            ? `/ouvir/${bName(key[0])}/${aName(key[0])}/#${key[0].split('-')[1].trim()}`
                                            : `/livros/${bName(key[0])}/${aName(key[0])}`
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: key.find((ch) => typeof ch === 'string' && ch.includes('ch'))
                                            ? `${hasVoice} ${key[0]}`
                                            : key[0],
                                        }}
                                        />
                                </li>
                            </div>
                        ))}
                    </div>
                </ol>
            }
        </>
    );
}
