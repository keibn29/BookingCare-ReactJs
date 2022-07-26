import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorInfoGeneral.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getDoctorInfoGeneral } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorInfoGeneral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            generalInfo: []
        }
    }

    async componentDidMount() {
        let dataInfo = await this.fetchDoctorInfoGeneral()
        this.setState({
            generalInfo: dataInfo
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let dataInfo = await this.fetchDoctorInfoGeneral()
            this.setState({
                generalInfo: dataInfo
            })
        }
    }

    fetchDoctorInfoGeneral = async () => {
        let doctorId = this.props.doctorId
        let result = {}
        if (doctorId) {
            let res = await getDoctorInfoGeneral(doctorId);
            if (res && res.errCode === 0) {
                result = res.infoGeneral
            }
        }
        return result;
    }


    render() {
        let { generalInfo } = this.state;
        let { language, isShowDescription, dataTime } = this.props;
        let nameVi = '', nameEn = '';
        if (generalInfo && generalInfo.positionData) {
            nameVi = `${generalInfo.positionData.valueVi}, ${generalInfo.lastName} ${generalInfo.firstName}`;
            nameEn = `${generalInfo.positionData.valueEn}, ${generalInfo.firstName} ${generalInfo.lastName}`;
        }
        // console.log('check generalInfo: ', generalInfo)

        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='doctor-description'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${generalInfo && generalInfo.image ? generalInfo.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {
                                    isShowDescription === true
                                        ?
                                        <>
                                            {
                                                generalInfo && generalInfo.Markdown && generalInfo.Markdown.description &&
                                                <span>
                                                    {generalInfo.Markdown.description}
                                                </span>
                                            }
                                        </>
                                        :
                                        <>
                                            {/* {
                                                dataTime && dataTime
                                            } */}
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='price'>
                        <span>Giá khám:</span>
                        {
                            generalInfo && generalInfo.Doctor && generalInfo.Doctor.priceData && language === LANGUAGES.VI
                            &&
                            <NumberFormat
                                value={generalInfo.Doctor.priceData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        }
                        {
                            generalInfo && generalInfo.Doctor && generalInfo.Doctor.priceData && language === LANGUAGES.EN
                            &&
                            <NumberFormat
                                value={generalInfo.Doctor.priceData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoGeneral);
