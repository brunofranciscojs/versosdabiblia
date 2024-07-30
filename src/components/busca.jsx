import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Busca({className, mainSearh, altSearch, placeholder}) {
    const [books, setBooks] = useState([]);
    const [resultado, setResultado] = useState([]);
    const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24" ><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books/books.json');
            const result = await response.json();
            setBooks(result);
        };
        fetchBooks();
    }, []);

    const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const buscar = (book) => {
        const termo = book.toLowerCase();
        const search = books.filter(item => {
            const livro = desacentuar(item.name).toLowerCase();
            return livro.includes(termo);
        });
        setResultado(search);
    };

    return (
        <div className={`[&:has(input:not(:focus))_.div]:h-0 [&:has(.div:hover)_.div]:h-auto  w-1/2 relative ${className}`}>
            <input 
                className='bg-gray-200 dark:bg-[#616161] px-12 rounded-3xl text-gray-700 dark:text-gray-400 w-full outline-none focus:outline-none 
                           dark:hover:placeholder:text-gray-100 hover:placeholder:text-gray-700 placeholder:duration-300 z-10 relative duration-75 font-["Poppins"]
                            py-3' 
                placeholder={placeholder === '' ? `digite o livro...` : placeholder} 
                type="text" 
                onInput={(e) => {
                    buscar(e.target.value);
                    if (e.target.value.length < 1) setResultado([]);
                }} />

                
                <div className="bg-gray-200/80 dark:bg-[#434343] w-full div overflow-hidden absolute top-[1.8rem] left-0 h-auto max-h-[400px] overflow-y-scroll text-left flex flex-col gap-1 backdrop-blur results rounded-b-2xl z-0 shadow-2xl duration-100 transition-all">
                    {resultado.map((item, index) => (
                        <div key={index} className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-12 gap-5 empty:py-0 py-2 font-['Poppins']">
                            {mainSearh && 
                                <>
                                    <Link to={`/livros/${item.name.split(' ').join('')}/${btoa(item.abbrev)}`}>
                                        <span className="block text-gray-700 dark:text-gray-400 mt-5 z-0 relative"
                                            dangerouslySetInnerHTML={{
                                                __html: desacentuar(item.name)
                                            }}>                       
                                        </span>
                                    </Link>
                                    <Link to={`/ouvir/${item.name.split(' ').join('')}/${btoa(item.abbrev)}`}>
                                        <span className="block text-gray-700 dark:text-gray-400 mt-5 z-10 relative hover:[&>_svg]:opacity-40 [&>_svg]:duration-100 dark:[&>_svg_path]:stroke-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: hasVoice
                                            }}>                       
                                        </span>
                                    </Link>
                                </>
                            }
                            {altSearch &&
                                <Link to={`/ouvir/${item.name.split(' ').join('')}/${btoa(item.abbrev)}`}>
                                    <span className="block text-gray-700 dark:text-gray-400 z-10 relative hover:[&>_svg]:opacity-40 [&>_svg]:duration-100 dark:[&>_svg_path]:stroke-gray-400"
                                        dangerouslySetInnerHTML={{
                                            __html: desacentuar(item.name)
                                        }}>                       
                                    </span>
                                </Link>
                            }
                        </div>
                    ))}
                </div>
        </div>
    );
}
