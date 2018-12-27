const cluster = require('cluster');
const http = require('http');
const zone = require('node-zone');
const express = require('express');
const numCPUs = 1;// require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    /**express*/
    let app = express.Application;
    app = express();

    // test 1 - success
    zone.current.fork({
        name: 'api',
        properties: {
            id: 1
        }
    }).run(() => {
        console.log('zone test 1 - OK');
    });

    let router = express.Router();
    // Create midleware
    app.use((req, res, next) => {
        return new Promise((resolve, reject) => {
            // test 2 - Failed: current is undefined
            zone.current.fork({
                name: 'api',
                properties: {
                    id: 2
                }
            }).run(() => {
                console.log('zone test 2 - Failed');
                next();
                resolve();
            });
        });
    });
    app.use('/api', router);

    router.get('/test', (req, res) => {
        console.log('handle test');
        res.status(500);
        res.json({ message: 'OK' });
    });

    http.createServer(app).listen(8000);

    console.log(`Worker ${process.pid} started`);

}
