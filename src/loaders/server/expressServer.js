const express = require('express');
const morgan = require('morgan');
const config = require('../../config');



class ExpressServer {

    constructor() {

        this.app = express();
        this.port = config.port;
        this.basePathUser = `${config.api.prefix}/users`;

        this._middlewares();

        this._routes();
        this._notFound();
        this._errrorHandler();
        //this._myAplicattionError(statusCode);// TO DO
    }

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    _routes() {
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });

        this.app.use(this.basePathUser, require('../../routes/users'));
    }
    _notFound(){//armando middleware propio e instanciando error con dos atributos
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.status = 404; // no necesario
            err.code = 404;
            next(err);
        });    }

    _errrorHandler() {
this.app.use((err, req, res, next) => {
const code = err.code || 500;
const body = {
    error: {
        code,
        message: err.message
    }
}
res.json(body);
/*
res.status(code).json({
    error: {
        code,
        message: err.message
    }
});
*/
});
    }


    async start() {
        this.app.listen(this.port, (error) => {
            if(error) {
                console.log(err);
                process.exit(1);
                return;
            }
        });
    }

}

module.exports = ExpressServer;