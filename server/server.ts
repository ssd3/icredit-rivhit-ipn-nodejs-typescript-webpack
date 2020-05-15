import 'dotenv/config'
import 'reflect-metadata'
import { App } from './app'
import { PaymentController } from './controllers/PaymentController'

/**
 * Entry point
 */
declare const module: any
(
    async () => {
        try    {
            const app = new App([
                new PaymentController()
            ])

            app.listen()

            if (module.hot) {
                module.hot.accept()
                module.hot.dispose(() => app.getHttpServer().close())
            }
        } catch (e) {
            console.log(e)
        }
    }
)()
