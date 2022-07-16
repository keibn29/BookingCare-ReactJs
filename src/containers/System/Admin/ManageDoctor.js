import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            AllDoctors: [],
            arrdoctorInfo: []
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
                AllDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.AllDoctorsRedux);
            this.setState({
                AllDoctors: dataSelect
            })
        }
        if (prevProps.arrdoctorInfoRedux !== this.props.arrdoctorInfoRedux) {
            this.setState({
                arrdoctorInfo: this.props.arrdoctorInfoRedux
            })
        }
        // if (prevProps.selectedOption !== this.state.selectedOption) {
        //     this.setState({
        //         contentMarkdown: '',
        //         contentHTML: '',
        //         selectedOption: '',
        //         description: ''
        //     })
        // }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['selectedOption', 'description', 'contentMarkdown', 'contentHTML'];
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
            this.props.createDoctorInfoStart({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value
            })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption
        })
        let res = await this.props.fetchDoctorInfoStart(selectedOption.value) //react-select-is-special
        if (res && res.Markdown) {
            let markdown = res.Markdown;
            this.setState({
                description: markdown.description,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown
            })
        }

        // console.log('check markdown: ', markdown)

    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }


    render() {
        console.log('check arrdoctorinfo: ', this.state.arrdoctorInfo)
        let AllDoctors = this.state.AllDoctors;

        return (
            <div className='manage-doctor-container px-3'>
                <div className='manage-doctor-title title'>Doctor Details</div>
                <div className='doctor-general-info'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={AllDoctors}
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
                    />
                </div>
                <button
                    className='btn btn-primary mt-2'
                    onClick={() => {
                        this.handleSaveContentMardown();
                    }}
                >
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        AllDoctorsRedux: state.admin.allDoctors,
        arrdoctorInfoRedux: state.admin.arrdoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createDoctorInfoStart: (inputData) => dispatch(actions.createDoctorInfoStart(inputData)),
        fetchDoctorInfoStart: (doctorId) => dispatch(actions.fetchDoctorInfoStart(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
