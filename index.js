import express from 'express'
import cors from 'cors'
import { readFile, writeFile } from 'node:fs/promises'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/img', express.static('img'))

const loadData = async () => {
    const data = await readFile('db.json')
    return JSON.parse(data)
}

app.get('/api/products', async (req, res) => {
    const data = await loadData();
    const {toppings} = req.query;

    const selectedToppings = toppings ? toppings.split(',') : []

    const filteredProducts = selectedToppings.length > 0 ? toppings.split(',') : [];
        data.pizzas.filter(product => 
            selectedToppings.every(toppings =>
                Object.values(product.toppings).some(toppingList => 
                    toppingList.includes(topping)
        
                )
            )
        )   :
        data.pizzas;

    const productWithImages = filteredProducts.map(product => {
        const images = product.img.map(img => `${req.protocol}://${req.get('host')}/${img}`);
        const { img,... productWitoutImg} = product;
        return {...productWitoutImg, images};
    });

    res.json(productWithImages);
});


app.get('/api/toppings', async (req, res) => {
    const data = await loadData();
    const allToppings = data.toppings;
    res.json(allToppings)
});

app.post('/api/orders/', async (req, res) => {
    const { name, phone, address, paymentMethod, pizzas} = req.body;

    if (!name || !phone || !address ||!paymentMethod || !pizzas || !Array.isArray(pizzas)) {
        return res.status(400).json({error: 'Missing required data in the request'})
    }

    let orders = []
    try {
        const ordersData = await readFile('orders.json');
        orders = JSON.parse(ordersData);
    } catch (error) {
        console.error('Error reading orders', error)
    }

    const orderId = Date.now()

    const newOrder = {
        id: orderId,
        name,
        phone,
        address,
        paymentMethod,
        pizzas
    };

    orders.push(newOrder);

    try {
        await writeFile('orders.json', JSON.stringify(orders, null, 2))
        res.status(201).json({message: 'Order created successfully', orderId});
    } catch (error) {
        console.error('Error writing orders:', error)
        rel.status(500).json({error: 'Failed to create order' })
    }
})

    