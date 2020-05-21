import { GraphQLResolveInfo } from 'graphql'
import { IContext } from '../interfaces/IContext'
import { IUrlResponse } from '../interfaces/payment/icredit/IUrlResponse'
import { RivhitPayment } from '../services/payment/icredit/RivhitPayment'

/**
 * Queries (Payment graphQL)
 */
export const Queries = {
    /**
     * Payment GraphQL resolver: get ICredit url
     * @param _
     * @param input
     * @param ctx
     * @param info
     */
    async getUrl(_: void, { input }, ctx: IContext, info: GraphQLResolveInfo): Promise<IUrlResponse | undefined> {
        return await RivhitPayment.getUrl(input)
    }
}
