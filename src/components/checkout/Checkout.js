import React from 'react';
import './checkout.scss'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Checkout = (props) => {
    const history = useHistory()
    const { state } = props;
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

    const renderBroughtProducts = broughtProducts.map(broughtProductItems => {
        return (
            <div key={broughtProductItems.id} style={{
                padding: '10px', fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <span>{broughtProductItems.addedToCart}</span>
                    <span>X</span>
                    <span>{broughtProductItems.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span>$</span>
                    <span>{broughtProductItems.quantityPrice}</span>
                </div>
            </div >
        )
    });


    return (
        <div className='checkoutContainer'>
            <button id='backToCartBtn' onClick={() => history.push('/layout/shopping-cart')} >BACK TO CART</button>
            <div className='checkoutContent' >
                <div style={{ padding: '10px' }}>
                    <h3>Order Summary</h3>
                    <p>You have {totalItems} Items in the shopping cart</p>
                </div>
                {renderBroughtProducts}
                <div style={{
                    padding: '10px', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: 'bold'
                }}>
                    <span>
                        Total price:
                            </span>
                    <span>
                        ${totalPrice}
                    </span>
                </div>
            </div>
            <button id='placeOrderBtn'>PLACE ORDER</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

export default connect(mapStateToProps)(Checkout);