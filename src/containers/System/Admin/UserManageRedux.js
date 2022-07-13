import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManageRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUserRedux from './TableManageUserRedux';

class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImgURL: '',
            isOpenLightbox: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
        // try {
        //     let res = await getAllCodeService('GENDER')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.allcode
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    //re-render
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let gendersArr = this.props.genderRedux;
            this.setState({
                genders: gendersArr,
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionsArr = this.props.positionRedux;
            this.setState({
                positions: positionsArr,
                position: positionsArr && positionsArr.length > 0 ? positionsArr[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let rolesArr = this.props.roleRedux;
            this.setState({
                roles: rolesArr,
                role: rolesArr && rolesArr.length > 0 ? rolesArr[0].keyMap : ''
            })
        }
        if (prevProps.AllUsersRedux !== this.props.AllUsersRedux) {
            let gendersArr = this.props.genderRedux;
            let positionsArr = this.props.positionRedux;
            let rolesArr = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: gendersArr && gendersArr.length > 0 ? gendersArr[0].keyMap : '',
                position: positionsArr && positionsArr.length > 0 ? positionsArr[0].keyMap : '',
                role: rolesArr && rolesArr.length > 0 ? rolesArr[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let image = data[0];

        //encode
        if (image) {
            let base64 = await CommonUtils.getBase64(image);
            console.log('check base64 img: ', base64)
            let objectUrl = URL.createObjectURL(image);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) {
            return;
        }
        this.setState({
            isOpenLightbox: true
        })
    }

    onChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            let { action } = this.state;
            if (action === CRUD_ACTIONS.CREATE) {
                //fire redux create user
                this.props.createUserStart({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    role: this.state.role,
                    position: this.state.position,
                    avatar: this.state.avatar
                });
            } else if (action === CRUD_ACTIONS.EDIT) {
                //fire redux edit user
                this.props.editUserStart({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phonenumber: this.state.phonenumber,
                    address: this.state.address,
                    role: this.state.role,
                    position: this.state.position,
                    gender: this.state.gender,
                    avatar: this.state.avatar
                })
            }
        }
    }

    handleEditUserFromParent = (user) => {
        //decode
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {

        let { genders, positions, roles } = this.state;
        let { language, isLoadingGender } = this.props;
        let { email, password, firstName, lastName, phonenumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>User Manage - Redux</div>
                <div className="user-redux-content" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user-redux.add-new-user' /></div>
                            <div className='col-12'>
                                {isLoadingGender === true ? 'Loading Genders' : ''}
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.email' /></label>
                                <input
                                    className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'email');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.password' /></label>
                                <input
                                    className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'password');
                                    }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.first-name' /></label>
                                <input
                                    className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'firstName');
                                    }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.last-name' /></label>
                                <input
                                    className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'lastName');
                                    }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.phonenumber' /></label>
                                <input
                                    className='form-control' type='text'
                                    value={phonenumber}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'phonenumber');
                                    }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user-redux.address' /></label>
                                <input
                                    className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'address');
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id='manage-user-redux.gender' /></label>
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'gender');
                                    }}
                                >
                                    {
                                        genders && genders.length > 0 && genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id='manage-user-redux.position' /></label>
                                <select
                                    className="form-control"
                                    value={position}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'position');
                                    }}
                                >
                                    {
                                        positions && positions.length > 0 && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id='manage-user-redux.role' /></label>
                                <select
                                    className="form-control"
                                    value={role}
                                    onChange={(event) => {
                                        this.onChangeInput(event, 'role');
                                    }}
                                >
                                    {
                                        roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user-redux.image' /></label>
                                <div className='preview-img-container'>
                                    <div>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => {
                                                this.handleChangeImage(event);
                                            }}
                                        />
                                        <label className='label-upload-img' htmlFor='previewImg'>
                                            <FormattedMessage id='manage-user-redux.upload-img' />
                                            <i class="fas fa-upload"></i>
                                        </label>
                                    </div>
                                    <div className='preview-img'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => {
                                            this.openPreviewImage();
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => {
                                        this.handleSaveUser();
                                    }}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user-redux.edit' />
                                        :
                                        <FormattedMessage id='manage-user-redux.add' />
                                    }
                                </button>
                            </div>
                            <div className='col-12'>
                                <TableManageUserRedux
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {
                    this.state.isOpenLightbox === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenLightbox: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        AllUsersRedux: state.admin.arrUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
        editUserStart: (inputData) => dispatch(actions.editUserStart(inputData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
