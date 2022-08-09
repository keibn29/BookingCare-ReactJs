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
import { createSpecialty, editSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

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

            allSpecialty: [],
            specialEditId: '',
            action: CRUD_ACTIONS.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchAllSpecialtyStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
            this.setState({
                allSpecialty: this.props.allSpecialtyRedux,
                contentMarkdown: '',
                previewImgURL: '',
                image: '',
                nameVi: '',
                nameEn: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeSpecialtyName = (event, id) => {
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

    handleSaveSpecialty = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createSpecialty({
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn
            })
            if (res && res.errCode === 0) {
                toast.success('Add new specialty succeed!')
                this.props.fetchAllSpecialtyStart();
            } else {
                toast.error('Add new specialty failed!')
                console.log('check res failed: ', res)
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            let res = await editSpecialty({
                specialtyId: this.state.specialEditId,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn
            })
            if (res && res.errCode === 0) {
                toast.success('Edit specialty succeed!')
                this.props.fetchAllSpecialtyStart();
            } else {
                toast.error('Edit specialty failed!')
                console.log('check res failed: ', res)
            }
        }
    }

    handleEditSpecialty = (specialty) => {
        // let data = specialty.image;
        // let base64 = ''
        // //encode
        // if (data) {
        //     base64 = await CommonUtils.getBase64(data);
        // }

        this.setState({
            nameVi: specialty.nameVi,
            nameEn: specialty.nameEn,
            contentMarkdown: specialty.descriptionMarkdown,
            contentHTML: specialty.descriptionHTML,
            image: '',
            previewImgURL: specialty.image,
            action: CRUD_ACTIONS.EDIT,
            specialEditId: specialty.id
        })
    }

    handleDeleteSpecialty = () => {
        alert('Delete is locked!')
    }

    render() {
        let { allSpecialty } = this.state;
        console.log('check allSpecialty: ', allSpecialty)

        return (
            <>
                <div className='manage-CSH-container container'>
                    <div className='title'>Manage Specialty</div>
                    <div className='add-new-CSH row mt-2'>
                        <div className='col-6'>
                            <div className='form-group col-12 row'>
                                <label>Specialty Vietnamese Name</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.nameVi}
                                    onChange={(event) => {
                                        this.handleOnChangeSpecialtyName(event, 'nameVi')
                                    }}
                                />
                            </div>
                            <div className='form-group col-12 row'>
                                <label>Specialty English Name</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.nameEn}
                                    onChange={(event) => {
                                        this.handleOnChangeSpecialtyName(event, 'nameEn')
                                    }}
                                />
                            </div>
                        </div>
                        <div className='form-group col-6'>
                            <label>Specialty Image</label>
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
                                    this.handleSaveSpecialty();
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
                        <div className='list-CSH-title mt-3'>List Specialties</div>
                        <table id='table-manage-CSH' className='mb-5'>
                            <tr>
                                <th>Specialty Id</th>
                                <th>Special Name (Vietnamese)</th>
                                <th>Special Name (English)</th>
                                <th>Action</th>
                            </tr>
                            {
                                allSpecialty && allSpecialty.length > 0 && allSpecialty.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nameVi}</td>
                                            <td>{item.nameEn}</td>
                                            <td>
                                                <button
                                                    className='btn-edit mr-2'
                                                    onClick={() => {
                                                        this.handleEditSpecialty(item)
                                                    }}
                                                >
                                                    <i className="fas fa-user-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => {
                                                        this.handleDeleteSpecialty(item)
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
        allSpecialtyRedux: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
