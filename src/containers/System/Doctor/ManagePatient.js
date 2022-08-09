import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientByDate } from '../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment'; //format date
import RemedyModal from './RemedyModal';
import { sendRemedy } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(), //startOf('day): 00:00:00,
            allPatient: [],
            isOpenRemedyModal: false,
            emailPatient: '',
            patientInfo: {},

            isShowLoading: false
        }
    }

    async componentDidMount() {
        await this.fetchAllPatientByDate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    fetchAllPatientByDate = async () => {
        let { currentDate } = this.state;
        let { userInfo } = this.props;
        let doctorId = userInfo.id;
        if (!currentDate) {
            toast.error('Missing Date!')
            return;
        }
        if (!doctorId) {
            toast.error('Missing Doctor!')
            return;
        }

        let formatedDate = new Date(currentDate).getTime(); //convert to timestamp

        let res = await getAllPatientByDate(doctorId, formatedDate)
        if (res && res.errCode === 0) {
            this.setState({
                allPatient: res.allPatient
            })
        } else {
            toast.error('fetch all patient failed!')
        }
    }

    handleChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        })
        await this.fetchAllPatientByDate();
    }

    handleConfirmRemedy = (patient) => {
        this.setState({
            isOpenRemedyModal: true,
            emailPatient: patient.patientData.email,
            patientInfo: patient
        })
    }

    toggleRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: !this.state.isOpenRemedyModal
        })
    }

    sendRemedy = async (dataChild) => {
        this.setState({
            isShowLoading: true
        })
        let { language, userInfo } = this.props;
        let { patientInfo, currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime(); //convert to timestamp

        let res = await sendRemedy({
            email: dataChild.email,
            image: dataChild.image,
            doctorId: userInfo.id,
            firstName: patientInfo.patientData.firstName,
            patientId: patientInfo.patientId,
            date: formatedDate,
            timeType: patientInfo.timeType,
            language: language
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            this.toggleRemedyModal();
            toast.success('Send remedy succeed!')
            await this.fetchAllPatientByDate();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error(res.errMessage)
        }
    }

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { allPatient, currentDate, isShowLoading } = this.state;
        let { language } = this.props;

        console.log('check patientInfo: ', this.state.patientInfo)

        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                >
                </LoadingOverlay>
                <div className='manage-patient-container'>
                    <div className='title'><FormattedMessage id='system.doctor.manage-patient' /></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label><FormattedMessage id='system.doctor.choose-date' /></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDatePicker}
                                    value={currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='list-patient col-12'>
                                <div><FormattedMessage id='system.doctor.list-patient' /></div>
                                <table id='table-manage-patient' className='mb-5'>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id='system.doctor.stt' /></th>
                                            <th><FormattedMessage id='system.doctor.time' /></th>
                                            <th><FormattedMessage id='system.doctor.name' /></th>
                                            <th><FormattedMessage id='system.doctor.phone' /></th>
                                            <th><FormattedMessage id='system.doctor.address' /></th>
                                            <th><FormattedMessage id='system.doctor.gender' /></th>
                                            <th><FormattedMessage id='system.doctor.reason' /></th>
                                            <th>Action</th>
                                        </tr>
                                        {
                                            allPatient && allPatient.length > 0 && allPatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {
                                                                language === LANGUAGES.VI ? item.timeBooking.valueVi : item.timeBooking.valueEn
                                                            }
                                                        </td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>
                                                            {
                                                                item.patientData && item.patientData.genderData && language === LANGUAGES.VI
                                                                &&
                                                                item.patientData.genderData.valueVi
                                                            }
                                                            {
                                                                item.patientData && item.patientData.genderData && language === LANGUAGES.EN
                                                                &&
                                                                item.patientData.genderData.valueEn
                                                            }
                                                        </td>
                                                        <td>{item.reason}</td>
                                                        <td>
                                                            <button
                                                                className='btn btn-primary mr-2'
                                                                onClick={() => {
                                                                    this.handleConfirmRemedy(item);
                                                                }}
                                                            >
                                                                <FormattedMessage id='system.doctor.done' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table >
                            </div>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpen={this.state.isOpenRemedyModal}
                    emailPatient={this.state.emailPatient}
                    sendRemedy={this.sendRemedy}
                    toggle={this.toggleRemedyModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
