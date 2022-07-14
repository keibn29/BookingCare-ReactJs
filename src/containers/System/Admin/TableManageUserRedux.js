import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUserRedux.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            userEdit: {}
        }
    }

    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllUsersRedux !== this.props.AllUsersRedux) {
            this.setState({
                arrUsers: this.props.AllUsersRedux
            })
        }
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserStart(user.id)
    }

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <>
                <table id='table-manage-user' className='mb-5'>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {
                        arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className='btn-edit mr-2'
                                            onClick={() => {
                                                this.handleEditUser(item)
                                            }}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button
                                            className='btn-delete'
                                            onClick={() => {
                                                this.handleDeleteUser(item)
                                            }}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table >
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        AllUsersRedux: state.admin.arrUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUserRedux);
