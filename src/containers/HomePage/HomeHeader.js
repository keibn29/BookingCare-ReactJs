import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    handleReturnHomepage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content container px-0'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div
                                className='header-logo'
                                onClick={() => {
                                    this.handleReturnHomepage();
                                }}
                            ></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.specialty' /></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.heath-facility' /></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.doctor' /></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.fee' /></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.check-heal' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id='home-header.support' /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => {
                                this.changeLanguage(LANGUAGES.VI)
                            }}>VI</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => {
                                this.changeLanguage(LANGUAGES.EN)
                            }}>EN</span></div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-top'>
                            <div className='title1'><FormattedMessage id='banner.title1' /></div>
                            <div className='title2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder={language === LANGUAGES.VI ? 'Tìm chuyên khoa khám bệnh' : 'Find a medical specialty'} />
                            </div>
                        </div>
                        <div className='content-bottom'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option1' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option2' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option3' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-vial"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option4' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option5' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-smile"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option6' /></div>
                                </div>
                                <div className='option-child hide-child'>
                                    <div className='icon-child'><i className="fas fa-archive"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option7' /></div>
                                </div>
                                <div className='option-child hide-child'>
                                    <div className='icon-child'><i className="fas fa-ambulance"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.option8' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
