import React, { useState } from 'react';
import * as appActions from '../../store/appActions'
import './Login.scss'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const { onSubmit } = props;
    const [login, setLogin] = useState(
        {
            username: '',
            email: ''
        }
    );
    const history = useHistory();

    // const { login } = props.loginData;
    // const { onchange, onsubmit } = props;
    // const history = useHistory()

    const handleChange = (e) => {
        const duplicateDummy = { ...login };
        duplicateDummy[e.target.name] = e.target.value;
        setLogin(duplicateDummy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(login);
        setLogin(
            {
                username: '',
                email: ''
            }
        );
        history.push('/layout/products');
    }

    // const handleChange = (value, key) => {
    //     const data = { ...login, [key]: value }
    //     onchange('login', data);
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onsubmit();
    //     history.push('/layout/products');
    // }

    // return (
    //     <div className="loginFormWrapper">
    //         <fieldset>
    //             <legend>Sign in:</legend>
    //             <form className="loginForm" autoComplete='off' onSubmit={(e) => handleSubmit(e)} >
    //                 <label >username:</label>
    //                 {/* <LoginInputField name="username" handleChange={handleChange} value={login.username}/> */}
    //                 <input className='loginInputField' type='text' name='username' onChange={(e) => handleChange(e.target.value, 'username')} value={login.username} required></input>
    //                 <label >email:</label>
    //                 {/* <LoginInputField name="email" handleChange={handleChange} value={login.email} pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;}/> */}
    //                 <input className='loginInputField' type='text' id='email' name='email' onChange={(e) => handleChange(e.target.value, 'email')} pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$' value={login.email} required></input>
    //                 <button className="loginBtn">login</button>
    //             </form>
    //         </fieldset>
    //     </div>
    // );

    return (
        <div className="loginFormWrapper">
            <fieldset>
                <legend>Sign in:</legend>
                <form className="loginForm" autoComplete='off' onSubmit={(e) => handleSubmit(e)} >
                    <label >username:</label>
                    <input className='loginInputField' type='text' name='username' onChange={(e) => handleChange(e)} value={login.username} required></input>
                    <label >email:</label>
                    <input className='loginInputField' type='text' name='email' onChange={(e) => handleChange(e)} value={login.email} pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$' required></input>
                    <button className="loginBtn">login</button>
                </form>
            </fieldset>
        </div>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         loginData: state.appReducer
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onSubmit: appActions.onSubmit
    }, dispatch)
}


export default connect(null, mapDispatchToProps)(Login);