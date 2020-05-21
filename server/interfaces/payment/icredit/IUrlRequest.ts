/**
 * IPaymentItem interface
 */
export interface IPaymentItem {
    Id?: number
    CatalogNumber?: string
    Quantity: number
    UnitPrice: number
    Description: string
}

/**
 * IUrlRequest interface
 */
export interface IUrlRequest {
    GroupPrivateToken: string
    Items: IPaymentItem[]
    Currency: number
    NumberOfPayments: number
    SaleType: number
    RedirectURL?: string
    FailRedirectURL?: string
    IPNURL: string
    ExemptVAT?: boolean
    MaxPayments?: number
    CreditFromPayment?: number
    Reference?: number
    Order?: string
    EmailAddress?: string
    EmailBcc?: string
    CustomerLastName?: string
    CustomerFirstName?: string
    Address?: string
    POB?: number
    City?: string
    Zipcode?: number
    PhoneNumber?: string
    PhoneNumber2?: string
    FaxNumber?: string
    IdNumber?: number
    VatNumber?: number
    CustomerId?: number
    AgentId?: number
    Comments?: string
    ProjectId?: number
    HideItemList?: boolean
    DocumentLanguage: string
    CreateToken?: string
    Discount?: number
    Custom1?: string
    Custom2?: string
    Custom3?: string
    Custom4?: string
    Custom5?: string
    Custom6?: string
    Custom7?: string
    Custom8?: string
    Custom9?: string
}
