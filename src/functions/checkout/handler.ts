import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import checkoutService from '../../service'
import { v4 } from "uuid";
import * as _ from "lodash"
import AdvPrice from "../../model/advPrice";
import Cart from "../../model/cart";


export const createCart = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const cart = await checkoutService.createCart({
            id: v4(),
            businessId: event.body.businessId,
            lineItems: event.body.lineItems,
        })
        const businessId = cart.businessId;
        const adPrice: AdvPrice = await checkoutService.getAdPrice(businessId)
        if (!_.isNil(adPrice)) {
            let totalPrice = 0;
            cart.lineItems.forEach((lineItem) => {
                totalPrice = totalPrice + adPrice[lineItem]
            })
            return formatJSONResponse({
                cart,
                totalPrice
            });
        }
        return formatJSONResponse({
            status: 500,
            message: 'Price does not exist for cart'
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const createAdPrice = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const request = {
            id: event.body.id,
            classicAdv: event.body.classicAdv,
            standOutAd: event.body.standOutAd,
            premiumAd: event.body.premiumAd,
        }


        console.log(`request  ${JSON.stringify(request)}`)
        const adPrice = await checkoutService.createAdPrice(request)
        return formatJSONResponse({
            adPrice
        });
    } catch (e) {
        console.log(`Error ${e}`)
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getCart = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    console.log(JSON.stringify(event))
    const id = event.pathParameters.id;
    try {
        const cart: Cart = await checkoutService.getCart(id)
        if (!_.isNil(cart)) {
            const businessId = cart.businessId;
            const adPrice: AdvPrice = await checkoutService.getAdPrice(businessId)
            if (!_.isNil(adPrice)) {
                let totalPrice = 0;
                cart.lineItems.forEach((lineItem) => {
                    totalPrice = totalPrice + adPrice[lineItem]
                })
                return formatJSONResponse({
                    cart,
                    totalPrice
                });
            }
            return formatJSONResponse({
                status: 500,
                message: 'Price does not exist for cart'
            });
        }
        return formatJSONResponse({
            status: 500,
            message: 'Cart does not exist for cart'
        });

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})


export const getAdPrice = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    console.log(JSON.stringify(event))
    const id = event.pathParameters.id;
    try {
        const adPrice: AdvPrice = await checkoutService.getAdPrice(id)

        if (!_.isNil(adPrice)) {
            return formatJSONResponse({
                adPrice,
            });
        }
        return formatJSONResponse({
            status: 500,
            message: "Price not found"
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
