import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js'
import { StatusCodes } from '../constants.js'
import Joi from "joi"



// POST method validation schema
const POST_JoiSchema = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(200).required(),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid('high','low','medium').required(),
}).options({ abortEarly: false });


// PATCH method validation schema
const PATCH_JoiSchema = Joi.object({
	id: Joi.number().required(),
	title: Joi.string().max(50).optional(),
	description: Joi.string().max(200).optional(),
	dueDate: Joi.date().optional(),
	priority: Joi.string().valid('high','low','medium').optional(),
}).options({ abortEarly : false})


// Fetch Method validation schema
const FETCH_JoiSchema = Joi.object({
	id: Joi.number().optional(),
	sort: Joi.string()
			 .valid('byCreatedDate_oldest','byCreatedDate_latest','byUpdatedDate_oldest','byUpdatedDate_latest')
			 .optional(),
	filter_criteria : Joi.string()
						 .valid('before_createdDate','after_createdDate','before_updatedDate','after_updatedDate')
						 .optional(),
	filter_date : Joi.date().when('filter_criteria',{
		is : Joi.exist(),
		then : Joi.required(),
		otherwise : Joi.optional()
	})
}).options({ abortEarly : false });



// DELETE method validation schema
const DELETE_JoiSchema = Joi.object({
	id: Joi.number().required()
})



// JOI validation middleware function for incoming data

const validator = asyncHandler( async (req,res,next) => {
  	let validation_schema;
	let data;

	switch (req.method) {
		case 'GET':
			validation_schema = FETCH_JoiSchema;
			data = {...req.query};
			break;
		case 'POST':
			validation_schema = POST_JoiSchema;
			data = {...req.body};
			break;
		case 'PATCH':
			validation_schema = PATCH_JoiSchema;
			data = {...req.body};
			data.id = req.query.id;
			break;
		case 'DELETE':
			validation_schema = DELETE_JoiSchema;
			data = {...req.query};
			break;
		default:
			return next(new ApiError(StatusCodes.BAD_REQUEST,"Improper HTTP method recieved. Check your routes"));
	}
	
	// Validate the data
	const { error } = validation_schema.validate(data);

	if ( error ) {
		return next( new ApiError(StatusCodes.UNPROCESSABLE,"Data failed validation check. Check the data being sent",error.details))
	}

	// If everything is correct, move along 
	next();
});

export default validator;