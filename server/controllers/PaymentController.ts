import express, { Request, Response, NextFunction as Next } from 'express'
import IController from '../interfaces/IController'
import { RivhitPayment } from '../services/payment/icredit/RivhitPayment'
import { ICreditResponse } from '../interfaces/payment/icredit/ICreditResponse'

/**
 * Payment controller
 */
export class PaymentController implements IController {
    public path = '/payment'
    public router = express.Router()

    /**
     * ctor
     */
    constructor() {
        this.initializeRoutes()
    }

    /**
     * Init payment controller routes
     */
    private initializeRoutes() {
        /**
         * Request handler for ICredit Rivhit
         */
        this.router.post(`${this.path}/rivhit/ipn`, this.requestHandlerRivhitIPN)
    }

    /**
     * ICredit Rivhit callback handling
     * @param request
     * @param response
     * @param next
     */
    private requestHandlerRivhitIPN = async (request: Request, response: Response, next: Next) => {
        const iCreditResponse: ICreditResponse = request.body
        const { GroupPrivateToken, SaleId, TransactionAmount } = iCreditResponse
        const result = await RivhitPayment.verifyResponse({
            GroupPrivateToken,
            SaleId,
            TotalAmount: Number(TransactionAmount)
        })

        if (result.Status === 'VERIFIED') {
            console.log('ICredit verified data:', iCreditResponse)
        } else {
            console.log('ICredit unverified data:', iCreditResponse)
        }

        return response.status(200).send(result.Status)
    }
}
