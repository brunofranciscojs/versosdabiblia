import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Busca from './busca';

export default function Header({ className }) {
  const [mobile, setMobile] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const back = `<svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="none"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" /></svg>`

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      
      if (window.innerWidth < 960) {
        const li = Array.from(document.querySelectorAll('ul li')).map(li => li.outerHTML).join('')
        setMobile(li);
      } else {
        setMobile(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const homeUrl = window.location.href.slice(0,-1) != window.location.origin
  
  return (
    <header className={className}>
      <div>
        <div className='flex items-center w-full'>
          {homeUrl && <button onClick={()=> navigate('/')} dangerouslySetInnerHTML={{__html:back}} className='[&>svg_path]:fill-gray-600 dark:[&>svg_path]:fill-gray-300 w-12'></button>}
          <Busca className={'w-[80%] busca'} mainSearh={true} altSearch={false} placeholder={'digite o verso...'}/>
        </div>

        <ul className='font-["Poppins"]'>
          <li key={'Ouvir'}><Link to={'/ouvir'}>Ouvir</Link></li>
          <li key={'Leituras'} disabled>Leituras</li>
          <li key={'Sobre'}><Link to={'/sobre'}>Sobre</Link></li> 
          <li key={'Contato'}><Link to={'/'}>Contato</Link></li>
        </ul>

        { width < 960 && <button className='rotate-90 -translate-x-7 text-gray-600 dark:text-gray-300 font-semibold font-["poppins"]' onClick={() => setOpen(prevOpen => !prevOpen)}>|||</button> }
        
        {open && mobile && (
          <>
            <ol dangerouslySetInnerHTML={{__html:mobile}} className='mobile z-[9] relative'></ol>
            <button className='bg-black text-white font-2xl h-8 w-8 rounded-full z-50 absolute bottom-[30%]'  onClick={()=>setOpen(false)}>X</button>
          </>
        )}
      </div>
    </header>
  );
}
