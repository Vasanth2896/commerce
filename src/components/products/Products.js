import React from 'react';
import './Products.scss'
import { connect } from 'react-redux';
import { addToCart } from '../../store/appActions';
import { bindActionCreators } from "redux";
import ProductFilter from './productFilter/ProductFilter'

const Products = (props) => {
    //trying with currentUser
    const { state, addToCart } = props;
    const { currentUser } = state
    const { categories } = currentUser;
    console.log(currentUser);
    const productList = categories.filter(categoryTypes => categoryTypes.isChecked).map(product => product['products']).flat();
    const productStack = productList.map(productStackItem => {
        return (
            <div key={productStackItem.id} className='displayedProducts'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h4>{productStackItem.name}</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={productStackItem.imgSrc} alt='' />
                </div>
                <div style={{ padding: '10px', fontSize: '18px' }}>
                    <span>{productStackItem.brand}</span>
                    <div>
                        <span>${productStackItem.mrp}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {productStackItem.addedToCart === 0 &&
                        <button className='addToCartButton' onClick={() => addToCart(productStackItem.catId, productStackItem.id, 'add')} >Add to Cart</button>}
                    {
                        productStackItem.addedToCart > 0 && <div className='operationalButtonContainer'>
                            <button className='operationalButton' onClick={() => addToCart(productStackItem.catId, productStackItem.id, 'sub')} >-</button>
                            <span>{productStackItem.addedToCart}</span>
                            <button className='operationalButton' onClick={() => addToCart(productStackItem.catId, productStackItem.id, 'add')}>+</button>
                        </div>
                    }
                </div>
            </div>
        );
    });

    return (
        <div className='productContainer'>
            <ProductFilter />
            <div className='productDisplayContainer'>
                {productStack}
            </div>
        </div>
    )



    //safeCode
    // const { state, addtocart } = props;
    // const { userDescription } = state
    // const currentUser = userDescription.find(user => user.isLoggedIn);
    // const { categories } = currentUser;
    // const productList = categories.filter(categoryTypes => categoryTypes.isChecked).map(product => product['products']).flat();
    // const productStack = productList.map(productStackItem => {
    //     return (
    //         <div key={productStackItem.id} className='displayedProducts'>
    //             <div style={{ display: 'flex', justifyContent: 'center' }}>
    //                 <h4>{productStackItem.name}</h4>
    //             </div>
    //             <div style={{ display: 'flex', justifyContent: 'center' }}>
    //                 <img src={productStackItem.imgSrc} alt='' />
    //             </div>
    //             <div style={{ padding: '10px', fontSize: '18px' }}>
    //                 <span>{productStackItem.brand}</span>
    //                 <div>
    //                     <span>${productStackItem.mrp}</span>
    //                 </div>
    //             </div>
    //             <div style={{ display: 'flex', justifyContent: 'center' }}>
    //                 {productStackItem.addedToCart === 0 &&
    //                     <button className='addToCartButton' onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'add')} >Add to Cart</button>}
    //                 {
    //                     productStackItem.addedToCart > 0 && <div className='operationalButtonContainer'>
    //                         <button className='operationalButton' onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'sub')} >-</button>
    //                         <span>{productStackItem.addedToCart}</span>
    //                         <button className='operationalButton' onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'add')}>+</button>
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //     );
    // });

    // return (
    //     <div className='productContainer'>
    //         <ProductFilter />
    //         <div className='productDisplayContainer'>
    //             {productStack}
    //         </div>
    //     </div>
    // )
}

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addToCart: addToCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);

