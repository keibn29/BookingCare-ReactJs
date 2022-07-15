import React, { Component } from 'react';
import { connect } from "react-redux";

class DoctorInfo extends Component {
    render() {
        return (
            <div>Doctor Info</div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
