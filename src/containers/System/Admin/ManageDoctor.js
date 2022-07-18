import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getMarkdownService } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: [],
            action: '', // có thể khai báo 1 state hasOldData: false (có dữ liệu cũ hay không)
            // infoMarkdown: []
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {

            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName} `;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctorsRedux !== this.props.AllDoctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorsRedux);
            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorsRedux);
            this.setState({
                allDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['selectedDoctor', 'description', 'contentMarkdown', 'contentHTML'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveContentMardown = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            let { action } = this.state;
            // có thể truyền action trực tiếp về backend rồi if-edit else-create?
            if (action === CRUD_ACTIONS.CREATE) {
                this.props.createDoctorInfoStart({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value
                })
            } else if (action === CRUD_ACTIONS.EDIT) {
                this.props.editDoctorInfoStart({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value
                })
            }
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
        // this.props.fetchMarkdownStart(selectedDoctor.value) 

        //react-select-is-special
        let res = await getMarkdownService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.infoMarkdown) {
            let markdown = res.infoMarkdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                action: CRUD_ACTIONS.EDIT
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                action: CRUD_ACTIONS.CREATE
            })
        }

    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }


    render() {
        let { allDoctors, selectedDoctor } = this.state;

        return (
            <div className='manage-doctor-container px-3'>
                <div className='manage-doctor-title title'>Doctor Details</div>
                <div className='doctor-general-info'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={allDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control' rows='4'
                            onChange={(event) => {
                                this.handleOnChangeDescription(event)
                            }}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor mt-4'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mt-2' : 'btn btn-primary mt-2'}
                    onClick={() => {
                        this.handleSaveContentMardown();
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
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        AllDoctorsRedux: state.admin.allDoctors,
        infoMarkdownRedux: state.admin.infoMarkdown
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createDoctorInfoStart: (inputData) => dispatch(actions.createDoctorInfoStart(inputData)),
        editDoctorInfoStart: (inputData) => dispatch(actions.editDoctorInfoStart(inputData)),
        // fetchMarkdownStart: (doctorId) => dispatch(actions.fetchMarkdownStart(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
