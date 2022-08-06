import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInfor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';

class AllHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allClinic: []
        }
    }

    componentDidMount() {
        this.props.fetchAllClinicStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinicRedux !== this.props.allClinicRedux) {
            this.setState({
                allClinic: this.props.allClinicRedux
            })
        }
    }

    render() {
        let { allClinic } = this.state;
        let { language } = this.props;

        console.log('check allclinic: ', allClinic)

        return (
            <>
                <div className='more-infor-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='more-infor-body container px-0'>
                        <div className='more-infor-title'>Tất cả bệnh viện, phòng khám</div>
                        {
                            allClinic && allClinic.length > 0 && allClinic.map((item, index) => {
                                return (
                                    <Link to={`/detail-clinic/${item.id}`}>
                                        <div className='more-infor-content py-2' key={index}>
                                            <div
                                                className='mi-content-left'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='mi-content-right'>
                                                <div>
                                                    {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                                </div>
                                                <div>
                                                    {item.address}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinicRedux: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinicStart: () => dispatch(actions.fetchAllClinicStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllHandbook);
