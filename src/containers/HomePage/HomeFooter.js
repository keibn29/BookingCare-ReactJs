import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss'
import Fanpage from '../Patient/SocialPlugin/Fanpage';

class HomeFooter extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let { isShowFanpage } = this.props;
        let fanpage = "https://www.facebook.com/ktqdNEU"

        return (
            <div className='home-footer-container'>
                {
                    isShowFanpage === true
                        ?
                        <>
                            <div className='ft-content-top py-3'>
                                <div className='ft-content-left'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='td-left'><FormattedMessage id='homepage.student' /></td>
                                                <td><FormattedMessage id='homepage.name' /></td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'><FormattedMessage id='homepage.specialization' /></td>
                                                <td><FormattedMessage id='homepage.computer-science' /></td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'><FormattedMessage id='homepage.school' /></td>
                                                <td><FormattedMessage id='homepage.neu' /></td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'><FormattedMessage id='homepage.address' /></td>
                                                <td>207 - Giải Phóng - Hà Nội</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='ft-content-right'>
                                    <Fanpage
                                        dataHref={fanpage}
                                        width={'500'}
                                    />
                                </div>
                            </div>
                            <div className='ft-content-bottom py-2'>
                                <p>&copy; 2022 <FormattedMessage id='homepage.name' />. <FormattedMessage id='homepage.note-left' /> <a href='https://www.facebook.com/keibn29/' target='_blank'>Facebook</a> <FormattedMessage id='homepage.note-right' />.</p>
                            </div>
                        </>
                        :
                        <div className='ft-content-bottom py-2'>
                            <p>&copy; 2022 <FormattedMessage id='homepage.name' />. <FormattedMessage id='homepage.note-left' /> <a href='https://www.facebook.com/keibn29/' target='_blank'>Facebook</a> <FormattedMessage id='homepage.note-right' />.</p>
                        </div>
                }
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
