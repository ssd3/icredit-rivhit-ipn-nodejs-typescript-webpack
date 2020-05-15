/**
 * IVerifyRequest interface
 * Should be used for payment data verification
 */
export interface IVerifyRequest {
    GroupPrivateToken: string
    SaleId: string
    TotalAmount: number
}
