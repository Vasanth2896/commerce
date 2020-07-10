import React from 'react';
import './ProductFilter.scss'
import { connect } from 'react-redux';
import { filter, checkEverything } from '../../../store/appActions';
import { bindActionCreators } from 'redux';

const ProductFilter = (props) => {
    //trying with current user
    const { state, filter, checkEverything } = props;
    const { currentUser } = state;
    const { categories } = currentUser;
    const actionCategories = JSON.parse(JSON.stringify(categories));
    const [allCategories, setAllCategories] = React.useState(true);


    React.useEffect(() => {
        actionCategories.every(catItem => catItem.isChecked) ? setAllCategories(true) : setAllCategories(false);
        let falseCheckBoxes = actionCategories.every(catItem => !catItem.isChecked);
        if (falseCheckBoxes) {
            checkEverything();
        }
    }, [actionCategories, checkEverything]);


    const handleChange = (e, id) => {
        filter(e.target.checked, id);
    }

    const renderFilter = categories.map(categoryItem => {
        return (
            <li key={categoryItem.id} >
                <div>
                    <label>{categoryItem.label}</label>
                    <input type='checkbox' onChange={(e) => handleChange(e, categoryItem.id)} name={categoryItem.label} checked={categoryItem.isChecked}></input>
                </div>
            </li>
        )
    });

    return (
        <div>
            <ul className='categoriesList'>
                <li>
                    <div>
                        <label>All Categories</label>
                        <input type='checkbox' name='allCategories' checked={allCategories} readOnly></input>
                    </div>
                </li>
                {renderFilter}
            </ul>
        </div>
    )


    //safeCode
    // const { state, filter, checkEverything } = props;
    // const { userDescription } = state;
    // const currentUser = userDescription.find(user => user.isLoggedIn);
    // const { categories } = currentUser;
    // const [allCategories, setAllCategories] = useState(true);

    // useEffect(() => {
    //     categories.every(catItem => catItem.isChecked) ? setAllCategories(true) : setAllCategories(false);
    //     let falseCheckBoxes = categories.every(catItem => !catItem.isChecked);
    //     if (falseCheckBoxes) {
    //         checkEverything();
    //     }
    // },[categories,checkEverything]);


    // const handleChange = (e, id) => {
    //     filter(e.target.checked, id);
    // }

    // const renderFilter = categories.map(categoryItem => {
    //     return (
    //         <li key={categoryItem.id} >
    //             <div>
    //                 <label>{categoryItem.label}</label>
    //                 <input type='checkbox' onChange={(e) => handleChange(e, categoryItem.id)} name={categoryItem.label} checked={categoryItem.isChecked}></input>
    //             </div>
    //         </li>
    //     )
    // });

    // return (
    //     <div>
    //         <ul className='categoriesList'>
    //             <li>
    //                 <div>
    //                     <label>All Categories</label>
    //                     <input type='checkbox' name='allCategories' checked={allCategories} readOnly></input>
    //                 </div>
    //             </li>
    //             {renderFilter}
    //         </ul>
    //     </div>
    // )
};

const mapStateToProps = (state) => {
    return {
        state: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        filter: filter,
        checkEverything: checkEverything
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);