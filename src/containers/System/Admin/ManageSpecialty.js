import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
            specialName: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeSpecialtyName = (event) => {
        this.setState({
            specialName: event.target.value
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
        let image = data[0];

        //encode
        if (image) {
            let base64 = await CommonUtils.getBase64(image);
            let objectUrl = URL.createObjectURL(image);
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

    handleSaveSpecialty = () => {
        alert('click me?')
    }

    render() {
        console.log('check state: ', this.state)

        return (
            <>
                <div className='manage-specialty-container container'>
                    <div className='title'>Manage Specialty</div>
                    <div className='add-new-specialty row mt-2'>
                        <div className='form-group col-6'>
                            <label>Specialty Name</label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.specialName}
                                onChange={(event) => {
                                    this.handleOnChangeSpecialtyName(event)
                                }}
                            />
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
                                className='btn btn-primary'
                                onClick={() => {
                                    this.handleSaveSpecialty();
                                }}
                            >
                                Save
                            </button>
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
