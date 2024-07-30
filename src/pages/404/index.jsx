import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          navigate(-1);
          clearInterval(intervalId);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [navigate]);
  
  return (
    <div className="grid place-items-center h-screen w-screen bg-gray-200 dark:bg-gray-700">
      <div className='h-96 mx-auto text-center'>
      <h1 className="font-['poppins'] text-gray-600 dark:text-gray-300 text-4xl font-bold">
        404 - Página não encontrada...
      </h1>
      <p className="font-['poppins'] text-gray-600 dark:text-gray-300 text-2xl font-semibold">
        Desculpe, esta página não existe, redirecionando em {count} segundos....
      </p>
      </div>
    </div>
  );
}
