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
            allDays: []
        }
    }

    componentDidMount() {
        let arrDays = this.buildDataInputSelect();
        if (!arrDays) {
            return;
        }
        this.setState({
            allDays: arrDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    buildDataInputSelect = () => {
        let result = [];


        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));

        for (let i = 0; i < 7; i++) {
            let obj = {};

            obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'); //hiện thứ bằng tiếng việt
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //startOf('day): 00:00:00
            result.push(obj);
        }
        return result;
    }

    render() {
        let { allDays } = this.state;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
