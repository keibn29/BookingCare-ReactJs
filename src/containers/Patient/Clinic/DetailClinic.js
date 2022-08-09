import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfoExtra from '../Doctor/DoctorInfoExtra';
import DoctorInfoGeneral from '../Doctor/DoctorInfoGeneral';
import { getClinicById } from '../../../services/userService';
import { toast } from 'react-toastify';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailClinic: [],
            allProvince: [],
        }
    }

    async componentDidMount() {
        this.props.fetchProvinceStart();
        await this.fetchDetailClinic('ALL');
    }

    fetchDetailClinic = async (location) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let clinicId = this.props.match.params.id
            let res = await getClinicById(clinicId, location)
            if (res && res.errCode === 0) {
                this.setState({
                    detailClinic: res.clinic
                })
            } else {
                toast.error('fetch clinic error!')
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProvinceRedux !== this.props.allProvinceRedux) {
            let { allProvinceRedux } = this.props;
            if (allProvinceRedux && allProvinceRedux.length > 0) {
                allProvinceRedux.unshift({
                    createdAt: null,
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueEn: 'Nationwide',
                    valueVi: 'Toàn quốc'
                })
                this.setState({
                    allProvince: this.props.allProvinceRedux
                })
            }
        }
    }

    handleChangeSelectedProvince = async (event) => {
        await this.fetchDetailClinic(event.target.value);
        console.log('check selectedProvince: ', event.target.value)
    }

    render() {
        let { detailClinic, allProvince } = this.state;
        let { language } = this.props;

        console.log('check detailClinic: ', detailClinic)

        return (
            <>
                <div className='detail-clinic-container'>
                    <div>
                        <HomeHeader
                            isShowBanner={false}
                        />
                        <div className='detail-clinic-body'>
                            <div className='clinic-content-top'>
                                <div className='container'>
                                    <div className='description-image row'
                                        style={
                                            { backgroundImage: `url(${detailClinic.image})` }
                                        }
                                    >
                                    </div>
                                    <div className='clinic-description row'>
                                        {
                                            detailClinic && detailClinic.descriptionHTML &&
                                            <div dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='clinic-content-bottom container'>
                                <div className='location row'>
                                    <select
                                        className='form-control select-province'
                                        onChange={(event) => {
                                            this.handleChangeSelectedProvince(event);
                                        }}
                                    >
                                        {
                                            allProvince && allProvince.length > 0 && allProvince.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.keyMap}
                                                    >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='list-doctor row'>
                                    {
                                        detailClinic && detailClinic.clinicData && detailClinic.clinicData.length > 0
                                        && detailClinic.clinicData.map((item, index) => {
                                            return (
                                                <div className='each-doctor' key={index}>
                                                    <div className='doctor-content-left'>
                                                        <div className='doctor-info'>
                                                            <DoctorInfoGeneral
                                                                doctorId={item.doctorId}
                                                                isShowDescription={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='doctor-content-right'>
                                                        <div className='doctor-schedule'>
                                                            <DoctorSchedule
                                                                doctorId={item.doctorId}
                                                            />
                                                        </div>
                                                        <div className='doctor-info-extra'>
                                                            <DoctorInfoExtra
                                                                doctorId={item.doctorId}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
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
        allProvinceRedux: state.admin.allProvince
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvinceStart: () => dispatch(actions.fetchProvinceStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
