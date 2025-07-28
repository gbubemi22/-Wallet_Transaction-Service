import Joi from "joi";
export declare function joiValidator(constraint: any, isMiddleware?: boolean): any;
declare const _default: {
    create: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    login: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    wallet: {
        schema: Joi.ObjectSchema<any>;
    };
    topUpWallet: {
        schema: Joi.ObjectSchema<any>;
    };
    transferToUser: {
        schema: Joi.ObjectSchema<any>;
    };
};
export default _default;
