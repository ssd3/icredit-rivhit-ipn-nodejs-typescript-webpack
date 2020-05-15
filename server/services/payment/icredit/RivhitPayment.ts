import url from 'url'
import https from 'https'
import { IVerifyRequest } from '../../../interfaces/payment/icredit/IVerifyRequest'
import { IVerifyResponse } from '../../../interfaces/payment/icredit/IVerifyResponse'

/**
 * ICredit Rivhit payment processor
 */
export class RivhitPayment {
    /**
     * Verify response by requested data
     * @param request
     */
    public static async verifyResponse(request: IVerifyRequest): Promise<IVerifyResponse> {
        const status = 'EXCEPTION'
        const address = String(process.env.ICREDIT_MODE === 'test' ? process.env.ICREDIT_VERIFY_TEST : process.env.ICREDIT_VERIFY_PROD)
        const urlObject = url.parse(address, true)
        const data = JSON.stringify(request)

        const options = {
            hostname: urlObject.hostname,
            port: urlObject.port === null ? 443 : urlObject.port,
            path: urlObject.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Content-Length': data.length
            }
        }

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                response.on('data', (data) => {
                    try {
                        const _data: any = JSON.parse(data.toString())
                        return resolve({
                            Status: _data.Status ? _data.Status : status
                        })
                    } catch (error) {
                        throw new Error(`${error.message}: ${data}`)
                    }
                })

                response.on('error', (error) => {
                    return reject({
                        Status: status
                    })
                })
            })

            request.on('error', (error) => {
                return reject({
                    Status: status
                })
            })

            request.write(data)
            request.end()
        })
    }
}
