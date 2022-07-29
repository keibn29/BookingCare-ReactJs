import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getTopSpecialty } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topSpecialty: [],
        }
    }

    async componentDidMount() {
        await this.fetchTopSpecialty();
    }

    fetchTopSpecialty = async () => {
        let res = await getTopSpecialty(10);
        if (res && res.errCode === 0) {
            this.setState({
                topSpecialty: res.topSpecialty
            })
        }
    }

    render() {
        let { topSpecialty } = this.state;
        let { language } = this.props;
        console.log('check state: ', topSpecialty)

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'><FormattedMessage id='homepage.specialty-popular' /></span>
                        <button className='btn-header'><FormattedMessage id='homepage.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                topSpecialty && topSpecialty.length > 0 && topSpecialty.map((item, index) => {
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
