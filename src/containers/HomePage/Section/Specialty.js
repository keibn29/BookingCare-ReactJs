import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Specialty extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'>Chuyên khoa phổ biến</span>
                        <button className='btn-header'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 6</div>
                            </div>
                            <div className='section-custom'>
                                <div className='bg-img section-specialty'></div>
                                <div>Cơ xương khớp 7</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
