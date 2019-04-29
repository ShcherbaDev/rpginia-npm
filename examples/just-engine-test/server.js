const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/dist'));
app.use('/resources', express.static(__dirname + '/resources'));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.status(200).render('./index.html');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});