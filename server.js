const express = require('express');
const { Router } = express;

const app = express();
const routerProductos = Router();

app.use('/api', routerProductos);

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// Productos

const productos = [
	{
		title: 'Harry Poter Y La Piedra Filosofal',
		price: 12,
		thumbnail:
			'https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg',
		id: 1,
	},
	{
		title: 'Harry Poter Y El Prisionero De Azkaban',
		price: 13,
		thumbnail:
			'https://images-na.ssl-images-amazon.com/images/I/8103uoOEY9L.jpg',
		id: 2,
	},
];

routerProductos.get('/productos', (req, res) => {
	res.json(productos);
});

routerProductos.get('/productos/:id', (req, res) => {
	const { id } = req.params;
	const check = productos.some((producto) => producto.id === parseInt(id));
	if (check) {
		const producto = productos.find((producto) => producto.id === parseInt(id));
		res.json(producto);
	} else {
		res.json({ error: 'producto no encontrado' });
	}
});

routerProductos.post('/productos', (req, res) => {
	const newProducto = req.body;
	const idList = productos.map((a) => a.id);
	const largestId = idList.reduce((a, b) => {
		return Math.max(a, b);
	}, 0);
	const newId = largestId + 1;
	const producto = { ...newProducto, id: newId || 1 };
	productos.push(producto);
	res.json({ message: 'Tu Producto Fue Agregado', producto: producto });
});

routerProductos.put('/productos/:id', (req, res) => {
	const updatedProducto = req.body;
	const { id } = req.params;
	const check = productos.some((producto) => producto.id === parseInt(id));
	if (check) {
		const index = productos.findIndex(
			(producto) => producto.id === parseInt(id)
		);
		productos.splice(index, 1);
		const producto = { ...updatedProducto, id: parseInt(id) };
		productos.push(producto);
		res.json({ message: 'Tu Producto Fue Actualizado', producto: producto });
	} else {
		res.json({ error: 'producto no encontrado' });
	}
});

routerProductos.delete('/productos/:id', (req, res) => {
	const { id } = req.params;
	const check = productos.some((producto) => producto.id === parseInt(id));
	if (check) {
		const index = productos.findIndex(
			(producto) => producto.id === parseInt(id)
		);
		productos.splice(index, 1);
		res.json({ message: 'Tu Producto Fue Eliminado', productos: productos });
	} else {
		res.json({ error: 'producto no encontrado' });
	}
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
