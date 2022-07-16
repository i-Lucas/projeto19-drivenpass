import joi from 'joi';

const create = joi.object({

    title: joi.string().required(),
    network: joi.string().min(5).max(10).required(),
    password: joi.string().min(5).max(10).required(),
});

const wifiSchema = { create };
export default wifiSchema;