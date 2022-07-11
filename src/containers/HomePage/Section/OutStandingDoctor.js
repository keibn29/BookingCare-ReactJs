import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-header'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 6</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custom section-outstanding-doctor'>
                                <div className='outer-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-img'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Nguyễn Đức Long</div>
                                        <div>Tai Mũi Họng 7</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
