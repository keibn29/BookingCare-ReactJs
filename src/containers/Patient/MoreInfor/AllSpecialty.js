import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInfor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';

class AllSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: []
        }
    }

    componentDidMount() {
        this.props.fetchAllSpecialtyStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
            this.setState({
                allSpecialty: this.props.allSpecialtyRedux
            })
        }
    }

    render() {
        let { allSpecialty } = this.state;
        let { language } = this.props;

        console.log('check allclinic: ', allSpecialty)

        return (
            <>
                <div className='more-infor-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='more-infor-body container px-0'>
                        <div className='more-infor-title'>Tất cả chuyên khoa</div>
                        {
                            allSpecialty && allSpecialty.length > 0 && allSpecialty.map((item, index) => {
                                return (
                                    <Link to={`/detail-specialty/${item.id}`}>
                                        <div className='more-infor-content py-2' key={index}>
                                            <div
                                                className='mi-content-left'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='mi-content-right'>
                                                <div className='name-item'>
                                                    {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
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
        allSpecialtyRedux: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
