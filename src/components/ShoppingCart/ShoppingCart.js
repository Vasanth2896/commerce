import React from 'react';
import './ShoppingCart.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addToCart, clearCart } from '../../store/appActions';

const ShoppingCart = (props) => {
    const { state, addtocart, clearcart, history } = props;
    const { userDescription } = state
    const currentUser = userDescription.find(user => user.isLoggedIn);
    const { categories } = currentUser;
    const products = categories.map(product => product['products']).flat().filter(prod => prod.addedToCart);
    const totalPrice = products.map(productPrice => productPrice.quantityPrice).reduce((a, b) => { return a + b }, 0);
    const totalItems = products.map(productItem => productItem.addedToCart).reduce((a, b) => { return a + b }, 0);

    return (
        <div className='shoppingCartContainer'>
            <button className='shoppingCartButtons' onClick={() => history.push('/layout/products')}>BACK TO PRODUCT</button>
            <h4>Shopping Cart</h4>
            <div className='shoppingCartList'>
                <div className='shoppingCartTitle'>
                    <p>You have {totalItems} items in your shopping cart</p>
                    <button className='shoppingCartButtons' onClick={() => clearcart()}>CLEAR SHOPPING CART</button>
                </div>
                {products.length > 0 &&
                    <div >
                        <table className='broughtItemTable'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(broughtProductItem =>
                                        <tr key={broughtProductItem.id}>
                                            <td><img src={broughtProductItem.imgSrc} alt='' /></td>
                                            <td>{broughtProductItem.name}</td>
                                            <td><div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {broughtProductItem.addedToCart > 0 && <div className='shoppingCartOperationalButtonContainer'>
                                                    <button
                                                        className='shoppingCartOperationalButton'
                                                        onClick={() => addtocart(broughtProductItem.catId, broughtProductItem.id, 'sub')} >-</button>
                                                    <span>{broughtProductItem.addedToCart}</span>
                                                    <button className='shoppingCartOperationalButton'
                                                        onClick={() => addtocart(broughtProductItem.catId, broughtProductItem.id, 'add')}>+</button>
                                                </div>
                                                }
                                            </div></td>
                                            <td>{broughtProductItem.quantityPrice}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div style={{
                            padding: '10px', display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', margin: '0px 15px'
                        }}>
                            <span>
                                Total price:
                            </span>
                            <span>
                                {totalPrice}
                            </span>
                        </div>
                        <button id='shoppingCartCheckoutBtn' onClick={() => history.push('/layout/checkout')} >CHECK OUT</button>
                    </div>
                }
                {
                    products.length === 0 && <p style={{ backgroundColor: 'aliceblue', padding: '10px' }}>No Products in the cart</p>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addtocart: addToCart,
        clearcart: clearCart
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);