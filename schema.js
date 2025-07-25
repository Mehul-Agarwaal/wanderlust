const Joi = require("joi");
const { join } = require("path");

const listingSchema = Joi.object({
    listing:Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(), 
        description: Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            filename: Joi.string().allow(null,""),
            url: Joi.string().allow(null,""),
        }).optional()

    }).required()
});



const reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5 ),
        comment: Joi.string().required(),
    }).required(),
});

const userSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required()
})


module.exports = {listingSchema,reviewSchema};