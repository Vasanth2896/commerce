import React, { useState } from 'react';
import './Navbar.scss'
import { connect } from 'react-redux';
import { onLogout } from '../../store/appActions';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Navbar = (props) => {
    const history = useHistory();
    const { state, onlogout } = props;
    const { userDescription } = state;
    const currentUser = JSON.parse(JSON.stringify(userDescription.find(user => user.isLoggedIn)));
    const { categories } = currentUser;
    const products = categories.map(product => product['products']);
    const productList = [].concat.apply([], products);
    const broughtProducts = productList.filter(product => product.addedToCart);
    const totalItemsList = broughtProducts.map(product => product.addedToCart);
    const totalItems = totalItemsList.reduce((a, b) => { return a + b }, 0);
    const [menu, setMenu] = useState(null);


    const handleClick = (e) => {
        setMenu(e.currentTarget);
    };

    const handleClose = () => {
        setMenu(null);
        onlogout(currentUser.id);
        history.push('/');
    };

    const redirectToCart = () => {
        history.push('/layout/shopping-cart');
    }

    return (
        <nav className='navigationBar'>
            <div className="navigationContentWrapper">
                <div>
                    <h3>Welcome to React E-Commerce Shopping Mart</h3>
                </div>
                <div id='exitContainer'>
                    <Button style={{ color: 'white' }} onClick={handleClick}>{currentUser.username}</Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={menu}
                        open={Boolean(menu)}
                        onClose={() => setMenu(null)}
                    >
                        <MenuItem onClick={handleClose} >logout</MenuItem>
                    </Menu>
                    <div className='shoppingIconContainer'>
                        <FontAwesomeIcon icon={faShoppingCart} className='shoppingCartIcon' onClick={redirectToCart} />
                        {totalItems !== 0 && <span id='shoppingCartNotifier'>{totalItems}</span>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onlogout: onLogout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);