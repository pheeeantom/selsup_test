const express = require('express');
const app = express();
const port = 3012;

app.use(express.static('dist'));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
