import { productSeed } from '../assets/utils/productSeed'
export const UPDATE_STATE = "UPDATE_STATE"
export const initialState = {
    login: {
        id: 0,
        username: '',
        email: '',
        categories: [],
        isLoggedIn: false
    },
    userDescription: JSON.parse(sessionStorage.getItem('userDescription')) || [],
}

const newUserCategories = () => JSON.parse(JSON.stringify(productSeed)).map(function (el) {
    const o = Object.assign({}, el);
    o.isChecked = true;
    return o;
})

export function app_onChange(name, value) {
    return {
        type: UPDATE_STATE, payload: { name: name, value: value }
    }
}

export function onSubmit() {
    return (dispatch, getState) => {
        const { login, userDescription } = getState().appReducer;
        const actionLogin = { ...login }
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const userExistence = actionUserDescription.find(actionUser => actionUser.email === actionLogin.email);
        actionLogin.categories = userExistence ? userExistence.categories : newUserCategories()
        if (userExistence) {
            actionLogin.username = login.username;
            actionLogin.email = login.email;
            actionLogin.categories.map(item => item.isChecked = true);
            actionUserDescription.splice(actionUserDescription.indexOf(userExistence), 1, actionLogin);
        }
        else {
            actionUserDescription.push(actionLogin);
        }
        actionLogin.isLoggedIn = true;
        actionLogin.id = actionUserDescription.indexOf(actionLogin) + 1;
        dispatch(app_onChange('login', { id: 0, username: '', email: '', categories: [], isLoggedIn: false }));
        dispatch(app_onChange('userDescription', actionUserDescription));
        setSessionStorage(actionUserDescription);
    };
}

export function onLogout(id) {
    return (dispatch, getState) => {
        const { userDescription } = getState().appReducer;
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const loggedInUserIndex = id - 1;
        const loggedInUser = { ...actionUserDescription[loggedInUserIndex] };
        loggedInUser.isLoggedIn = false;
        actionUserDescription.splice(loggedInUserIndex, 1, loggedInUser);
        dispatch(app_onChange('userDescription', actionUserDescription));
        setSessionStorage(actionUserDescription);
    }
}

export function addToCart(productCategoryId, productId, operation) {
    return (dispatch, getState) => {
        const { userDescription } = getState().appReducer;
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const currentUser = actionUserDescription.find(user => user.isLoggedIn);
        const requiredProduct = currentUser.categories.find(prodType => prodType.id === productCategoryId).products.find(prod => prod.id === productId);
        const mathOperation = operation;
        if (mathOperation === 'add') {
            requiredProduct.addedToCart++;
            requiredProduct.quantityPrice = requiredProduct.addedToCart * requiredProduct.mrp
        }
        else if (mathOperation === 'sub') {
            requiredProduct.addedToCart--;
            requiredProduct.quantityPrice = requiredProduct.addedToCart * requiredProduct.mrp
        }
        dispatch(app_onChange('userDescription', actionUserDescription));
        setSessionStorage(actionUserDescription);
    }
}

export function clearCart() {
    return (dispatch, getState) => {
        const { userDescription } = getState().appReducer;
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const currentUser = actionUserDescription.find(user => user.isLoggedIn);
        currentUser.categories = [...newUserCategories()];
        dispatch(app_onChange('userDescription', actionUserDescription));
        setSessionStorage(actionUserDescription);
    }
}

export function filter(event, id) {
    return (dispatch, getState) => {
        const { userDescription } = getState().appReducer
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const currentUser = actionUserDescription.find(user => user.isLoggedIn);
        const { categories } = currentUser;
        const findCategory = categories.find(cat => cat.id === id);
        findCategory.isChecked = event;
        dispatch(app_onChange('userDescription', actionUserDescription));
    }
}

export function checkEverything() {
    return (dispatch, getState) => {
        const { userDescription } = getState().appReducer;
        const actionUserDescription = JSON.parse(JSON.stringify(userDescription));
        const currentUser = actionUserDescription.find(user => user.isLoggedIn);
        const { categories } = currentUser;
        categories.map(cat => cat.isChecked = true);
        dispatch(app_onChange('userDescription', actionUserDescription));
    }
}

function setSessionStorage(actionUserDescription) {
    sessionStorage.setItem('userDescription', JSON.stringify(actionUserDescription));
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATE:
            return { ...state, [action.payload.name]: action.payload.value }
        default:
            return state;
    }
}
