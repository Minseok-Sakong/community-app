const express = require('express');
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 5000;
//mongodb+srv://msakong40:Ec88Vrj759gJDH@cluster0.y4dwt.mongodb.net/?retryWrites=true&w=majority
app.use(express.static(path.join(__dirname, '../client/build')))
app.listen(port, () => {
  mongoose.connect(
    'mongodb+srv://msakong40:Ec88Vrj759gJDH@cluster0.y4dwt.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => {
      console.log(`Example app listening on port ${port}`)
      console.log(`Connecting mongodb`)
    }).catch((err)=> {
      console.log(`${err}`)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })