import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { Modal } from 'reactstrap';
import DoctorInfoGeneral from '../DoctorInfoGeneral';
import _ from 'lodash';
import { createBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import CustomScrollbars from '../../../../components/CustomScrollbars';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            timeType: '',
            dateBooking: '',

            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            allGender: []
        }
    }

    componentDidMount() {
        this.props.fetchGenderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrGenderRedux = this.props.arrGenderRedux;
        if (prevProps.arrGenderRedux !== this.props.arrGenderRedux) {
            this.setState({
                allGender: arrGenderRedux,
                selectedGender: arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : ''
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            let { dataTime } = this.props;
            console.log('check dataTime: ', dataTime)
            if (dataTime && !_.isEmpty(dataTime)) {
                this.setState({
                    doctorId: dataTime.doctorId,
                    timeType: dataTime.timeType,
                    dateBooking: dataTime.date
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleConfirmBooking = async () => {
        let res = await createBookAppointment({
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.dateBooking,

            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            selectedGender: this.state.selectedGender,
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.toggle();
            // let arrGenderRedux = this.props.arrGenderRedux;
            // this.setState({
            //     fullName: '',
            //     phoneNumber: '',
            //     email: '',
            //     address: '',
            //     reason: '',
            //     selectedGender: arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : ''
            // })
        } else {
            toast.error('Booking error!')
        }
    }


    render() {
        let { language, isOpen, dataTime } = this.props;
        let { allGender } = this.state;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        console.log('check state: ', this.state)

        return (
            <>
                <Modal
                    isOpen={isOpen}
                    // toggle={() => {
                    //     this.props.toggle()
                    // }}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.doctor.modal.modal-header' /></span>
                            <span
                                className='right'
                                onClick={() => {
                                    this.props.toggle()
                                }}
                            >
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body container'>
                            <div className='doctor-info'>
                                <DoctorInfoGeneral
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.who-check' /></label>
                                    <select className='form-control' >
                                        {
                                            language === LANGUAGES.VI ? <option>Bệnh nhân</option> : <option>Patient</option>
                                        }
                                    </select>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.fullname' /></label>
                                    <input
                                        className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'fullName')
                                        }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.gender' /></label>
                                    <select
                                        className='form-control'
                                        value={this.state.selectedGender}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'selectedGender')
                                        }}
                                    >
                                        {
                                            allGender && allGender.length > 0 && allGender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.email' /></label>
                                    <input
                                        className='form-control'
                                        type='email'
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'email')
                                        }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.phonenumber' /></label>
                                    <input
                                        className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'phoneNumber')
                                        }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.address' /></label>
                                    <input
                                        className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'address')
                                        }}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.doctor.modal.reason' /></label>
                                    <textarea
                                        className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, 'reason')
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                className='btn btn-primary'
                                onClick={() => {
                                    this.handleConfirmBooking()
                                }}
                            >
                                <FormattedMessage id='patient.doctor.modal.confirm' />
                            </button>
                            <button
                                className='btn btn-secondary'
                                onClick={() => {
                                    this.props.toggle()
                                }}
                            >
                                <FormattedMessage id='patient.doctor.modal.cancel' />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrGenderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
