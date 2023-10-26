import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatCurrency} from '../../Util/util';
function infoGeralPDF(informacoes) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Informações Gerais',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];

  const detail = [
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [
            { text: 'Valor total (Mensal)', style: 'tableHeader', fontSize: 10 },
            { text: 'Quantidade de alunos', style: 'tableHeader', fontSize: 10 },
            { text: 'Quantidade de fichas', style: 'tableHeader', fontSize: 10 }
          ],
          [
            { text: formatCurrency(informacoes[0].soma), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: informacoes[0].qtd_aluno, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: informacoes[0].qtd_ficha, fontSize: 9, margin: [0, 2, 0, 2] }
          ]
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

  pdfMake.createPdf(docDefinitions).download('Informações Gerais');
}

export default infoGeralPDF