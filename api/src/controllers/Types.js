const { Diet } = require("../db");

let dietId = 0

let diets = [
	{
		name: 'Gluten free',
        id: ++dietId
	},
	{
		name: 'Ketogenic',
        id: ++dietId
	},
	{
		name: 'Vegetarian',
        id: ++dietId
	},
	{
		name: 'Lacto-Vegetarian',
        id: ++dietId
	},
	{
		name: 'Ovo-Vegetarian',
        id: ++dietId
	},
	{
		name: 'Vegan',
        id: ++dietId
	},
	{
		name: 'Pescatarian',
        id: ++dietId
	},
	{
		name: 'Paleolithic',
        id: ++dietId
	},
	{
		name: 'Primal',
        id: ++dietId
	},
	{
		name: 'Whole 30',
        id: ++dietId
	},
];


function getTypes(req, res, next) {
	Diet.findAll()
		.then((response) => {
			if (response.length>0) {
				return res.json(response);
			} else {
				Diet.bulkCreate(diets)
					.then((response) => {
						return res.json(response);
					})
					.catch((error) => next(error));
			}
		})
		.catch((error) => next(error));
}

module.exports = {
	getTypes,
};