import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInfor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';

class AllDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctor: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            this.setState({
                allDoctor: this.props.allDoctorRedux
            })
        }
    }

    render() {
        let { allDoctor } = this.state;
        let { language } = this.props;

        console.log('check allDoctor: ', allDoctor)

        return (
            <>
                <div className='more-infor-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='more-infor-body container px-0'>
                        <div className='more-infor-title'><FormattedMessage id='patient.more-infor.all-doctor' /></div>
                        {
                            allDoctor && allDoctor.length > 0 && allDoctor.map((item, index) => {
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                                return (
                                    <Link to={`/doctor-info/${item.id}`}>
                                        <div className='more-infor-content py-2' key={index}>
                                            <div
                                                className='mi-content-left avatar-doctor'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='mi-content-right'>
                                                <div className='name-item doctor-name'>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>
                                                <div className='description'>
                                                    {
                                                        item.Doctor && item.Doctor.specialtyData &&
                                                        <>
                                                            {language === LANGUAGES.VI ? item.Doctor.specialtyData.nameVi : item.Doctor.specialtyData.nameEn}
                                                        </>
                                                    }
                                                </div>
                                                <div className='description'>
                                                    {
                                                        item.Doctor && item.Doctor.clinicData &&
                                                        <>
                                                            {language === LANGUAGES.VI ? item.Doctor.clinicData.nameVi : item.Doctor.clinicData.nameEn}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
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
        allDoctorRedux: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
