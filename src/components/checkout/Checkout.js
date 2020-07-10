import React from 'react';
import './checkout.scss'
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { clearCart } from '../../store/appActions';
import { bindActionCreators } from "redux";

const Checkout = (props) => {
    //trying with current user
    const { state, clearCart, history } = props;
    const { currentUser } = state;
    const { categories } = currentUser;
    const products = categories.map(product => product['products']).flat().filter(prod => prod.addedToCart);
    const totalPrice = products.map(productPrice => productPrice.quantityPrice).reduce((a, b) => { return a + b }, 0);
    const totalItems = products.map(productItems => productItems.addedToCart).reduce((a, b) => { return a + b }, 0);
    const renderProducts = products.map(broughtProductItems => {
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

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    const actionHandleClose = (value) => {
        setOpen(false);
        clearCart();
        history.push('/layout/products')
    }

    return (
        <div className='checkoutContainer'>
            <button id='backToCartBtn' onClick={() => history.push('/layout/shopping-cart')} >BACK TO CART</button>
            <div className='checkoutContent' >
                <div style={{ padding: '10px' }}>
                    <h3>Order Summary</h3>
                    <p>You have {totalItems} Items in the shopping cart</p>
                </div>
                {renderProducts}
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
            <button id='placeOrderBtn' onClick={() => handleClickOpen()} >PLACE ORDER</button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <div className='dialogTitle'>Thank you for the purchase</div>
                <div className='dialogButtonContainer'><button className='dialogButton' onClick={actionHandleClose}>OKAY</button></div>
            </Dialog>
        </div>
    )



    // safeCode
    // const { state, clearcart, history } = props;
    // const { userDescription } = state
    // const currentUser = userDescription.find(user => user.isLoggedIn);
    // const { categories } = currentUser;
    // const products = categories.map(product => product['products']).flat().filter(prod => prod.addedToCart);
    // const totalPrice = products.map(productPrice => productPrice.quantityPrice).reduce((a, b) => { return a + b }, 0);
    // const totalItems = products.map(productItems => productItems.addedToCart).reduce((a, b) => { return a + b }, 0);
    // const renderProducts = products.map(broughtProductItems => {
    //     return (
    //         <div key={broughtProductItems.id} style={{
    //             padding: '10px', fontWeight: 'bold',
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             alignItems: 'center'
    //         }}>
    //             <div style={{ display: 'flex', justifyContent: 'space-around' }} >
    //                 <span>{broughtProductItems.addedToCart}</span>
    //                 <span>X</span>
    //                 <span>{broughtProductItems.name}</span>
    //             </div>
    //             <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    //                 <span>$</span>
    //                 <span>{broughtProductItems.quantityPrice}</span>
    //             </div>
    //         </div >
    //     )
    // });

    // const [open, setOpen] = React.useState(false);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = (value) => {
    //     setOpen(false);
    // };
    // const actionHandleClose = (value) => {
    //     setOpen(false);
    //     clearcart();
    //     history.push('/layout/products')
    // }

    // return (
    //     <div className='checkoutContainer'>
    //         <button id='backToCartBtn' onClick={() => history.push('/layout/shopping-cart')} >BACK TO CART</button>
    //         <div className='checkoutContent' >
    //             <div style={{ padding: '10px' }}>
    //                 <h3>Order Summary</h3>
    //                 <p>You have {totalItems} Items in the shopping cart</p>
    //             </div>
    //             {renderProducts}
    //             <div style={{
    //                 padding: '10px', display: 'flex', alignItems: 'center',
    //                 justifyContent: 'space-between',
    //                 fontWeight: 'bold'
    //             }}>
    //                 <span>
    //                     Total price:
    //                         </span>
    //                 <span>
    //                     ${totalPrice}
    //                 </span>
    //             </div>
    //         </div>
    //         <button id='placeOrderBtn' onClick={() => handleClickOpen()} >PLACE ORDER</button>
    //         <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    //             <div className='dialogTitle'>Thank you for the purchase</div>
    //             <div className='dialogButtonContainer'><button className='dialogButton' onClick={actionHandleClose}>OKAY</button></div>
    //         </Dialog>
    //     </div>
    // )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clearCart: clearCart
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);