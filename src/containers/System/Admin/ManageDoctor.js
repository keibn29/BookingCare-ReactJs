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
import { getMarkdownService } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to table markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctors: [],
            action: '', // có thể khai báo 1 state hasOldData: false (có dữ liệu cũ hay không)

            //save to table doctors
            allPrice: [],
            selectedPrice: '',
            allProvince: [],
            selectedProvince: '',
            allPayment: [],
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {

            inputData.map((item, index) => {
                let obj = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName} ` : item.valueEn;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = type === 'USERS' ? item.id : item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();

        this.props.fetchPriceStart();
        this.props.fetchProvinceStart();
        this.props.fetchPaymentStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctorsRedux !== this.props.AllDoctorsRedux) {
            let dataSelectDoctor = this.buildDataInputSelect(this.props.AllDoctorsRedux, 'USERS');
            console.log('check arrdoctorall: ', dataSelectDoctor)
            this.setState({
                allDoctors: dataSelectDoctor
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.buildDataInputSelect(this.props.AllDoctorsRedux, 'USERS');
            this.setState({
                allDoctors: dataSelectDoctor
            })
        }
        if (prevProps.allPriceRedux !== this.props.allPriceRedux) {
            let dataSelectPrice = this.buildDataInputSelect(this.props.allPriceRedux);
            this.setState({
                allPrice: dataSelectPrice
            })
        }
        if (prevProps.allProvinceRedux !== this.props.allProvinceRedux) {
            let dataSelectProvince = this.buildDataInputSelect(this.props.allProvinceRedux);
            this.setState({
                allProvince: dataSelectProvince
            })
        }
        if (prevProps.allPaymentRedux !== this.props.allPaymentRedux) {
            let dataSelectPayment = this.buildDataInputSelect(this.props.allPaymentRedux);
            this.setState({
                allPayment: dataSelectPayment
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
        let arrInput = ['selectedDoctor', 'description', 'contentMarkdown', 'contentHTML',
            'selectedPrice', 'selectedProvince', 'selectedPayment', 'nameClinic', 'addressClinic'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveDetailDoctor = () => {
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
                    doctorId: this.state.selectedDoctor.value,

                    priceId: this.state.selectedPrice.value,
                    provinceId: this.state.selectedProvince.value,
                    paymentId: this.state.selectedPayment.value,
                    nameClinic: this.state.nameClinic,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note
                })
            } else if (action === CRUD_ACTIONS.EDIT) {
                this.props.editDoctorInfoStart({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value,

                    priceId: this.state.selectedPrice.value,
                    provinceId: this.state.selectedProvince.value,
                    paymentId: this.state.selectedPayment.value,
                    nameClinic: this.state.nameClinic,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note
                })
            }
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        //selectedDoctor được truyền sang từ thư viện react-select
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

    //giống UserManageRedux.onChangeInput(event, id)
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let nameState = name.name; //react-select trả ra 1 obj tên 'name'
        //good code
        let copyState = { ...this.state };
        copyState[nameState] = selectedOption;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    render() {
        let { allDoctors, selectedDoctor, allPrice, allProvince, allPayment, selectedPrice, selectedProvince, selectedPayment } = this.state;
        console.log('check selected state: ', selectedPrice, selectedProvince, selectedPayment)
        console.log('check input state: ', this.state.nameClinic, this.state.addressClinic, this.state.note)

        return (
            <div className='manage-doctor-container px-3'>
                <div className='manage-doctor-title title'><FormattedMessage id='system.admin.doctor-details' /></div>
                <div className='doctor-general-info mt-2'>
                    <div className='content-left'>
                        <label><FormattedMessage id='system.admin.choose-doctor' /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={allDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='system.admin.introduction' /></label>
                        <textarea
                            className='form-control'
                            rows='4'
                            onChange={(event) => {
                                this.handleOnChangeInput(event, 'description')
                            }}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='doctor-detail-info mt-4 row'>
                    <div className='form-group col-4'>
                        <label>Giá khám bệnh</label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={allPrice}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Phương thức thanh toán</label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={allPayment}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Tỉnh thành</label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={allProvince}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Tên phòng khám</label>
                        <input
                            className='form-control'
                            onChange={(event) => {
                                this.handleOnChangeInput(event, 'nameClinic')
                            }}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className='form-control'
                            onChange={(event) => {
                                this.handleOnChangeInput(event, 'addressClinic')
                            }}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Ghi chú</label>
                        <input
                            className='form-control'
                            onChange={(event) => {
                                this.handleOnChangeInput(event, 'note')
                            }}
                        />
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
                        this.handleSaveDetailDoctor();
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
        infoMarkdownRedux: state.admin.infoMarkdown,
        allPriceRedux: state.admin.allPrice,
        allProvinceRedux: state.admin.allProvince,
        allPaymentRedux: state.admin.allPayment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        createDoctorInfoStart: (inputData) => dispatch(actions.createDoctorInfoStart(inputData)),
        editDoctorInfoStart: (inputData) => dispatch(actions.editDoctorInfoStart(inputData)),
        fetchPriceStart: () => dispatch(actions.fetchPriceStart()),
        fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
        fetchPaymentStart: () => dispatch(actions.fetchPaymentStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
