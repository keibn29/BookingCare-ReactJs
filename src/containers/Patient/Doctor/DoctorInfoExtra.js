import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorInfoExtra.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

class DoctorInfoExtra extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailPrice: false,
            arrDoctorInfoExtra: []
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrDoctorInfoExtraRedux !== this.props.arrDoctorInfoExtraRedux) {
            this.setState({
                arrDoctorInfoExtra: this.props.arrDoctorInfoExtraRedux
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let { doctorId } = this.props;
            this.setState({
                arrDoctorInfoExtra: this.props.fetchDoctorInfoExtraStart(doctorId)
            })
        }
    }

    handleShowHideDetailPrice = () => {
        this.setState({
            isShowDetailPrice: !this.state.isShowDetailPrice
        })
    }


    render() {
        let { language } = this.props;
        let { isShowDetailPrice, arrDoctorInfoExtra } = this.state;

        console.log('check arrDoctorInfoExtra: ', arrDoctorInfoExtra)
        return (
            <>
                <div className='doctor-info-extra-container'>
                    <div className='content-up'>
                        <div className='content-up-title'><FormattedMessage id='patient.doctor.address-clinic' /></div>
                        <div>
                            {arrDoctorInfoExtra && arrDoctorInfoExtra.nameClinic ? arrDoctorInfoExtra.nameClinic : ''}
                        </div>
                        <div>
                            {arrDoctorInfoExtra && arrDoctorInfoExtra.addressClinic ? arrDoctorInfoExtra.addressClinic : ''}
                        </div>
                    </div>
                    <div className='content-down'>
                        {
                            isShowDetailPrice ?
                                <>
                                    <div className='content-down-title'><FormattedMessage id='patient.doctor.price' /></div>
                                    <div className='detail-price'>
                                        <div className='up'>
                                            <table>
                                                <tr>
                                                    <td><FormattedMessage id='patient.doctor.price' /></td>
                                                    <td className='td-price'>
                                                        {
                                                            arrDoctorInfoExtra && arrDoctorInfoExtra.priceData && language === LANGUAGES.VI
                                                            &&
                                                            <NumberFormat
                                                                value={arrDoctorInfoExtra.priceData.valueVi}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        }
                                                        {
                                                            arrDoctorInfoExtra && arrDoctorInfoExtra.priceData && language === LANGUAGES.EN
                                                            &&
                                                            <NumberFormat
                                                                value={arrDoctorInfoExtra.priceData.valueEn}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'$'}
                                                            />
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='td-detail'>
                                                        {arrDoctorInfoExtra && arrDoctorInfoExtra.note ? arrDoctorInfoExtra.note : ''}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='down'>
                                            <span className='method-payment-title'><FormattedMessage id='patient.doctor.method-payment-title' /></span>
                                            <span>
                                                {
                                                    arrDoctorInfoExtra && arrDoctorInfoExtra.paymentData
                                                    && language === LANGUAGES.VI && arrDoctorInfoExtra.paymentData.valueVi
                                                }
                                                {
                                                    arrDoctorInfoExtra && arrDoctorInfoExtra.paymentData
                                                    && language === LANGUAGES.EN && arrDoctorInfoExtra.paymentData.valueEn
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </>
                                :
                                <div>
                                    <span className='content-down-title'><FormattedMessage id='patient.doctor.price' />:</span>
                                    <span>
                                        {
                                            arrDoctorInfoExtra && arrDoctorInfoExtra.priceData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                value={arrDoctorInfoExtra.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'đ'}
                                            />
                                        }
                                        {
                                            arrDoctorInfoExtra && arrDoctorInfoExtra.priceData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                value={arrDoctorInfoExtra.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                        }
                        <div className='show-hide-detail-price'>
                            <span
                                onClick={() => {
                                    this.handleShowHideDetailPrice()
                                }}>
                                {
                                    isShowDetailPrice ? <><FormattedMessage id='patient.doctor.hide-detail-price' /></> : <><FormattedMessage id='patient.doctor.show-detail-price' /></>
                                }
                            </span>
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
        arrDoctorInfoExtraRedux: state.admin.arrDoctorInfoExtra
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorInfoExtraStart: (doctorId) => dispatch(actions.fetchDoctorInfoExtraStart(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoExtra);
