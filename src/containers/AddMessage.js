import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage'; // бере компонент
import { addMessage } from '../actions/index'; // бере екшин

const mapDispatchToProps = dispatch => ({ // додиспатчує екшин, отриманий від компонента
    dispatch: (message, author) => {
        dispatch(addMessage(message, author))
    }
});

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent); // конектиться до стору