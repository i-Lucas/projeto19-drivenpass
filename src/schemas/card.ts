import joi from 'joi';

const data_format = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; //dd/mm/yyyy

const create = joi.object({

    card_title: joi.string().alphanum().required(),
    card_number: joi.string().alphanum().min(16).max(16).required(),
    card_code: joi.string().alphanum().min(3).max(3).required(),
    card_expiration: joi.string().pattern(data_format).required(),
    card_password: joi.string().alphanum().min(4).max(4).required(),
    card_type: joi.string().alphanum().required(),
    card_virtual: joi.boolean().required()
});

const cardSchema = { create };
export default cardSchema;