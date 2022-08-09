import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AllClinic from '../containers/Patient/MoreInfor/AllClinic';
import AllDoctor from '../containers/Patient/MoreInfor/AllDoctor';
import AllHandbook from '../containers/Patient/MoreInfor/AllHandbook';
import AllSpecialty from '../containers/Patient/MoreInfor/AllSpecialty';

class MoreInfor extends Component {


    render() {

        return (
            <>
                < div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/more/clinic" component={AllClinic} />
                            <Route path="/more/specialty" component={AllSpecialty} />
                            <Route path="/more/doctor" component={AllDoctor} />
                            <Route path="/more/handbook" component={AllHandbook} />
                        </Switch>
                    </div>
                </div >
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfor);
