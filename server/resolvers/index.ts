import { IResolvers } from 'graphql-tools'
import { Queries as paymentQueries } from './payment'

/**
 * Combine all GraphQL queries
 */
const resolvers: IResolvers = {
    Query: {
        ...paymentQueries
    }
}

export default resolvers
