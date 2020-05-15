import compression from 'compression'
import express from 'express'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import IController from './interfaces/IController'
import errorMiddleware from './middleware/error'
import cors from 'cors'
import path from 'path'
import favicon from 'serve-favicon'

/**
 * Express application class
 */
export class App {
    public app: express.Application
    public httpServer: any

    /**
     * ctor
     * @param controllers
     */
    constructor(controllers: IController[]) {
        this.app = express()
        this.initializeMiddleware()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }

    /**
     * Create http-server listener
     */
    public listen() {
        this.httpServer = this.app.listen(process.env.PORT,
            () => {
                console.log(`ICredit Rivhit IPN available at: http://${process.env.HOST}:${process.env.PORT}/payment/rivhit/ipn`)
        })
    }

    /**
     * Get app instance
     */
    public getApp() {
        return this.app
    }

    /**
     * Get http-server instance
     */
    public getHttpServer() {
        return this.httpServer
    }

    /**
     * Init express application middleware
     */
    private initializeMiddleware() {
        this.app.set('view engine', 'pug')
        this.app.set('views', path.join(path.resolve(), 'server', 'views'))
        this.app.use(express.static(path.join(path.resolve(), 'server', 'public'), {maxAge: 31557600000}))
        this.app.use(favicon(path.join(path.resolve(), 'server', 'public', 'images', 'favicon.png')))

        this.app.use(compression())
        this.app.use(bodyParser.json({limit: '1mb'}))
        this.app.use(bodyParser.urlencoded({extended: true}))

        this.app.use('*', cors())
        this.app.use(cookieParser())
    }

    /**
     * Init error handling
     */
    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    /**
     * Init controllers
     * @param controllers
     */
    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }
}
