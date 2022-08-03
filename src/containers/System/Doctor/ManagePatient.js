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

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(), //startOf('day): 00:00:00,
            allPatient: []
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

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { allPatient, currentDate } = this.state;
        let { language } = this.props;
        console.log('check allPatient: ', allPatient)

        return (
            <>
                <div className='manage-patient-container'>
                    <div className='title'>Manane Patient</div>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label>Choose date</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDatePicker}
                                    value={currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='list-patient col-12'>
                                <div>List patient</div>
                                <table id='table-manage-patient' className='mb-5'>
                                    <tr>
                                        <th>STT</th>
                                        <th>Time</th>
                                        <th>Name</th>
                                        <th>Phonenumber</th>
                                        <th>Address</th>
                                        <th>Gender</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        allPatient && allPatient.length > 0 && allPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {
                                                            item.bookingData[0] && item.bookingData[0].timeBooking
                                                            && language === LANGUAGES.VI
                                                            &&
                                                            item.bookingData[0].timeBooking.valueVi
                                                        }
                                                        {
                                                            item.bookingData[0] && item.bookingData[0].timeBooking
                                                            && language === LANGUAGES.EN
                                                            &&
                                                            item.bookingData[0].timeBooking.valueEn
                                                        }
                                                    </td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.phonenumber}</td>
                                                    <td>{item.address}</td>
                                                    <td>
                                                        {language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}
                                                    </td>
                                                    <td>{item.bookingData[0].reason}</td>
                                                    <td>
                                                        <button
                                                            className='btn btn-primary mr-2'
                                                        >
                                                            Xác nhận
                                                        </button>
                                                        <button
                                                            className='btn btn-warning'
                                                        >
                                                            Gửi hóa đơn
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table >
                            </div>
                        </div>
                    </div>
                </div>
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
