import url from 'url'
import https from 'https'
import { IVerifyRequest } from '../../../interfaces/payment/icredit/IVerifyRequest'
import { IVerifyResponse } from '../../../interfaces/payment/icredit/IVerifyResponse'
import { IUrlResponse } from '../../../interfaces/payment/icredit/IUrlResponse'
import { IUrlRequest } from '../../../interfaces/payment/icredit/IUrlRequest'

/**
 * ICredit Rivhit payment processor
 */
export class RivhitPayment {
    /**
     * Get url by requested data
     * @param request
     */
    public static async getUrl(request: IUrlRequest): Promise<IUrlResponse> {
        const address = `${String(process.env.ICREDIT_MODE === 'test' ? process.env.ICREDIT_TEST : process.env.ICREDIT_PROD)}/GetUrl`
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
                            URL: _data.URL
                        })
                    } catch (error) {
                        throw new Error(`${error.message}: ${data}`)
                    }
                })

                response.on('error', (error) => {
                    return reject({
                        URL: ''
                    })
                })
            })

            request.on('error', (error) => {
                return reject({
                    URL: ''
                })
            })

            request.write(data)
            request.end()
        })
    }

    /**
     * Verify response by requested data
     * @param request
     */
    public static async verifyResponse(request: IVerifyRequest): Promise<IVerifyResponse> {
        const status = 'EXCEPTION'
        const address = `${String(process.env.ICREDIT_MODE === 'test' ? process.env.ICREDIT_TEST : process.env.ICREDIT_PROD)}/Verify`
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
