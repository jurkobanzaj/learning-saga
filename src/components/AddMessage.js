import React from 'react';
import propTypes from 'prop-types';

const AddMessage = (props) => {
    let input; 

    return (
        <section id="new-message">
            <input
                onKeyPress={(e) => { // обробка кліку прямо в стейтлес компоненті
                    if(e.key ==='Enter') {
                        props.dispatch(input.value, 'Me'); // передає диспатчи AddMessage в пропси
                        input.value = ''; // обнулився текст у формі
                    };
                }}
                type='text'
                ref={(node) => { // не зовсім ясно, навіщо воно треба
                    input = node
                }}
            />
        </section>
    );
};

AddMessage.propTypes = {
    dispatch: propTypes.func.isRequired
};

export default AddMessage;