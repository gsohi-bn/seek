import { handlerPath } from '@libs/handler-resolver';

export const createCart = {
    handler: `${handlerPath(__dirname)}/handler.createCart`,
    events: [
        {
            http: {
                method: 'post',
                path: 'checkout',
            },
        },
    ],
};

export const getCart = {
    handler: `${handlerPath(__dirname)}/handler.getCart`,
    events: [
        {
            http: {
                method: 'get',
                path: 'getCart/{id}',
            },
        },
    ],
};

export const createAdPrice = {
    handler: `${handlerPath(__dirname)}/handler.createAdPrice`,
    events: [
        {
            http: {
                method: 'post',
                path: 'pricing',
            },
        },
    ],
};

export const getAdPrice = {
    handler: `${handlerPath(__dirname)}/handler.getAdPrice`,
    events: [
        {
            http: {
                method: 'get',
                path: 'pricing/{id}',
            },
        },
    ],
};
