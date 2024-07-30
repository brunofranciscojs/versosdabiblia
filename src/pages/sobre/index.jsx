import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Salvos from "../../components/Salvos"

export default function Sobre(){
  return(
    <>
    <Salvos />
    <Header className="fixed top-0 shadow-none"/>

    <div className="max-w-[1260px] pt-40 pb-12 mx-auto h-full font-['poppins'] cl:px-20 px-12">

        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-600 text-left">Sobre o Projeto</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-400">Versos Bíblicos é um projeto que visa facilitar o estudo e a escuta da Bíblia em qualquer lugar. 
              <br /><br />
              
              Nosso aplicativo será um Progressive Web App (PWA), permitindo acesso rápido e offline aos versículos e funcionalidades, 
              tornando-se uma ferramenta essencial para sua jornada espiritual.</p>
            
        </div>
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-600 text-left">Versão NVI</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-400">Utilizamos a Nova Versão Internacional (NVI) da Bíblia, conhecida por sua  <br />
              linguagem acessível e contemporânea, facilitando o entendimento e estudo das escrituras.
            </p> <br />

            <p className="text-gray-700 dark:text-gray-400">
            Estamos constantemente trabalhando para expandir nosso acervo e, futuramente, teremos outras versões da Bíblia disponíveis em nosso site. 
            Nosso objetivo é proporcionar uma experiência rica e diversificada, atendendo às diferentes preferências e necessidades dos nossos usuários. 
            Fique atento às atualizações e novidades!
            </p>
        </div>
        <br />

        <div className="flex gap-10 cl:flex-row flex-col">
          <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-600 text-left">Áudio Gerado por IA</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-400">Nosso projeto utiliza inteligência artificial para gerar áudios de alta qualidade dos versículos da Bíblia. 
                Isso permite que você ouça as passagens enquanto realiza outras atividades, facilitando o estudo da Bíblia em qualquer momento do seu dia.</p>
              <Link to="/ouvir" className="py-3 px-5 bg-gray-600 rounded-lg text-white border border-gray-600 hover:bg-transparent hover:text-gray-600 duration-100 font-['Poppins'] lg:w-48 w-full block text-center">Ouvir Capítulos</Link>
          </div>
  
          <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-600 text-left">Função de Salvar Versículos</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-400">Oferecemos uma funcionalidade que permite salvar seus versículos favoritos diretamente no seu navegador usando LocalStorage. 
                Dessa forma, você pode acessar rapidamente os versículos que mais te tocam ou que você deseja memorizar.</p>
          </div>
        </div>


        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-600 text-left">Contato</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-400">Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para nos contatar.</p>
            <Link to="/contato" className="py-3 px-5 bg-gray-600 rounded-lg text-white border border-gray-600 hover:bg-transparent hover:text-gray-600 duration-100 font-['Poppins'] lg:w-56 w-full block text-center">Formulário de Contato</Link>
        </div>
    <Link to="/politica-de-privacidade" className="text-blue-500 hover:underline block text-center">Política de Privacidade</Link>
    </div>
    <Footer/>
    </>
  )
}