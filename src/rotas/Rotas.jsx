import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./../App";
import Livros from "../pages/livros";
import PoliticaPrivacidade from "../pages/politica-de-privacidade";
import Ouvir from "../pages/ouvir";
import Sobre from "../pages/sobre";
import NotFound from "../pages/404"

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/leituras" element={<App/>}/>
                <Route path="/ouvir" element={<Ouvir/>}/>
                <Route path="/ouvir/:name/:abbrev" element={<Ouvir/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/contato" element={<App/>}/>
                <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade/>}/>
                <Route path="/livros/:name/:abbrev" element={<Livros/>} />
                <Route path="/livros/" element={<Livros/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}