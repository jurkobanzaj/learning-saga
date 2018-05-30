import { connect } from 'react-redux';
import MessagesListComponent from '../components/MessagesList';

export const MessagesList = connect(state => ({ // конектиться до стору
    messages: state.messages // передає список месиджів - хто це диспатчить?
}), {})(MessagesListComponent);