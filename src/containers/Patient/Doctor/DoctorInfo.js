import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorInfo.scss';
import * as actions from '../../../store/actions';

class DoctorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrdoctorInfo: []
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id
            this.props.fetchDoctorInfoStart(doctorId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrdoctorInfoRedux !== this.props.arrdoctorInfoRedux) {
            this.setState({
                arrdoctorInfo: this.props.arrdoctorInfoRedux
            })
        }
    }

    render() {
        console.log('check state: ', this.state)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-info-container'>
                    <div className='doctor-description'>
                        <div className='content-left'>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                Bác sĩ Chuyên khoa II Trần Minh Khuyên
                            </div>
                            <div className='down'>
                                Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh
                                Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris)
                                Bác sĩ nhận khám từ 16 tuổi trở lên
                            </div>
                        </div>
                    </div>
                    <div className='doctor-schedule'>

                    </div>
                    <div className='doctor-detail-info'>

                    </div>
                    <div className='doctor-comment'>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        arrdoctorInfoRedux: state.admin.arrdoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorInfoStart: (doctorId) => dispatch(actions.fetchDoctorInfoStart(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
