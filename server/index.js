const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/routes');
// const nodemailer = require("nodemailer");
// const SMTP_CONFIG = require('./src/config/smtp');
// //npm run devStart
// const transporter = nodemailer.createTransport({
//   host: SMTP_CONFIG.host,
//   port: SMTP_CONFIG.port,
//   secure: false,
//   auth: {
//     user: SMTP_CONFIG.user,
//     pass: SMTP_CONFIG.pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// async function run() {
//   const mailSent = await transporter.sendMail({
//     text: "Texto do E-mail",
//     subject: "Assunto do e-mail",
//     from: "João <forfitgymacademy@gmail.com>",
//     to: ["forfitgymacademy@gmail.com", "forfitgymacademy@gmail.com"],
//     html: `
//     <html>
//       <body>
//         <strong>Conteúdo HTML</strong></br>Do E-mail
//       </body>
//     </html> 
//     `,
//   });
//   console.log(mailSent);
// }
// run();
app.use(express.json())
app.use(cors())
app.use(router);


app.listen(3001, () => {
  //console.log('Rodando na porta 3001')
})
