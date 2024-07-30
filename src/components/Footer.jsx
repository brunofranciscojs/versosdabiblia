import Menu from "./Menu"
import { Link } from "react-router-dom";

export default function Footer(){
     return(
             <>
               <section className="bg-gray-100 mx-auto py-12 px-8 dark:bg-[#292929]">
                    <Menu start={0} end={65} 
                          className='flex-wrap text-left gap-0 [&>li]:text-sm max-w-[1350px] mx-auto justify-center font-["Poppins"]
                              xl:[&>li]:[flex:_0_0_11%] lg:[&>li]:[flex:_0_0_13%] cl:[&>li]:[flex:_0_0_16%] md:[&>li]:[flex:_0_0_20%] sm:[&>li]:[flex:_0_0_25%] xxs:[&>li]:[flex:_0_0_33%] [&>li]:[flex:_0_0_50%]'/>
               </section>
               
               <footer className="text-center text-gray-400 py-8 border border-gray-300 dark:border-[#3f3f3f] border-l-0 border-r-0 border-b-0 flex gap-4 flex-col lg:flex-row justify-center">
                    &copy; Versos Biblicos {new Date().getFullYear()} | <Link to={'/politica-de-privacidade'}>Políticas de Privacidade</Link>
               </footer>
             </>
     )
}