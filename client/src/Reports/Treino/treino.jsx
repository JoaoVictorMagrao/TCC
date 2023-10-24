import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatarData } from '../../Util/util';

function treinoPDF(treino) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const trainingDay = {
    1: 'Treino G',
    2: 'Treino A',
    3: 'Treino B',
    4: 'Treino C',
    5: 'Treino D',
    6: 'Treino E',
    7: 'Treino F',
  };

  const reportTitle = [
    {
      text: 'Treino',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];
 
 const groupedExercises = treino.reduce((grouped, exercicio) => {
  const diaTreino = trainingDay[exercicio.id_dia_treino];

  if (!grouped[diaTreino]) {
    grouped[diaTreino] = [];
  }

  grouped[diaTreino].push(exercicio.exercicio);

  return grouped;
}, {});

// Crie os dados a partir do objeto de agrupamento
const dados = Object.keys(groupedExercises).map((diaTreino) => {
  const exercicios = groupedExercises[diaTreino].join(', '); // Junte os exercícios com uma vírgula

  return [
    { text: diaTreino, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: exercicios, fontSize: 9, margin: [0, 2, 0, 2] }
  ];
});

const detail = [
  {
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          { text: 'Treino', style: 'tableHeader', fontSize: 10 },
          { text: 'Exercício', style: 'tableHeader', fontSize: 10 }
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

  pdfMake.createPdf(docDefinitions).download('Treino');
}

export default treinoPDF