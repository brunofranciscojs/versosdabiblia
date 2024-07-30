import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function PoliticaPrivacidade(){
     return(

          <>
             <Header/>
             <section className="mx-auto max-w-[960px] py-28 [&>p]:text-gray-600 dark:[&>p]:text-gray-400 [&>strong]:text-gray-700 dark:[&>strong]:text-gray-300">

               <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>Política de Privacidade</h1> <br />
               <strong className='text-xl'>Coleta de Dados</strong>
               <p>Não coletamos nenhum dado pessoal dos usuários.</p> <br />

               <strong className='text-xl'>Uso de Cookies e LocalStorage</strong>    
               <p>Utilizamos o LocalStorage do navegador para armazenar versículos bíblicos e a frase diária escolhida pelos usuários. 
                 O LocalStorage é uma funcionalidade que permite o armazenamento de dados no navegador do usuário de forma persistente, mas não envolve a coleta de dados pessoais.</p> <br />

               <strong className='text-xl'>Finalidade do Armazenamento</strong> 
               <p>Os dados armazenados são usados exclusivamente para melhorar a experiência do usuário, permitindo que ele retorne aos versículos e frases diárias salvas anteriormente.</p> <br />

               <strong className='text-xl'>Segurança dos Dados</strong>    
               <p>Embora não coletamos dados pessoais, garantimos que os dados armazenados no LocalStorage são utilizados apenas para os fins mencionados e não são compartilhados com terceiros.</p> <br />

               <strong className='text-xl'>Alterações na Política</strong> 
               <p>Podemos atualizar esta política de privacidade periodicamente. Recomenda-se que os usuários verifiquem esta página para quaisquer mudanças.</p>

             </section>
             <Footer/>
          </>
     )
}