import React from 'react';
import './ShoppingCart.scss'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { addToCart, clearCart } from '../../store/appActions';

const ShoppingCart = (props) => {
    const history = useHistory();
    const { state, addtocart, clearcart } = props;
    const { userDescription } = state
    const currentUser = userDescription.find(user => user.isLoggedIn);
    const { categories } = currentUser;
    const products = categories.map(product => product['products']);
    const productList = [].concat.apply([], products);
    const broughtProducts = productList.filter(product => product.addedToCart);
    const broughtProductsPriceList = broughtProducts.map(product => product.quantityPrice)
    const totalItemsList = broughtProducts.map(product => product.addedToCart);
    const totalItems = totalItemsList.reduce((a, b) => { return a + b }, 0);
    const totalPrice = broughtProductsPriceList.reduce((a, b) => { return a + b }, 0);

    return (
        <div className='shoppingCartContainer'>
            <button className='shoppingCartButtons' onClick={() => history.push('/layout/products')}>BACK TO PRODUCT</button>
            <h4>Shopping Cart</h4>
            <div className='shoppingCartList'>
                <div className='shoppingCartTitle'>
                    <p>You have {totalItems} items in your shopping cart</p>
                    <button className='shoppingCartButtons' onClick={() => clearcart()}>CLEAR SHOPPING CART</button>
                </div>
                {broughtProducts.length > 0 &&
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
                                    broughtProducts.map(broughtProductItem =>
                                        <tr key={broughtProductItem.id}>
                                            <td><img src={broughtProductItem.imgSrc} /></td>
                                            <td>{broughtProductItem.name}</td>
                                            <td><div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {broughtProductItem.addedToCart > 0 && <div className='operationalButtonContainer'>
                                                    <button
                                                        className='operationalButton'
                                                        onClick={() => addtocart(broughtProductItem.catId, broughtProductItem.id, 'sub')} >-</button>
                                                    <span>{broughtProductItem.addedToCart}</span>
                                                    <button className='operationalButton'
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
                    broughtProducts.length === 0 && <p style={{ backgroundColor: 'aliceblue', padding: '10px' }}>No Products in the cart</p>
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