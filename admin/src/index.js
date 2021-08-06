import * as express from 'express'
import * as cors from 'cors'

createConnection().then(db => {
    const productRepository = db.getRepository(Product);
    const app = express()

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))

    app.use(express.json())

    app.get('/api/products', async (req, res) => {
        const products = await productRepository.find()
        res.json(products)
    })

    app.post('/api/products', async (req, res) => {
        const product = await productRepository.create(req.body);
        const result = await productRepository.save(product)
        channel.sendToQueue('product_created', Buffer.from(JSON.stringify(result)))
        return res.send(result)
    })

    app.get('/api/products/:id', async (req, res) => {
        const product = await productRepository.findOne(req.params.id)
        return res.send(product)
    })

    app.put('/api/products/:id', async (req, res) => {
        const product = await productRepository.findOne(req.params.id)
        productRepository.merge(product, req.body)
        const result = await productRepository.save(product)
        channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(result)))
        return res.send(result)
    });

    app.delete('/api/products/:id', async (req, res) => {
        const result = await productRepository.delete(req.params.id)
        channel.sendToQueue('product_deleted', Buffer.from(req.params.id))
        return res.send(result)
    })

    app.post('/api/products/:id/like', async (req, res) => {
        const product = await productRepository.findOne(req.params.id)
        product.likes++
        const result = await productRepository.save(product)
        return res.send(result)
    })

    console.log('Listening to port: 8000')
})