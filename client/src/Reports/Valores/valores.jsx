import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function valoresPDF(valores) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Valores',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];
 
  const dados = valores.map((valor) => {
    return [
      {text: valor.id, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: valor.nome_aluno, fontSize: 9, margin: [0, 2, 0, 2]},
    ]
  });

  const detail = [
    {
      table:{
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*',],
        body: [
          [
            {text: 'Nome', style: 'tableHeader', fontSize: 10},
            {text: 'Valor mensal', style: 'tableHeader', fontSize: 10},
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

  pdfMake.createPdf(docDefinitions).download('Valores');
}

export default valoresPDF