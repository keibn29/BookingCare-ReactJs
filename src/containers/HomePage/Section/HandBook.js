import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class HandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topHandbook: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllHandbookStart('TOP')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topHandbookRedux !== this.props.topHandbookRedux) {
            this.setState({
                topHandbook: this.props.topHandbookRedux
            })
        }
    }


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        let { topHandbook } = this.state;
        let { language } = this.props;

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-header'><FormattedMessage id='homepage.handbook' /></span>
                        <button className='btn-header'><FormattedMessage id='homepage.more' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {
                                topHandbook && topHandbook.length > 0 && topHandbook.map((item, index) => {
                                    return (
                                        <div className='section-custom section-handbook'>
                                            <div className='outer-bg'>
                                                <div
                                                    className='bg-img'
                                                    style={
                                                        { backgroundImage: `url(${item.image})` }
                                                    }
                                                ></div>
                                            </div>
                                            <div className='bg-text'>
                                                {language === LANGUAGES.VI ? item.titleVi : item.titleEn}
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
        language: state.app.language,
        topHandbookRedux: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandbookStart: (limit) => dispatch(actions.fetchAllHandbookStart(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
