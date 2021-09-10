const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    res.render("products", { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    let productoDetalle = products.find((product) => {
      return product.id == req.params.id;
    });
    res.render("detail", { productoDetalle: productoDetalle });
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
    const lastProduct = products[products.length - 1];
    const biggestProductId = products.length > 0 ? lastProduct.id : 1;
    if (!req.file) {
      res.redirect("/products/create");
    }
    const product = {
      ...req.body,
      id: biggestProductId + 1,
      price: Number(req.body.price),
      discount: Number(req.body.discount), //Se especifica que sea tipo de dato Number, caso contrario lo convierte en String
      image: req.file.filename,
      /* ...req.body 
			Es lo mismo que esto: 
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			(También funciona con los ID's)
			*/
    };
    products.push(product);
    const jsonString = JSON.stringify(products, null, 4); //El null es para saltar una función, y el 4 son los espacios que genera entre producto y producto
    fs.writeFileSync(productsFilePath, jsonString);
    res.redirect("/products/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    let productoEditar = products.find((product) => {
      return product.id == req.params.id;
    });
    res.render("product-edit-form", { productoEditar });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    let peliculaEncontrada = products.find((pelicula) => {
      return pelicula.id == req.params.id;
    });

    peliculaEncontrada.name = req.body.name;
    peliculaEncontrada.price = Number(req.body.price);
    peliculaEncontrada.discount = Number(req.body.discount);
    peliculaEncontrada.category = req.body.category;
    peliculaEncontrada.description = req.body.description;
    peliculaEncontrada.image = req.file
      ? req.file.filename
      : peliculaEncontrada.image;

    const jsonString = JSON.stringify(products, null, 4);
    fs.writeFileSync(productsFilePath, jsonString);
    res.redirect("/products/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    products = products.filter((product) => {
      return product.id != req.params.id;
    });
    res.render(products);
    const jsonString = JSON.stringify(products, null, 4);
    fs.writeFileSync(productsFilePath, jsonString);
    res.redirect("/products");
  },
};

module.exports = controller;
