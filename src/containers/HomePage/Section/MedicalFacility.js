import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {



    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'>Cơ sở y tế nổi bật</span>
                        <button className='btn-header'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-medical-facility'></div>
                                <div className='name'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
