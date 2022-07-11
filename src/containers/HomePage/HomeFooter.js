import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss'

class HomeFooter extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <div className='home-footer-container'>
                <div className='home-footer-content'>
                    <p>&copy; 2022 Nguyễn Đức Long. Ghé thăm <a href='https://www.facebook.com/keibn29/' target='_blank'>Facebook</a> của tôi để nhận thêm thông tin.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
