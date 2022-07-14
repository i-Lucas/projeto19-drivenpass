import joi from 'joi';

const signup = joi.object({

	name: joi.string().alphanum().required(),
	email: joi.string().email().required(),
	password: joi.string().alphanum().min(10).max(15).required(),
	repeat_password: joi.ref('password')
	
});

const signin = joi.object({

	email: joi.string().email().required(),
	password: joi.string().required()

});

const authenticationSchemas = {
	signup,
	signin
};

export default authenticationSchemas;