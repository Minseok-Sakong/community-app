const express = require('express');
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {Post} = require("./Model/Post.js");
const {pw} = require("./pw.js") //import mongodb password
app.listen(port, () => {
  mongoose.connect(
    'mongodb+srv://msakong40:'+pw+'@cluster0.y4dwt.mongodb.net/Community?retryWrites=true&w=majority'
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

  app.post('/api/test', (req, res) => {
    const CommunityPost = new Post({
      title: "test",
      content: "this is a test",
    });
    CommunityPost.save().then(()=>{
      res.status(200).json( {success:true, text: "Hi"} );
    })
  });