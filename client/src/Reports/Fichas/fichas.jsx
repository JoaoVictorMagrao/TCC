import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatarData } from '../../Util/util';
function fichasPDF(fichas) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Fichas',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];
 
  const dados = fichas.map((ficha) => {
    return [
      {text: ficha.id, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: ficha.nome_aluno, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: ficha.nome_ficha, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: formatarData(ficha.data_criacao), fontSize: 9, margin: [0, 2, 0, 2]},
      {text: formatarData(ficha.data_final),  fontSize: 9, margin: [0, 2, 0, 2]}
    ]
  });

  const detail = [
    {
      table:{
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*',],
        body: [
          [
            {text: 'Código', style: 'tableHeader', fontSize: 10},
            {text: 'Nome do aluno', style: 'tableHeader', fontSize: 10},
            {text: 'Nome da ficha', style: 'tableHeader', fontSize: 10},
            {text: 'Data de criação', style: 'tableHeader', fontSize: 10},
            {text: 'data de expiração', style: 'tableHeader', fontSize: 10}
          ],
          ...dados
        ]
      },
      layout: 'lightHorizontalLines'
    }
  ];
   function Rodape(currentPage, pageCount){
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
   }

  const docDefinitions = {
      pageSize: 'A4',
      pageMargins: [15, 50, 15, 40],

      header: [reportTitle],
      content: [detail],
      footer: Rodape
  }

  pdfMake.createPdf(docDefinitions).download('Fichas');
}

export default fichasPDF