const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json())

let items = [
    { id: 1, name: 'Apple', count: '1' },
    { id: 2, name: 'Banana', count: '2' },
    { id: 3, name: 'Orange', count: '4' },
    { id: 4, name: 'Kiwi', count: '5' },
]

app.get('/items', (req, res) => {
    res.json(items)
})

app.post('/items', (req, res) => {
    const exists = items.some(item => item.name === req.body.name);
    if (exists) {
        return res.status(400).json({ message: 'Item already existed.' });
    } else {
        const newItem = {
            id: items.length + 1,
            name: req.body.name,
            count: req.body.count
        }
        items.push(newItem);
        res.json(newItem)
    }

});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.map(item => item.id === id ? { ...item, ...req.body } : item);
    res.json(items.find(item => item.id === id))
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(item => item.id !== id)
    res.json({ message: 'Item deleted succeessfully.' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

