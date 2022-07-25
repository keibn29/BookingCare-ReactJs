import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { Modal } from 'reactstrap';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => {
                        this.props.toggle()
                    }}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span
                                className='right'
                                onClick={() => {
                                    this.props.toggle()
                                }}
                            >
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            BODY MODAL
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn btn-primary'>Confirm</button>
                            <button
                                className='btn btn-secondary'
                                onClick={() => {
                                    this.props.toggle()
                                }}
                            >
                                Cancel
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
