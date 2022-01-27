var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req);
    console.log('passeiresumo');
    var resp = {
        status: 200,
        codigoRecebimento: 100,
        mensagemErro: " "
    }
    res.send(resp);
});

module.exports = router;