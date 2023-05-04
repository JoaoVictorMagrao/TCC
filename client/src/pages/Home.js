

import "../styles/login.css";
import Header from '../components/Header'
import React from "react";
function Home() {
 
  return( 
    <div>
      <Header />
     
      <div class="flex flex-col overflow-x-auto w-4/5 mx-auto">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">Código</th>
                    <th scope="col" class="px-6 py-4">Nome</th>
                    <th scope="col" class="px-6 py-4">Vr. Mensal</th>
                    <th scope="col" class="px-6 py-4">Data Vencimento</th>
                    <th scope="col" class="px-6 py-4">Telefone</th>
                    <th scope="col" class="px-6 py-4">Situação</th>
                    <th scope="col" class="px-6 py-4"></th>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-6 py-4 font-medium ">2</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  
                  </tr>
                  <tr class="border-b ">
                    <td class="whitespace-nowrap px-6 py-4 font-medium ">3</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    <td class="whitespace-nowrap px-6 py-4">Cell</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
     
    </div>
  )
}

export default Home;