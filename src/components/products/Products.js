import React from 'react';
import './Products.scss'
import { connect } from 'react-redux';
import { addToCart } from '../../store/appActions';
import { bindActionCreators } from "redux";


const Products = (props) => {
    
    const { state, addtocart } = props;
    const { userDescription } = state
    const currentUser = userDescription.find(user => user.isLoggedIn);
    const { categories } = currentUser;
    const products = categories.map(product => product['products']);
    const productList = [].concat.apply([], products);

    const productStack = productList.map(productStackItem => {
        return (
            <div key={productStackItem.id} className='displayedProducts'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h4>{productStackItem.name}</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={productStackItem.imgSrc} />
                </div>
                <div style={{ padding: '10px', fontSize: '18px' }}>
                    <span>{productStackItem.brand}</span>
                    <div>
                        <span>${productStackItem.mrp}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {productStackItem.addedToCart === 0 && <button className='addToCartButton' style={{ width: '200px', height: '50px' }} onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'add')} >Add to Cart</button>}
                    {
                        productStackItem.addedToCart > 0 && <div className='operationalButtonContainer'>
                            <button className='operationalButton' onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'sub')} >-</button>
                            <span>{productStackItem.addedToCart}</span>
                            <button className='operationalButton' onClick={() => addtocart(productStackItem.catId, productStackItem.id, 'add')}>+</button>
                        </div>
                    }
                </div>
            </div>
        );
    });

    const productFilter = categories.map(categoryType => {
        return (
            <li key={categoryType.id}>
                <div>
                    <span>{categoryType.label}</span>
                    <input type='checkbox'></input>
                </div>
            </li >

        )
    });

    return (
        <div className='productContainer'>
            <div>
                <ul className='categoriesList'>
                    <li>
                        <div>
                            <span>All Categories</span>
                            <input type='checkbox' ></input>
                        </div>
                    </li>
                    {productFilter}
                </ul>
            </div>
            <div className='productDisplayContainer'>
                {productStack}
            </div>
        </div>
    )
}

const mapStateToprops = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addtocart: addToCart
    }, dispatch)
}

export default connect(mapStateToprops, mapDispatchToProps)(Products);

