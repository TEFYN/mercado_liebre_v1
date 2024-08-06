const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		const visited = products.filter(product => product.category === "visited");
		console.log(visited);
		const insale = products.filter(product => product.category === "in-sale");
		console.log(insale);
		res.render("index", {visited, insale});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
