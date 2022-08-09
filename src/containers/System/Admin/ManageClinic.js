import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCSH.scss'; //Clinic-Specialty-Handbook
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import { createClinic, editClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            previewImgURL: '',
            isOpenLightbox: false,
            image: '',
            nameVi: '',
            nameEn: '',
            address: '',

            allClinic: [],
            clinicEditId: '',
            action: CRUD_ACTIONS.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchAllClinicStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinicRedux !== this.props.allClinicRedux) {
            this.setState({
                allClinic: this.props.allClinicRedux,
                contentMarkdown: '',
                previewImgURL: '',
                image: '',
                nameVi: '',
                nameEn: '',
                address: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        //encode
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
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

    handleSaveClinic = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createClinic({
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                address: this.state.address
            })
            if (res && res.errCode === 0) {
                toast.success('Add new clinic succeed!')
                this.props.fetchAllClinicStart();
            } else {
                toast.error('Add new clinic failed!')
                console.log('check res failed: ', res)
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            let res = await editClinic({
                clinicId: this.state.clinicEditId,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                address: this.state.address
            })
            if (res && res.errCode === 0) {
                toast.success('Edit clinic succeed!')
                this.props.fetchAllClinicStart();
            } else {
                toast.error('Edit clinic failed!')
                console.log('check res failed: ', res)
            }
        }
    }

    handleEditClinic = (clinic) => {

        this.setState({
            nameVi: clinic.nameVi,
            nameEn: clinic.nameEn,
            address: clinic.address,
            contentMarkdown: clinic.descriptionMarkdown,
            contentHTML: clinic.descriptionHTML,
            image: '',
            previewImgURL: clinic.image,
            action: CRUD_ACTIONS.EDIT,
            clinicEditId: clinic.id
        })
    }

    handleDeleteClinic = () => {
        alert('Delete is locked!')
    }

    render() {
        let { allClinic } = this.state;

        return (
            <>
                <div className='manage-CSH-container container'>
                    <div className='title'>Manage Clinic</div>
                    <div className='add-new-CSH row mt-2'>
                        <div className='col-6 input-clinic'>
                            <div className='form-group col-12 row'>
                                <label>Clinic Vietnamese Name</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.nameVi}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'nameVi')
                                    }}
                                />
                            </div>
                            <div className='form-group col-12 row'>
                                <label>Clinic English Name</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.nameEn}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'nameEn')
                                    }}
                                />
                            </div>
                            <div className='form-group col-12 row'>
                                <label>Clinic Address</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.address}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'address')
                                    }}
                                />
                            </div>
                        </div>
                        <div className='form-group col-6'>
                            <label>Clinic Image</label>
                            <div className='upload-image-container'>
                                <div>
                                    <input
                                        id='previewImg'
                                        type='file'
                                        hidden
                                        onChange={(event) => {
                                            this.handleChangeImage(event);
                                        }}
                                    />
                                    <label
                                        className='label-upload-img'
                                        htmlFor='previewImg'
                                    >
                                        Upload Image
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
                        <div className='markdown-editor col-12'>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className='col-12 my-2'>
                            <button
                                className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                onClick={() => {
                                    this.handleSaveClinic();
                                }}
                            >
                                {
                                    this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user-redux.edit' />
                                        :
                                        <FormattedMessage id='manage-user-redux.add' />
                                }
                            </button>
                        </div>
                    </div>
                    <div className='all-CSH'>
                        <div className='list-CSH-title mt-3'>List Clinics</div>
                        <table id='table-manage-CSH' className='mb-5'>
                            <tr>
                                <th>Clinic Id</th>
                                <th>Clinic Name (Vietnamese)</th>
                                <th>Clinic Name (English)</th>
                                <th>Clinic Address</th>
                                <th className='action-CH'>Action</th>
                            </tr>
                            {
                                allClinic && allClinic.length > 0 && allClinic.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nameVi}</td>
                                            <td>{item.nameEn}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className='btn-edit mr-2'
                                                    onClick={() => {
                                                        this.handleEditClinic(item)
                                                    }}
                                                >
                                                    <i className="fas fa-user-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => {
                                                        this.handleDeleteClinic(item)
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
                    </div>
                </div>
                {
                    this.state.isOpenLightbox === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenLightbox: false })}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinicRedux: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinicStart: () => dispatch(actions.fetchAllClinicStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
