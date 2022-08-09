import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { toast } from 'react-toastify';
import { getDetailHandbook } from '../../../services/userService';
import _ from 'lodash';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailHandbook: {}
        }
    }

    async componentDidMount() {
        await this.fetchDetailHandbook();
    }

    fetchDetailHandbook = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let handbookId = this.props.match.params.id
            let res = await getDetailHandbook(handbookId)
            if (res && res.errCode === 0) {
                this.setState({
                    detailHandbook: res.detailHandbook
                })
            } else {
                console.log(res.errMessage)
                toast.error('fetch handbook error!')
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { language } = this.props;
        let { detailHandbook } = this.state;

        console.log('check detailHandbook: ', this.state.detailHandbook)

        return (
            <>
                <div className='detail-handbook-container'>
                    <div>
                        <HomeHeader
                            isShowBanner={false}
                        />
                        <div className='detail-handbook-body container'>
                            <div className='handbook-title row'>
                                {
                                    detailHandbook && !_.isEmpty(detailHandbook) &&
                                    <>
                                        {language === LANGUAGES.VI ? detailHandbook.titleVi : detailHandbook.titleEn}
                                    </>
                                }
                            </div>
                            {
                                detailHandbook && detailHandbook.image &&
                                <div
                                    className='handbook-image row'
                                    style={
                                        { backgroundImage: `url(${detailHandbook.image})` }
                                    }
                                ></div>
                            }
                            <div className='handbook-desciption row'>
                                <div className='description-content'>
                                    {
                                        detailHandbook && detailHandbook.descriptionHTML &&
                                        <div dangerouslySetInnerHTML={{ __html: detailHandbook.descriptionHTML }}></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <HomeFooter
                            isShowFanpage={false}
                        />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
