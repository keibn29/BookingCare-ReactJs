import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: ''
        }
    }

    componentDidMount() {
        let { emailPatient } = this.props;
        if (emailPatient) {
            this.setState({
                email: emailPatient
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.emailPatient !== this.props.emailPatient) {
            let { emailPatient } = this.props;
            if (emailPatient) {
                this.setState({
                    email: emailPatient
                })
            }
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        //encode
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                image: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    toggle = () => {
        this.props.toggle();
        this.setState({
            image: ''
        })
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle()
                }}
                className={'remedy-modal-container'}
                centered
            >
                <ModalHeader toggle={() => {
                    this.toggle()
                }}>
                    Gửi hóa đơn khám bệnh thành công
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <label>Email bệnh nhân</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={(event) => {
                                    { this.handleOnChangeInput(event) }
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='form-group col-6'>
                            <label>Đơn thuốc</label>
                            <input
                                type='file'
                                className='form-control-file'
                                onChange={(event) => {
                                    { this.handleOnChangeImage(event) }
                                }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => {
                            this.handleSendRemedy()
                        }}
                    >Send
                    </Button>{''}
                    <Button
                        color='secondary'
                        onClick={() => {
                            this.toggle()
                        }}
                        className='px-3'
                    >Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
