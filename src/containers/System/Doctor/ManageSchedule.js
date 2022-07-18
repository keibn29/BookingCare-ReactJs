import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; //format date

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: '',
            currentDate: '',
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

    render() {
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
                                    minDate={new Date}
                                />
                            </div>
                            <div className='pick-hour-container col-12'>
                                {
                                    arrTime && arrTime.length && arrTime.map((item, index) => {
                                        return (
                                            <button
                                                className='btn btn-schedule'
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='save-schedule col-12'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-schedule.save' /></button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
