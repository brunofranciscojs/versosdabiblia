import React, { useEffect, useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';


export default function Busca({ className, mainSearh, altSearch, placeholder }) {
    const [books, setBooks] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [value, setValue] = useState('');

    const hasVoice = `<svg width="16px" height="16px" viewBox="0 0 24 24"><path d="M12 4L12 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9L8 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 10L20 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10L4 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 7L16 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books/livros.json');
            const result = await response.json();
            setBooks(result);
        };
        fetchBooks();
    }, []);

    const desacentuar = (busca) => busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const buscar = (book) => {
        const termo = book.toLowerCase();
        const [bookTerm, chapterTerm] = termo.split(' ');
        const chapterNumber = chapterTerm ? parseInt(chapterTerm, 10) : null;

        const search = books.filter(item => {
            const livro = desacentuar(item.name).toLowerCase();
            const isBookMatch = livro.includes(bookTerm);

            if (isBookMatch && chapterNumber && item.chapters) {
                item.matchedChapters = Object.keys(item.chapters).filter(chapter => parseInt(chapter, 10) === chapterNumber);
                return item.matchedChapters.length > 0;
            } else if (isBookMatch) {
                item.matchedChapters = [];
                return true;
            }

            return false;
        });

        setResultado(search);
    };

    return (
        <div className={`[&:has(input:not(:focus))_.div]:h-0 [&:has(.div:hover)_.div]:h-auto w-1/2 relative ${className}`}>
            <input type="text" placeholder={placeholder === '' ? `digite o livro...` : placeholder}
                className='bg-gray-200 dark:bg-[#616161] px-12 rounded-3xl text-gray-700 dark:text-gray-400 w-full outline-none focus:outline-none dark:hover:placeholder:text-gray-100 hover:placeholder:text-gray-700 placeholder:duration-300 z-10 relative duration-75 font-["Poppins"] py-3'
                onInput={(e) => {
                    setValue(e.target.value);
                    buscar(e.target.value);
                    if (e.target.value.length < 1) setResultado([]);
                }} />

            <div className="bg-gray-200/80 dark:bg-[#434343] w-full mx-auto div overflow-hidden absolute top-[1.8rem] left-0 h-auto max-h-[400px] overflow-y-scroll text-left flex flex-col gap-1 backdrop-blur results rounded-b-2xl z-0 shadow-2xl duration-100 transition-all">
                {resultado.map((item, index) => (
                    <div key={index} className="flex flex-col items-start hover:bg-gray-100 dark:hover:bg-gray-800 px-6 gap-5 empty:py-0 py-2 font-['Poppins'] [&:first-of-type]:mt-5">
                         {mainSearh && 
                                <div className="flex gap-2 items-center">
                                    <Link smooth to={`/livros/${item.name.split(' ').join('')}/${btoa(item.abbrev)}/#${value.includes(' ') && item.matchedChapters.length > 0 ? `${item.matchedChapters.join(', ')}` : ''}`}>
                                        <span className="block text-gray-700 dark:text-gray-400 mt-5 z-0 relative">    
                                            {desacentuar(item.name)}: {value.includes(' ') && item.matchedChapters.length > 0 ? `${item.matchedChapters.join(', ')}` : ''}        
                                        </span>
                                    </Link>
                                    <Link to={`/ouvir/${item.name.split(' ').join('')}/${btoa(item.abbrev)}/#ch${value.includes(' ') && item.matchedChapters.length > 0 ? `${item.matchedChapters.join(', ')}` : ''}`}>
                                        <span className="block text-gray-700 dark:text-gray-400 mt-5 z-10 relative hover:[&>_svg]:opacity-40 [&>_svg]:duration-100 dark:[&>_svg_path]:stroke-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: hasVoice
                                            }}>                       
                                        </span>
                                    </Link>
                                </div>
                            }
                        {altSearch && (
                            <Link to={`/ouvir/${item.name.split(' ').join('')}/${btoa(item.abbrev)}`}>
                                <span className="block text-gray-700 dark:text-gray-400 z-10 relative hover:[&>_svg]:opacity-40 [&>_svg]:duration-100 dark:[&>_svg_path]:stroke-gray-400 text-sm">
                                    {item.name}
                                </span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
