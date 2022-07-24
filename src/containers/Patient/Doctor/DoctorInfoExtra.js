import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import './DoctorInfoExtra.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi' //sử dụng moment tiếng việt 

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
                        <div className='content-up-title'>ĐỊA CHỈ KHÁM</div>
                        <div>
                            {
                                arrDoctorInfoExtra && arrDoctorInfoExtra.nameClinic &&
                                <>
                                    {arrDoctorInfoExtra.nameClinic}
                                </>

                            }
                        </div>
                        <div>
                            {
                                arrDoctorInfoExtra && arrDoctorInfoExtra.addressClinic &&
                                <>
                                    {arrDoctorInfoExtra.addressClinic}
                                </>

                            }
                        </div>
                    </div>
                    <div className='content-down'>
                        {
                            isShowDetailPrice ?
                                <>
                                    <div>GIÁ KHÁM</div>
                                    <div className='detail-price'>
                                        <div className='up'>
                                            <table>
                                                <tr>
                                                    <td>Giá khám</td>
                                                    <td className='td-price'>250.000<sup>đ</sup></td>
                                                </tr>
                                                <tr>
                                                    <td className='td-detail'>Được ưu tiên khám trước khi đặt khám qua BookingCare</td>
                                                </tr>
                                                <tr>
                                                    <td className='td-detail'>Giá khám cho người nước ngoài là 30USD</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='down'>Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>
                                    </div>
                                </>
                                :
                                <div>GIÁ KHÁM: 250.000<sup>đ</sup></div>
                        }
                        <div className='show-hide-detail-price'>
                            <span
                                onClick={() => {
                                    this.handleShowHideDetailPrice()
                                }}>
                                {
                                    isShowDetailPrice ? <>Ẩn bảng giá</> : <>Xem chi tiết</>
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
