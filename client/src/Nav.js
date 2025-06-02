import { Link } from 'react-router-dom'

function Nav() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Link to='/'>Products</Link>
            <Link to='/create'>Add Product</Link>
            <Link to='/update'>Update Product</Link>
            <Link to='/logout'>Logout</Link>
            <Link to='/profile'>Profile</Link>
        </div>
    )
}

export default Nav