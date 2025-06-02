import React, { useEffect, useState } from 'react'
import axios from 'axios'

const initVal = { name: '', count: '' }

function Home() {
    const [items, setItems] = useState([])
    const [formValues, setFormValues] = useState(initVal)
    const [error, setError] = useState('')

    console.log('items')

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setError()
        try {
            const resutls = await axios.get('http://localhost:5000/items');
            setItems(resutls.data)
        } catch {
            console.log('err')
        }
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:5000/items', formValues)
            fetchItems()
            setFormValues(initVal)
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleEdit = (item) => {
        setFormValues(item)
    }

    const handleUpdate = async () => {
        await axios.put('http://localhost:5000/items/' + formValues.id, formValues)
        fetchItems()
        setFormValues(initVal)
    }

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:5000/items/' + id).then(response => console.log(response.data))
        fetchItems()
    }

    return (
        <div id='container'>
            {/* Add/Edit Item */}
            <div className='form-container'>
                <input value={formValues.name} type='text' name='name' placeholder='Name' onChange={handleChange} />
                <input value={formValues.count} type='text' name='count' placeholder='Count' onChange={handleChange} />
                <button onClick={() => formValues.id ? handleUpdate() : handleAdd()}>{formValues.id ? 'Update' : 'Add'}</button>
            </div>

            {error !== '' && <p style={{ color: 'red', fontSize: '14px', marginTop: 5 }}>{error}</p>}

            {/* Items Display */}
            {items.map((item, index) => {
                return <div key={index} className='items-container'>
                    <span>{item.name} - </span>
                    <span>{item.count}</span>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            })}
        </div>
    )
}

export default Home