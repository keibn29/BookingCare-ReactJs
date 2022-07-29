import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class HandBook extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'>Cẩm nang</span>
                        <button className='btn-header'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>1 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>2 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>3 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>4 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>5 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>6 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
                            </div>
                            <div className='section-custom section-handbook'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='bg-text'>7 Review Top 7 Nha khoa Quận 3: Chi tiết ưu, nhược điểm</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
