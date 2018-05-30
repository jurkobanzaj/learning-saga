import { connect } from 'react-redux';
import SidebarComponent from '../components/Sidebar';

export const Sidebar = connect(state => ({ // конектиться до стору
    users: state.users // передає список юзерів - хто його диспатчить?
}), {})(SidebarComponent);