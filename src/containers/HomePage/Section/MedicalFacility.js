import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getTopClinicHomepage } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topClinic: [],
        }
    }

    async componentDidMount() {
        await this.fetchTopClinicHomepage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    fetchTopClinicHomepage = async () => {
        let res = await getTopClinicHomepage();
        if (res && res.errCode === 0) {
            this.setState({
                topClinic: res.topClinic
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    handleViewMoreClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/more/clinic`)
        }
    }


    render() {
        let { topClinic } = this.state;
        let { language } = this.props;

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container container px-0'>
                    <div className='section-header'>
                        <span className='title-header'><FormattedMessage id='homepage.medical-facility' /></span>
                        <button
                            className='btn-header'
                            onClick={() => {
                                this.handleViewMoreClinic()
                            }}>
                            <FormattedMessage id='homepage.more' />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                topClinic && topClinic.length > 0 && topClinic.map((item, index) => {
                                    return (
                                        <div
                                            className='section-custom'
                                            key={index}
                                            onClick={() => {
                                                this.handleViewDetailClinic(item)
                                            }}
                                        >
                                            <div
                                                className='bg-img section-specialty'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='name'>
                                                {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
