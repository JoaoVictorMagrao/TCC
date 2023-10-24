import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatarData } from '../../Util/util';
function alunosPDF(alunos) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Alunos',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];
 
  const dados = alunos.map((alunos) => {
    return [
      {text: alunos.nome, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: alunos.email, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: alunos.whatsapp_formatado, fontSize: 9, margin: [0, 2, 0, 2]},
      {text: formatarData(alunos.data_vencimento), fontSize: 9, margin: [0, 2, 0, 2]},
      {text: alunos.ativo === 1 ? 'Ativo' : 'Inativo',  fontSize: 9, margin: [0, 2, 0, 2]}
    ]
  });

  const detail = [
    {
      table:{
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*',],
        body: [
          [
            {text: 'Nome do aluno', style: 'tableHeader', fontSize: 10},
            {text: 'Email', style: 'tableHeader', fontSize: 10},
            {text: 'WhatsApp', style: 'tableHeader', fontSize: 10},
            {text: 'data vencimento', style: 'tableHeader', fontSize: 10},
            {text: 'Situação', style: 'tableHeader', fontSize: 10}
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

  pdfMake.createPdf(docDefinitions).download('Aluno');
}

export default alunosPDF