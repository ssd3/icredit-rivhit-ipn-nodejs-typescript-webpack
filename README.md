# ICredit Rivhit payment gateway integration for Node.JS / Typescript / Apollo Express Server / GraphQL

```
git clone 

yarn install

yarn build:dev / yarn build:prod

yarn start

Notification URL will be available at: http://localhost:3000/payment/rivhit/ipn
```


# ICredit Rivhit graphql query
```
query getICreditUrl(
  $groupPrivateToken: String
  $redirectURL: String
  $failRedirectURL: String
  $ipnURL: String
  $customerLastName: String
  $customerFirstName: String
  $address: String
  $city: String
  $emailAddress: String
  $numberOfPayments: Int
  $currency: Int
  $saleType: Int
  $hideItemList: Boolean
  $items: [PaymentItemInput!]!
  $custom1: String  
  $custom2: String
) {
  getUrl(input: {
    GroupPrivateToken: $groupPrivateToken,
    RedirectURL: $redirectURL,
    FailRedirectURL: $failRedirectURL,
    IPNURL: $ipnURL,
    CustomerLastName: $customerLastName,
    CustomerFirstName: $customerFirstName,
    Address: $address,
    City: $city,
    EmailAddress: $emailAddress,
    NumberOfPayments: $numberOfPayments,
    Currency: $currency,
    SaleType: $saleType,
    HideItemList: $hideItemList,
    Items: $items,
    Custom1: $custom1,
    Custom2: $custom2
  }) {
    URL
  }
}
```
_variables:_
```
{
  "groupPrivateToken": "<groupPrivateToken>",
  "redirectURL": "<redirectURL>",
  "failRedirectURL": "<failRedirectURL>",
  "ipnURL": "http://localhost:3000/payment/rivhit/ipn",
  "customerFirstName": "First Name",
  "customerLastName": "Last Name",
  "address": "Address",
  "city": "Tel Aviv",
  "emailAddress": "email@localhost",
  "numberOfPayments": 1,
  "currency": 1,
  "saleType": 1,
  "hideItemList": true,
  "items": [
    {
      "UnitPrice": 30.00,
      "Quantity": 1.00,
      "Description": "item test"
    }
  ],
  "custom1": "48",
  "custom2": "0"
}
```
![alt text](https://github.com/ssd3/icredit-rivhit-ipn-nodejs-typescript-webpack/blob/master/graphql-icredit-rivhit.png)
