const express = require('express');
 
const app = express();
 
app.get('/', (req, res) => {
  console.log(JSON.stringify(req.headers));
  if (req.headers['x-api-key'])
    return res.status(200).send('Received a GET HTTP method');
  else
    return res.status(200).send({ error: "missing X-api-Key" });
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);