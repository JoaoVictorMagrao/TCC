export const openWhatsapp = async (number, name) => {
  try {
    let formattedNumber = number.replace(/[^\w\s]/gi, "").replace(/ /g, "");
    let url = `https://web.whatsapp.com/send?phone=${formattedNumber}`;
    url += `&text=${encodeURI(`Olá ${name}, estou passando para avisar que sua ficha já está pronta, entre no app para visualizar seu treino.`)}&app_absent=0`;

    // Open our newly created URL in a new tab to send the message
    window.open(url);

  } catch (error) {

  }
};