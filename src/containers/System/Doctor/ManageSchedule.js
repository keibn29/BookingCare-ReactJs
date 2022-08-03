import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import { dateFormat, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; //format date
import { toast } from 'react-toastify';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: '',
            currentDate: moment(new Date()).startOf('day').valueOf(), //startOf('day): 00:00:00,
            arrTime: [],
            // scheduleTime: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.fetchTimeStart();
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
        if (prevProps.arrTimeRedux !== this.props.arrTimeRedux) {
            let arrTimeRedux = this.props.arrTimeRedux

            //hiệu ứng chọn button - vid73 - thêm 1 trường mới (isSelected)
            if (arrTimeRedux && arrTimeRedux.length > 0) {
                arrTimeRedux = arrTimeRedux.map((item) => ({ ...item, isSelected: false }))
            }
            console.log('check arrTimeRedux: ', arrTimeRedux)
            this.setState({
                arrTime: arrTimeRedux
            })
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

    handleChangeSelect = (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })

        //react-select-is-special
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnSchedule = (time) => {
        //setState cho 1 trường(isSelected) của this.state.arrTime - vid73
        let { arrTime } = this.state;
        if (arrTime && arrTime.length > 0) {
            arrTime = arrTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
            this.setState({
                arrTime: arrTime
            })
        }
        //note: nếu gán trực tiếp time(time.isSelected = !time.isSelected) thì không setState được! 
        //(mục tiêu của function là setState)
    }

    handleSaveSchedule = () => {
        let { arrTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!selectedDoctor) {
            toast.error('Missing Doctor!')
            return;
        }
        if (!currentDate) {
            toast.error('Missing Date!')
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER) //covert to DD/MM/YYYY(string)
        let formatedDate = new Date(currentDate).getTime(); //convert to timestamp
        if (arrTime && arrTime.length > 0) {
            let selectedTime = arrTime.filter((item) => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.timeType = time.keyMap;
                    result.push(obj)
                })
            } else {
                toast.error('Invalid selected time!');
                return;
            }
        }
        this.props.bulkCreateScheduleStart({
            result,
            doctorId: selectedDoctor.value, //compare vs DB
            date: formatedDate  //compare vs DB
        });
        console.log('check result: ', result)
    }

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const { isLoggedIn, language } = this.props;
        let { allDoctors, selectedDoctor, currentDate, arrTime } = this.state;
        console.log('check arrTime: ', arrTime)

        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='title'><FormattedMessage id='manage-schedule.title' /></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group col-6'>
                                <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                                <Select
                                    value={selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={allDoctors}
                                />
                            </div>
                            <div className='form-group col-6'>
                                <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDatePicker}
                                    value={currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='pick-hour-container col-12'>
                                {
                                    arrTime && arrTime.length && arrTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === false ? 'btn btn-schedule' : 'btn btn-schedule active'}
                                                key={index}
                                                onClick={() => {
                                                    this.handleClickBtnSchedule(item)
                                                }}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='save-schedule col-12'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => {
                                        this.handleSaveSchedule();
                                    }}
                                ><FormattedMessage id='manage-schedule.save' /></button>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        AllDoctorsRedux: state.admin.allDoctors,
        arrTimeRedux: state.admin.arrTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchTimeStart: () => dispatch(actions.fetchTimeStart()),
        bulkCreateScheduleStart: (scheduleInput) => dispatch(actions.bulkCreateScheduleStart(scheduleInput))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
