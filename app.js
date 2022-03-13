const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

app.use((req, res, next) => {
    if(!req.headers.authorization){next()}
    const decodedToken = JWT.decode(req.headers.authorization.split(' ')[1]);
    req.jku = decodedToken.jku
    if(decodedToken.username === "Mesh3l_911"){
        next()
    }else{
        res.send("You r not Mesh3l_911");
    }
  })

app.use((req, res, next) => jwt({
    secret: jwksClient.expressJwtSecret({
        jwksUri: req.jku
    }),
    algorithms: ['RS256'],
}).unless({path: ['/']})(req, res, next))

app.get('/', (req, res) => {
    res.send('Welcome 2 my little chall, start from ( /source.zip ) & Enjoy ur time ^_^');
})

app.post('/flag', (req, res) => {
    res.send("Great j0b ^_^, The Flag is: .............................");
})

app.listen(5000, () => console.log('Listening on port 5000'));

