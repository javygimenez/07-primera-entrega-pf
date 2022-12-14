import Container from "./container.js";


const carts = new Container('./data/carts.json');

//Add a cart
const addCart = (req, res) => {
	const products = req.body
	if (!products) return carts.saveCart([]);
	carts.saveCart(products);	
	res.json({ message: 'Carrito agregado' });
}

//Delete cart
const deleteCart = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const cartDeleted = carts.deleteById(id);
	if (cartDeleted === -1) return res.status(404).json({ message: 'El ID no pertenece a un carrito listado' });
	res.json({ message: 'Carrito eliminado' });
}

//Get products form an specific cart
const getProducts = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const cartSelected = carts.getById(id);
	if (cartSelected == null) return res.status(404).send({ message: 'Ingresa el ID de un carrito listado' });
	res.json({ 'Productos': cartSelected.products });
}

//Add a product to a cart
const addProductToCart = (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });	
	const productSaved = carts.saveProduct(id, id_prod);
	if (!productSaved) return res.status(404).send({ message: 'Error' });
	res.json({ message: productSaved });
}

//Delete a product from a cart
const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	if (isNaN(id) || isNaN(id_prod)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const productDeleted = carts.deleteProduct(id, id_prod);
	if (productDeleted == -1 || !productDeleted) return res.status(404).send({ message: 'Error' });
	res.json({ message: 'Producto eliminado' });
}

export { addCart, deleteCart, getProducts, addProductToCart, deleteProduct };