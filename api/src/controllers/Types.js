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


async function getTypes(req, res, next) {
	try{
	const response = await Diet.findAll()
   if (response.length>0) return res.json(response);
   else {
	   try{
		const dietsDB = await Diet.bulkCreate(diets)
		return res.json(dietsDB)
	   }catch{err=>next(err)}	
   }				
   }catch{err=>next(err)}	
}

module.exports = {
	getTypes,
};