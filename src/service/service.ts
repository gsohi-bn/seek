import AdvPrice from "../model/advPrice";
import Cart from "../model/cart";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";


export default class service {

    private Tablename: string = "dynamoTable";

    constructor(private docClient: DynamoDBDocumentClient) { }

    async createCart(cart: Cart): Promise<Cart> {
        await this.docClient.send(new PutCommand({
            TableName: this.Tablename,
            Item: cart
        }))
        return cart as Cart;
    }

    async createAdPrice(advPrice: AdvPrice): Promise<AdvPrice> {
        console.log(`advPrice  ${JSON.stringify(advPrice)}`)
        console.log(await this.docClient.send(new PutCommand({
            TableName: this.Tablename,
            Item: advPrice
        })))
        console.log(`return `, advPrice)
        return advPrice as AdvPrice;
    }

    async getCart(id: string): Promise<any> {
        const param = {
            TableName: this.Tablename,
            Key: {
                id
            }
        }
        console.log(param)
        const cart = await this.docClient.send(new GetCommand(param))
        console.log(cart)
        if (!cart.Item) {
            throw new Error("cart does not exit");
        }
        return cart.Item as Cart;
    }

    async getAdPrice(id: string): Promise<AdvPrice> {
        const param = {
            TableName: this.Tablename,
            Key: {
                id: id
            }
        }
        console.log(param)
        const adPrice = await this.docClient.send(new GetCommand(param))
        console.log(adPrice)
        if (!adPrice.Item) {
            throw new Error("ad Price does not exit");
        }
        return adPrice.Item as AdvPrice;
    }
}