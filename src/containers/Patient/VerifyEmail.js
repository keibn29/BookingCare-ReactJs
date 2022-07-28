import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './VerifyEmail.scss';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils';
import { verifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: -1
        }
    }

    async componentDidMount() {
        await this.handleVerifyEmail();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleVerifyEmail = async () => {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let doctorId = urlParams.get('doctorId');
            let token = urlParams.get('token');

            let res = await verifyBookAppointment(doctorId, token)
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            if (res && res.errCode !== 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='status-verify-container container'>
                    {
                        statusVerify === false
                            ?
                            <div className='status-verify-false row'><FormattedMessage id='patient.loading' /></div>
                            :
                            <div className='status-verify-true row'>
                                {
                                    errCode === 0
                                        ?
                                        <>
                                            <div className='icon icon-success'></div>
                                            <div className='text'><FormattedMessage id='patient.success' /></div>
                                        </>
                                        :
                                        <>
                                            <div className='icon icon-failed'></div>
                                            <div className='text'><FormattedMessage id='patient.failed' /></div>
                                        </>
                                }
                            </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
