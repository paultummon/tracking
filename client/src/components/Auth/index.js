import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {v1 as uuid} from "uuid"; 
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input, 
    NavLink,
    Alert
} from 'reactstrap'
import {register} from '../../Actions/authActions'
import {clearErrors} from '../../Actions/errorActions'
import PropTypes from 'prop-types'

class RegisterModal extends Component {
    state = {
        modal: false,
        email: '',
        name: '',
        password: '',
        msg: null
    }

    // static propTypes = {
    //     isAuthenticated: PropTypes.bool,
    //     error: PropTypes.object.isRequired,
    //     register: PropTypes.func.isAuthenticated
    // }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg})
            } else {
                this.setState({msg: null})
            }
        }
        //If authenticated close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }
    toggle = () => {
        const { clearErrors } = this.props
        clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const { name, email, password } = this.state
        const newUser = {
            name,
            email, 
            password
        }
        const { register } = this.props
        register(newUser)
        // this.toggle()
    }


    render() {
        return (
            <div>
              <NavLink onClick={this.toggle} href="#">
                  Register
              </NavLink>
              <Modal 
                isOpen={this.state.modal}
                toggle={this.toggle}
              >
                <ModalHeader toggle={this.toggle}>
                    Register
                </ModalHeader>
                <ModalBody>
                    {this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="email">Email</Label>
                            <Input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Button 
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                            >Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
              </Modal>
            </div>
        )
    }
}

const MapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(MapStateToProps, {register, clearErrors})(RegisterModal)