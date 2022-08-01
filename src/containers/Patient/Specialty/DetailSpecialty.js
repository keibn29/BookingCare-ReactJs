import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfoExtra from '../Doctor/DoctorInfoExtra';
import DoctorInfoGeneral from '../Doctor/DoctorInfoGeneral';
import { getSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailSpecialty: [],
            allProvince: [],
        }
    }

    async componentDidMount() {
        this.props.fetchProvinceStart();
        await this.fetchDatailSpecialty('ALL');
    }

    fetchDatailSpecialty = async (location) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id
            let res = await getSpecialtyById(specialtyId, location)
            if (res && res.errCode === 0) {
                this.setState({
                    detailSpecialty: res.specialty
                })
            } else {
                toast.error('fetch specialty error!')
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
        await this.fetchDatailSpecialty(event.target.value);
        console.log('check selectedProvince: ', event.target.value)
    }

    render() {
        let { detailSpecialty, allProvince } = this.state;
        let { language } = this.props;
        console.log('check allProvince: ', allProvince)

        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader
                        isShowBanner={false}
                    />
                    <div className='detail-specialty-body'>
                        <div className='specialty-content-top'>
                            <div className='specialty-description container'>
                                <div className='row'>
                                    {
                                        detailSpecialty && detailSpecialty.descriptionHTML &&
                                        <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='specialty-content-bottom container'>
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
                                    detailSpecialty && detailSpecialty.specialtyData && detailSpecialty.specialtyData.length > 0
                                    && detailSpecialty.specialtyData.map((item, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
