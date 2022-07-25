import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi' //sử dụng moment tiếng việt 

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            arrDoctorSchedule: []
        }
    }

    componentDidMount() {
        let dataSelect = this.buildDataInputSelect();
        if (!dataSelect) {
            return;
        }
        //dữ liệu tạo ra ngay trong component setState ở DidMount
        this.setState({
            allDays: dataSelect
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
            this.setState({
                arrDoctorSchedule: this.props.fetchDoctorScheduleStart(this.props.doctorId, dataSelect[0].value)
            })
        }
        if (prevProps.arrDoctorScheduleRedux !== this.props.arrDoctorScheduleRedux) {
            this.setState({
                arrDoctorSchedule: this.props.arrDoctorScheduleRedux
            })
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
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            this.props.fetchDoctorScheduleStart(doctorId, date)
        }

        //setState
        // let { arrDoctorSchedule } = this.state;
        // if (arrDoctorSchedule && arrDoctorSchedule.length > 0) {
        //     arrDoctorSchedule = arrDoctorSchedule.map((item) => {
        //         if (item.id === this.props.doctorId && item.date === event.target.value) {
        //             item.id = !item.isSelected;
        //         }
        //         return item
        //     })
        //     this.setState({
        //         arrDoctorSchedule: arrDoctorSchedule
        //     })
        // }
    }

    render() {
        let { language } = this.props;
        let { allDays, arrDoctorSchedule } = this.state;
        // console.log('check arrDoctorSchedule: ', arrDoctorSchedule)

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
                                                        >
                                                            {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='book-free'>
                                            <span>Chọn <i className='far fa-hand-point-up'></i> và đặt lịch (miễn phí)</span>
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrDoctorScheduleRedux: state.admin.arrDoctorSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorScheduleStart: (doctorId, date) => dispatch(actions.fetchDoctorScheduleStart(doctorId, date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
