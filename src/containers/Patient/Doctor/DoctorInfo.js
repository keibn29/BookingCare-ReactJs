import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorInfo.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorInfoExtra from './DoctorInfoExtra';
import LikeShare from '../SocialPlugin/LikeShare';
import Comment from '../SocialPlugin/Comment';
import HomeFooter from '../../HomePage/HomeFooter';

class DoctorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrdoctorInfo: [],
            currentDoctorId: ''
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id
            this.props.fetchDoctorInfoStart(doctorId);
            this.setState({
                currentDoctorId: doctorId
            })
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
        let { language } = this.props;
        let { arrdoctorInfo, currentDoctorId } = this.state;
        let nameVi = '';
        let nameEn = '';
        if (arrdoctorInfo && arrdoctorInfo.positionData) {
            nameVi = `${arrdoctorInfo.positionData.valueVi}, ${arrdoctorInfo.lastName} ${arrdoctorInfo.firstName}`;
            nameEn = `${arrdoctorInfo.positionData.valueEn}, ${arrdoctorInfo.firstName} ${arrdoctorInfo.lastName}`;
        }

        let currentURL = window.location.href;

        return (
            <>
                <div className='doctor-info-container'>
                    <div>
                        <HomeHeader
                            isShowBanner={false}
                        />
                        <div className='content-top'>
                            <div className='container px-0'>
                                <div className='doctor-description'>
                                    <div
                                        className='content-left'
                                        style={{ backgroundImage: `url(${arrdoctorInfo && arrdoctorInfo.image ? arrdoctorInfo.image : ''})` }}
                                    >
                                    </div>
                                    <div className='content-right'>
                                        <div className='up'>
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </div>
                                        <div className='down'>
                                            {
                                                arrdoctorInfo && arrdoctorInfo.Markdown && arrdoctorInfo.Markdown.description &&
                                                <span>
                                                    {arrdoctorInfo.Markdown.description}
                                                </span>
                                            }
                                            <div className='like-share-plugin'>
                                                <LikeShare
                                                    dataHref={currentURL}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='doctor-schedule'>
                                    <div className='content-left'>
                                        <DoctorSchedule
                                            doctorId={currentDoctorId}
                                        />
                                    </div>
                                    <div className='content-right'>
                                        <DoctorInfoExtra
                                            doctorId={currentDoctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-bottom'>
                            <div className='container px-1'>
                                <div className='doctor-detail-info'>
                                    {
                                        arrdoctorInfo && arrdoctorInfo.Markdown && arrdoctorInfo.Markdown.contentHTML &&
                                        <div dangerouslySetInnerHTML={{ __html: arrdoctorInfo.Markdown.contentHTML }}></div>
                                    }
                                </div>
                                <div className='doctor-comment'>
                                    <Comment
                                        dataHref={currentURL}
                                        width={'100%'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <HomeFooter
                            isShowFanpage={false}
                        />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrdoctorInfoRedux: state.admin.arrdoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorInfoStart: (doctorId) => dispatch(actions.fetchDoctorInfoStart(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
