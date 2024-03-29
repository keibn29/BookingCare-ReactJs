import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi' //sử dụng moment tiếng việt 
import BookingModal from './Modal/BookingModal';
import { getScheduleByDate } from '../../../services/userService';
import { toast } from 'react-toastify';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            arrDoctorSchedule: [],
            isOpenBookingModal: false,
            scheduleTimeModal: {},
        }
    }

    async componentDidMount() {
        let dataSelect = this.buildDataInputSelect();
        //dữ liệu tạo ra ngay trong component setState ở DidMount
        this.setState({
            allDays: dataSelect
        })
        let { doctorId } = this.props;
        console.log('doctorId: ', doctorId)
        if (doctorId) {
            let res = await getScheduleByDate(doctorId, dataSelect[0].value)
            this.setState({
                arrDoctorSchedule: res && res.errCode === 0 ? res.schedule : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        //dữ liệu lấy từ Redux setState ở DidUpdate (language)
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect();
            this.setState({
                allDays: dataSelect
            })
        }
        //dữ liệu lấy từ component cha (DoctorInfo)
        if (prevProps.doctorId !== this.props.doctorId) {
            let dataSelect = this.buildDataInputSelect();
            let { doctorId } = this.props;
            if (doctorId) {
                let res = await getScheduleByDate(doctorId, dataSelect[0].value)
                this.setState({
                    arrDoctorSchedule: res && res.errCode === 0 ? res.schedule : []
                })
            }
        }
    }

    //viết hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildDataInputSelect = () => {
        let result = [];
        let { language } = this.props;

        for (let i = 0; i < 7; i++) {
            let obj = {};
            let labelViToday = `Hôm nay - ${moment(new Date()).format('DD/MM')}`; //hiện string 'Hôm nay'
            let labelViNext = moment(new Date()).add(i, 'days').format('dddd - DD/MM'); //hiện thứ bằng tiếng việt
            let labelEnToday = `Today - ${moment(new Date()).locale('en').format('DD/MM')}`;
            let labelEnNext = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');

            let labelVi = i === 0 ? labelViToday : labelViNext;
            let labelEn = i === 0 ? labelEnToday : labelEnNext;

            obj.label = language === LANGUAGES.VI ? this.capitalizeFirstLetter(labelVi) : labelEn;
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //startOf('day): 00:00:00
            result.push(obj);
        }
        return result;
    }

    handleOnChangeDate = async (event) => {
        //api
        if (this.props.doctorId) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    arrDoctorSchedule: res.schedule
                })
            } else {
                toast.error('fetch schedule failed!')
            }
        }
    }

    toggleBookingModal = () => {
        this.setState({
            isOpenBookingModal: !this.state.isOpenBookingModal
        })
    }

    handleBookingSchedule = (time) => {
        this.setState({
            isOpenBookingModal: true,
            scheduleTimeModal: time
        })
    }

    render() {
        let { language } = this.props;
        let { allDays, arrDoctorSchedule } = this.state;

        console.log('check arrDoctorSchedule: ', arrDoctorSchedule)

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            className='select-date'
                            onChange={(event) => {
                                this.handleOnChangeDate(event);
                            }}
                        >
                            {
                                allDays && allDays.length > 0 && allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-time'>
                        <div className='calendar-text'>
                            <span><i className='fas fa-calendar-alt'></i><FormattedMessage id='patient.doctor.schedule-calendar' /></span>
                        </div>
                        <div className='time-content'>
                            {
                                arrDoctorSchedule && arrDoctorSchedule.length > 0
                                    ?
                                    <>
                                        <div className='available-time'>
                                            {
                                                arrDoctorSchedule.map((item, index) => {

                                                    return (

                                                        < button
                                                            key={index}
                                                            className={language === LANGUAGES.VI ? 'btn btn-timeVi' : 'btn btn-timeEn'}
                                                            onClick={() => {
                                                                this.handleBookingSchedule(item)
                                                            }}
                                                        >
                                                            {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='book-free'>
                                            <span><FormattedMessage id='patient.doctor.choose' /> <i className='far fa-hand-point-up'></i> <FormattedMessage id='patient.doctor.and-book-free' /></span>
                                        </div>
                                    </>
                                    :
                                    <div className='no-schedule'>
                                        <FormattedMessage id='patient.doctor.no-schedule' />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <BookingModal
                        isOpen={this.state.isOpenBookingModal}
                        dataTime={this.state.scheduleTimeModal}
                        toggle={this.toggleBookingModal}
                    />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
