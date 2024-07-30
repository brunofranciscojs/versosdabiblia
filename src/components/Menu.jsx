import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

const Menu = ({className}) => {

   const [capitulos, setCapitulos] = useState([])
  
    useEffect(() => {
      const fetchCapitulos = async () => {
        const request = await fetch('/books/books.json');
        const result = await request.json();
        setCapitulos(result);
      };
  
      fetchCapitulos();
    }, []);
   
   const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return(
       <ol className={`flex ${className}`}>
          {Array.from(capitulos).slice(start, end+1).map((cap, index) =>(
             <li className="flex text-gray-400 hover:text-gray-950 dark:hover:text-gray-300 duration-300 text-xs xxs:text-base" key={index}>
                  <Link to={`/livros/${desacentuar(cap.name).split(' ').join('').toLowerCase()}/${btoa(cap.abbrev)}`} >
                     {cap.name}
                  </Link>
               </li>
          ))}
       </ol>
    )
}

export default memo(Menu)


  
