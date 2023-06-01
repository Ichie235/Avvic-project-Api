
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')

require('dotenv').config()
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3000

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json());

// app.post("/post_name",async(req,res)=>{
//   let {name} = req.body
//   console.log(name)
  
// })
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: process.env.TO,
      subject: 'New email from the website',
      text: `Email: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${[PORT]}`);
});