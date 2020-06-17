const jsonModel = require('../models/jsonModel');
const productModel = jsonModel('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		const visited = productModel.filterBySomething(product => {
			return product.category == 'visited';
		})

		const inSale = productModel.filterBySomething(product => {
			return product.category == 'in-sale';
		})

		return res.render('index', { visited, inSale });
	},
	search: (req, res) => {
		// Do the magic

		const busqueda = req.query.keywords;

		const products = productModel.filterBySomething(product => {
			return product.name == busqueda;
		})

		return res.render('results', {products, busqueda})


	},
};

module.exports = controller;
