import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/asyncHandler'
import Joi from "joi"
import { StatusCodes } from '../constants'

// JOI validation middleware function for incoming data

// POST method validation schema
const POST_JoiSchema = Joi.object({
  title: Joi.string().max(30).required(),
  description: Joi.string().max(100).required(),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid('high','low','medium').required(),
}).options({ abortEarly: false });


// PATCH method validation schema
const PATCH_JoiSchema = Joi.object({
	_id: Joi.string().required(),
	title: Joi.string().max(30).optional(),
	description: Joi.string().max(100).optional(),
	dueDate: Joi.date().optional(),
	priority: Joi.string().valid('high','low','medium').optional(),
}).options({ abortEarly : false})


const validator = asyncHandler( async (req,res,next) => {
  	let validation_schema;

	if ( req.method === 'POST') {
		validation_schema = POST_JoiSchema;
	}
	else if ( req.method === 'PATCH') {
		validation_schema = PATCH_JoiSchema;
		req.body._id = req.query.id;
	}
	else {
		return next(new ApiError(StatusCodes.BAD_REQUEST,"The given http method does not need validation. Check your routes"));
	}

	const { error } = validation_schema.validate(req.body);

	if ( error ) {
		return next( new ApiError(StatusCodes.UNPROCESSABLE,"Data failed validation check. Check the data being passed",error.details))
	}

	// If everything is correct, move along 
	next();
});

export default validator;