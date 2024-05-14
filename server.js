const express = require("express");
const port = 5000;
const geoip = require("geoip-lite");
const moment = require("moment-timezone");
const http = require('http');


const app = express();

app.get("/", function (req, res) {
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) { // Pinguje strone, która zwraca moje publiczne IP
        let ipAddr = '';

        resp.on('data', function(chunk) {
            ipAddr += chunk;
        });

        resp.on('end', function() {
            const geo = geoip.lookup(ipAddr);
            if (!geo) {
                return res.status(400).send("Nie udało się uzyskać danych lokalizacyjnych");
            } else {
                const clientTime = moment.tz(moment(), geo.timezone).format("YYYY-MM-DD HH:mm:ss");
                res.send(`
                    <p>Adres IP: ${ipAddr}</p>
                    <p>Strefa czasowa: ${geo.timezone}</p>
                    <p>Data i czas: ${clientTime}</p>
                `);
            }
        });
    });
});

app.listen(port, function () {
    console.log(`Server nasłuchuje na porcie ${port}!`);
    console.log("Autor: Norbert Kowalik")
});