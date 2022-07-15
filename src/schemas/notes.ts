import joi from 'joi';

const create = joi.object({

    title: joi.string().min(5).max(50).required(),
    annotation: joi.string().min(5).max(1000).required()
});

const noteSchemas = {
    create
};

export default noteSchemas;