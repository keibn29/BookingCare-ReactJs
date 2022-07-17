import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss'

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='title'><FormattedMessage id='manage-schedule.title' /></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
