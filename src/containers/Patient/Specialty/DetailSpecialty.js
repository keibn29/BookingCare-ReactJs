import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfoExtra from '../Doctor/DoctorInfoExtra';
import DoctorInfoGeneral from '../Doctor/DoctorInfoGeneral';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailSpecialty: [],
            arrDoctorId: [10]
        }
    }

    componentDidMount() {
        // if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //     let specialtyId = this.props.match.params.id
        //     this.props.fetchDoctorInfoStart(specialtyId);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { arrDoctorId } = this.state;

        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='detail-specialty-body container'>
                        <div className='specialty-description row'>

                        </div>
                        <div className='list-doctor row'>
                            {
                                arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                                    return (
                                        <div className='each-doctor' key={index}>
                                            <div className='doctor-content-left'>
                                                <div className='doctor-info'>
                                                    <DoctorInfoGeneral
                                                        doctorId={item}
                                                        isShowDescription={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className='doctor-content-right'>
                                                <div className='doctor-schedule'>
                                                    <DoctorSchedule
                                                        doctorId={item}
                                                    />
                                                </div>
                                                <div className='doctor-info-extra'>
                                                    <DoctorInfoExtra
                                                        doctorId={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
