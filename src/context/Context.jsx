import React, { createContext, useState, useEffect, useContext } from 'react';

const SalvosContext = createContext();

export const SalvosProvider = ({ children }) => {
    const [salvos, setSalvos] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('salvos')) || {};
        setSalvos(saved);
    }, []);

    return (
        <SalvosContext.Provider value={{ salvos, setSalvos }}>
            {children}
        </SalvosContext.Provider>
    );
};

export const useSalvos = () => useContext(SalvosContext);
