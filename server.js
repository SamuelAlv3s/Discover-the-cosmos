const express = require('express');
const routes = express.Router();
const nunjucks = require('nunjucks');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fetch = require('node-fetch');
const server = express();


server.use(express.static('public'));
server.use(routes);
server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

const apiKey = 'x';
const url = 'x';


routes.get('/', function(req, res){
  fetch('https://api.nasa.gov/planetary/apod?api_key=x')
  .then( (res) => {return res.json()})
  .then( (apod) =>{

      const languageTranslator = new LanguageTranslatorV3({
          version: '2018-05-01',
          authenticator: new IamAuthenticator({
            apikey: `${apiKey}`,
          }),
          url: `${url}`,
          disableSslVerification: true
        });
        
        const translateParams = {
          text: `${apod.explanation}`,
          modelId: 'en-pt',
        };
        
        languageTranslator.translate(translateParams)
          .then(translationResult => { return translationResult.result.translations[0].translation})
          .then(translate =>{
            return res.render('index.njk', {apod, translate});
          })
          .catch(err => {
            console.log('error:', err);
          });
     
  });

  });
    
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
  });

