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
                                                <td>Sinh viên</td>
                                                <td>Nguyễn Đức Long</td>
                                            </tr>
                                            <tr>
                                                <td className='td-left'>Chuyên ngành</td>
                                                <td>Khoa học máy tính</td>
                                            </tr>
                                            <tr>
                                                <td>Trường</td>
                                                <td>Đại học Kinh tế Quốc dân</td>
                                            </tr>
                                            <tr>
                                                <td>Địa chỉ</td>
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
                                <p>&copy; 2022 Nguyễn Đức Long. Ghé thăm <a href='https://www.facebook.com/keibn29/' target='_blank'>Facebook</a> của tôi để nhận thêm thông tin.</p>
                            </div>
                        </>
                        :
                        <div className='ft-content-bottom py-2'>
                            <p>&copy; 2022 Nguyễn Đức Long. Ghé thăm <a href='https://www.facebook.com/keibn29/' target='_blank'>Facebook</a> của tôi để nhận thêm thông tin.</p>
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
