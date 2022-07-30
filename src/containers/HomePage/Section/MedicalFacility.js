import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getTopClinicHomepage } from '../../../services/userService';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topClinic: [],
        }
    }

    async componentDidMount() {
        await this.fetchTopClinicHomepage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    fetchTopClinicHomepage = async () => {
        let res = await getTopClinicHomepage(10);
        if (res && res.errCode === 0) {
            this.setState({
                topClinic: res.topClinic
            })
        }
    }


    render() {
        let { topClinic } = this.state;
        let { language } = this.props;

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'>Cơ sở y tế nổi bật</span>
                        <button className='btn-header'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                topClinic && topClinic.length > 0 && topClinic.map((item, index) => {
                                    return (
                                        <div
                                            className='section-custom'
                                            key={index}
                                        >
                                            <div
                                                className='bg-img section-specialty'
                                                style={
                                                    { backgroundImage: `url(${item.image})` }
                                                }
                                            ></div>
                                            <div className='name'>
                                                {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
