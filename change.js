const fetch = require('node-fetch');
const config = require('./config')

exports.changePost = function(fileOkay, fileFailed) {
    return function(_ , res, body) {
        console.log(JSON.stringify(body))
        fetch('https://' + config.titleid + '.playfabapi.com/Admin/ResetPassword?sdk=PostmanCollection-0.100.200421',{
            method: 'post',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'X-PlayFabSDK': 'PostmanCollection-0.100.200421',
                'X-SecretKey': config.secretkey
            },
        })
        .then(result => {
            if (result.ok) {
                res.writeHead(302, {
                    'Location': fileOkay
                });
                res.end();
                console.log(result)
            } else {
                res.writeHead(302, {
                    'Location': fileFailed
                });
                res.end();
                console.log(result)
            }
        })
        .catch(err => {
            res.writeHead(500, "{serverError}");
            res.end();
            console.error(err)
        })
    }
}
