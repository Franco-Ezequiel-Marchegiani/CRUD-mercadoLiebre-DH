const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render("products", { products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		 let productoDetalle = products.find( product =>{
			return product.id == req.params.id
		})
		res.render("detail", { productoDetalle: productoDetalle}); 
		//res.send("Estás en detalle producto de:" + req.params.id)
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		res.send(req.body)
		res.redirect('/products/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productoEditar = products.find(product =>{
			return product.id == req.params.id
		})
		res.render("product-edit-form", {productoEditar});
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let peliculaEncontrada = products.find(pelicula =>{
			return pelicula.id == req.params.id
		});
		res.redirect('/products/')
		res.render(
			peliculaEncontrada.name = req.body.name,
			peliculaEncontrada.price = req.body.price,
			peliculaEncontrada.discount = req.body.discount,
			peliculaEncontrada.category = req.body.category,
			peliculaEncontrada.description = req.body.description
		)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		res.send("Estás en: destroy" +req.params.id)
	}
};

module.exports = controller;