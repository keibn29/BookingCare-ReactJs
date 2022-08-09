import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCSH.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import { createHandbook, editHandbook } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            previewImgURL: '',
            isOpenLightbox: false,
            image: '',
            titleVi: '',
            titleEn: '',

            allHandbook: [],
            handbookEditId: '',
            action: CRUD_ACTIONS.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchAllHandbookStart('ALL');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allHandbookRedux !== this.props.allHandbookRedux) {
            this.setState({
                allHandbook: this.props.allHandbookRedux,
                contentMarkdown: '',
                previewImgURL: '',
                image: '',
                titleVi: '',
                titleEn: '',
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
            let res = await createHandbook({
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                titleVi: this.state.titleVi,
                titleEn: this.state.titleEn
            })
            if (res && res.errCode === 0) {
                toast.success('Add new handbook succeed!')
                // this.props.fetchAllClinicStart();
            } else {
                toast.error('Add new handbook failed!')
                console.log('check res failed: ', res)
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            let res = await editHandbook({
                handbookId: this.state.handbookEditId,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                image: this.state.image,
                titleVi: this.state.titleVi,
                titleEn: this.state.titleEn
            })
            if (res && res.errCode === 0) {
                toast.success('Edit handbook succeed!')
                this.props.fetchAllHandbookStart('ALL');
            } else {
                toast.error('Edit handbook failed!')
                console.log(res.errMessage)
            }
        }
    }

    handleEditHandbook = (handbook) => {

        this.setState({
            titleVi: handbook.titleVi,
            titleEn: handbook.titleEn,
            contentMarkdown: handbook.descriptionMarkdown,
            contentHTML: handbook.descriptionHTML,
            image: '',
            previewImgURL: handbook.image,
            action: CRUD_ACTIONS.EDIT,
            handbookEditId: handbook.id
        })
    }

    handleDeleteHandbook = () => {
        alert('click me?')
    }

    render() {
        let { allHandbook } = this.state;

        return (
            <>
                <div className='manage-CSH-container container'>
                    <div className='title'>Manage Handbook</div>
                    <div className='add-new-CSH row mt-2'>
                        <div className='col-6 input-handbook'>
                            <div className='form-group col-12 row'>
                                <label>Handbook Vietnamese Title</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.titleVi}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'titleVi')
                                    }}
                                />
                            </div>
                            <div className='form-group col-12 row'>
                                <label>Handbook English Title</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.titleEn}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, 'titleEn')
                                    }}
                                />
                            </div>
                        </div>
                        <div className='form-group col-6'>
                            <label>Handbook Image</label>
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
                        <div className='list-CSH-title mt-3'>List Handbooks</div>
                        <table id='table-manage-CSH' className='mb-5'>
                            <tr>
                                <th>STT</th>
                                <th>Handbook title (Vietnamese)</th>
                                <th>Handbook title (English)</th>
                                <th className='action-CH'>Action</th>
                            </tr>
                            {
                                allHandbook && allHandbook.length > 0 && allHandbook.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.titleVi}</td>
                                            <td>{item.titleEn}</td>
                                            <td>
                                                <button
                                                    className='btn-edit mr-2'
                                                    onClick={() => {
                                                        this.handleEditHandbook(item)
                                                    }}
                                                >
                                                    <i className="fas fa-user-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => {
                                                        this.handleDeleteHandbook(item)
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
        allHandbookRedux: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandbookStart: (limit) => dispatch(actions.fetchAllHandbookStart(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
