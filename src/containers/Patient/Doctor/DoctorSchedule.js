import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
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
        //dữ liệu lấy từ Redux setState ở DidUpdate
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect();
            this.setState({
                allDays: dataSelect
            })
        }
        if (prevProps.arrDoctorScheduleRedux !== this.props.arrDoctorScheduleRedux) {
            this.setState({
                arrDoctorSchedule: this.props.arrDoctorScheduleRedux
            })
        }
    }

    buildDataInputSelect = () => {
        let result = [];
        let { language } = this.props;

        for (let i = 0; i < 7; i++) {
            let obj = {};
            let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM'); //hiện thứ bằng tiếng việt
            let labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');

            obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
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
        let { allDays, arrDoctorSchedule } = this.state;
        console.log('check arrDoctorSchedule: ', arrDoctorSchedule)

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
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
