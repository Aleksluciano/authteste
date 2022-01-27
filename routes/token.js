var express = require('express');
var router = express.Router();
var axios = require("axios").default;
/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req);
    var options = {
        method: 'POST',
        url: 'https://auth-nonprod.thomsonreuters.com/oauth/token',
        // headers:{'content-type':'application/x-www-form-urlencoded'},
        headers: {'content-type': 'application/json'},
        data: {
            'grant_type': 'client_credentials',
            'client_id': req.body.client_id,
            'client_secret': req.body.client_secret,
            'audience': req.body.audience
        }
    };

    axios.request(options).then(function (response) {
       res.send(response.data)
    }).catch(function (error) {
        console.error(error)
        res.send(error)
    });


});

module.exports = router;