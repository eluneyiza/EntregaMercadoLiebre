const jsonModel = require('../models/jsonModel');
const productModel = jsonModel('products');

const fs = require('fs');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		const visited = productModel.filterBySomething(product => {
			return product.category == 'visited';
		})

		const inSale = productModel.filterBySomething(product => {
			return product.category == 'in-sale';
		})

		return res.render('products', { visited, inSale });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic

		const product = productModel.findById(req.params.productId);

		return res.render('detail', {product})

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form');

	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		// const dataJson = fs.readFileSync('products.json', 'utf-8');
		// const data = JSON.parse(dataJson);
		const data = productModel.leerJson(productModel.path);
		let newData= {
			id:data.length+1,
			 name: req.body.name,
			 price: req.body.price,
			 discount:req.body.discount,
			 category:req.body.category,
			 description:req.body.description,
			}
	  productModel.guardarUno(newData);
	  
	  
	  res.redirect('/');
		// productModel.create(req.body);
		// return res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {

		const product = productModel.findById(req.params.productId);

		return res.render('product-edit-form', {product});
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		productModel.edit(req.body, req.params.productId);
		
		return res.redirect('/products/detail/' + req.params.productId);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const products= productModel.leerJson(productModel.path);
		products.forEach((item,id)=>{
			if(item.id == req.params.productId){
				products.splice(id,1);
			}
		})
		productModel.escribirJson(products,productModel.path);
		return res.redirect('/');
	}
};

module.exports = controller;