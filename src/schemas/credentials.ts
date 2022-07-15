import joi from 'joi';

const create = joi.object({

    username: joi.string().alphanum().min(5).required(),
    password: joi.string().alphanum().min(10).max(15).required(),
    title: joi.string().alphanum().min(5).max(15).required(),
    url: joi.string().uri().required()

});

const credentialsSchemas = {
    create
};

export default credentialsSchemas;