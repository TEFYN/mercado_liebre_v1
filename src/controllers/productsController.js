const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render("products", {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		// const {id} = req.params;
		// lo que sigue es lo mismo que la linea anterior
		const id = req.params.id; 
		const p = products.filter(e => e.id == id);
		if(p.length < 1){
			res.render('products', {products});
			return;
		}
		res.render("detail", {product: p[0]});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount, category, description} = req.body

		const newProduct = {
			id: products.length + 1,
			name,
			price,
			discount,
			category,
			description,
			image: req.file ? req.file.filename : 'default-image.png'
		};
		products.map(product => product.id).includes(newProduct.id) ? console.log('ya existe') : products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
		console.log(newProduct)

		res.redirect(`/products/detail/${newProduct.id}`);
		// res.render("products", {products});


	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id} = req.params;
		const p = products.filter(e => e.id == id);

		//si el indice == -1 , cuando no lo encuentra es = -1 , en ese caso muestro todos los productos
		if(p.length < 1){
			res.render('products', {products});
			return
		}
		res.render("product-edit-form", {productToEdit: p[0] });
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const body = req.body;
		const {id} = req.params;
		
		const productIndex = products.findIndex(product => product.id === parseInt(id));

		//si el indice == -1 significa que no lo encontró, en ese caso muestro todos los productos
		if(productIndex == -1){
			res.render('products', {products});
			return;
		}

		
		let edit = {}
		edit.id = parseInt(id);
		edit.name = body.name
		edit.price = body.price
		edit.discount = body.discount;
		edit.category = body.category;
		edit.description = body.description;
		edit.image = products[productIndex].image;

		products[productIndex] = edit
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		res.render("product-edit-form", {productToEdit: edit});

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const {id} = req.params;
		const productIndex = products.findIndex(product => product.id === parseInt(id));
		// esto va a eliminar 1 solo elemento del array
		products.splice(productIndex, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		res.render('products', {products});
	}
};

module.exports = controller;