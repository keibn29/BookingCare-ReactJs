import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorsStart();
    }

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                topDoctors: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDoctorInfo = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/doctor-info/${doctor.id}`)
        }
    }

    render() {
        console.log('kei check props doctors: ', this.props.topDoctorsRedux)
        let topDoctors = this.state.topDoctors;
        let { language } = this.props;

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'><FormattedMessage id='homepage.outstanding-doctor' /></span>
                        <button className='btn-header'><FormattedMessage id='homepage.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                topDoctors && topDoctors.length > 0 && topDoctors.map((item, index) => {
                                    //decode
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                                    return (
                                        <div
                                            className='section-custom section-outstanding-doctor'
                                            key={index}
                                            onClick={() => {
                                                this.handleViewDoctorInfo(item)
                                            }}
                                        >
                                            <div className='outer-border'>
                                                <div className='outer-bg'>
                                                    <div
                                                        className='bg-img'
                                                        style={
                                                            { backgroundImage: `url(${imageBase64})` }
                                                        }
                                                    >
                                                    </div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>
                                                        {language === LANGUAGES.VI ? nameVi : nameEn}
                                                    </div>
                                                    <div>Tai M??i H???ng 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorsStart: () => dispatch(actions.fetchTopDoctorsStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
