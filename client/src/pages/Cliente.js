import Header from '../components/Header';
import InputMask from 'react-input-mask';
import { NumericFormat   } from 'react-number-format';

function Cliente(){

  return(
    <div>
      <Header />
      <div className='main'>


      <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2 w-4/5 mx-auto mt-20">
              <div>
                  <label htmlFor="nomeAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome</label>
                  <input type="text" id="nomeAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
              <div>
                  <label htmlFor="telefoneAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Telefone</label>
                  <InputMask  mask="(99) 99999-9999" type="tel" id="telefoneAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
              </div>

              <div className="mb-6">
                <label htmlFor="emailAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                <input type="email" id="emailAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
              </div>  
          
              <div>
                  <label htmlFor="websmensalidadeAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Valor</label>
                  <NumericFormat    thousandSeparator={true}
          prefix={'R$'}
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          allowLeadingZeros={false}
          isNumericString={true}
          getInputRef={inputRef => inputRef && inputRef.setAttribute('inputmode', 'numeric')} type="text" id="mensalidadeAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
            
              <div>
                  <label htmlFor="situacaoAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Situação</label>
                  <select id="situacaoAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
              </div>

              <div className="mb-6">
                <label htmlFor="senhaAluno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                <input type="password" id="senhaAluno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div> 
          </div> 

          <div className='text-center'>
            <button type="submit" className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar Aluno</button>
          </div>
    </form>


      </div>
    </div>
  )

} 

export default Cliente;