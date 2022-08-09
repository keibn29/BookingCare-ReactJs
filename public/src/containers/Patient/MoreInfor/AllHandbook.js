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
            allHandbook: []
        }
    }

    componentDidMount() {
        this.props.fetchAllHandbookStart('ALL');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allHandbookRedux !== this.props.allHandbookRedux) {
            this.setState({
                allHandbook: this.props.allHandbookRedux
            })
        }
    }

    render() {
        let { allHandbook } = this.state;
        let { language } = this.props;

        console.log('check allHandbook: ', allHandbook)

        return (
            <>
                <div className='more-infor-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='more-infor-body container px-0'>
                        <div className='more-infor-title'>Tất cả bệnh viện, phòng khám</div>
                        {
                            allHandbook && allHandbook.length > 0 && allHandbook.map((item, index) => {
                                return (
                                    <Link to={`/detail-hanbook/${item.id}`}>
                                        <div className='more-infor-content py-2' key={index}>
                                            <div
                                                className='mi-content-left'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='mi-content-right'>
                                                <div className='name-item handbook-name'>
                                                    {language === LANGUAGES.VI ? item.titleVi : item.titleEn}
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
        allHandbookRedux: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandbookStart: (limit) => dispatch(actions.fetchAllHandbookStart(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllHandbook);
