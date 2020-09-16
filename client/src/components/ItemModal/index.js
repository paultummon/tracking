import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {v1 as uuid} from "uuid"; 
import PropTypes from 'prop-types'
import {addItem} from '../../Actions/itemActions'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'


class ItemModal extends Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const newItem = {
            // id: uuid(),
            name: this.state.name
        }
        const { addItem } = this.props
        //Add item via addItem action
        addItem(newItem)
        this.toggle()
    }


    render() {
        return (
            <div>
                {this.props.isAuthenticated ? <Button
              color="dark"
              style={{marginBottom: '2rem'}}
              onClick={this.toggle}>Add Item</Button> 
                : <h4 className="mb-3 ml-4">Please Login to manage items</h4>
            }
              
              <Modal 
                isOpen={this.state.modal}
                toggle={this.toggle}
              >
                <ModalHeader toggle={this.toggle}>
                    Add To Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add shopping item"
                                onChange={this.onChange}
                            />
                            <Button 
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                            >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
              </Modal>
            </div>
        )
    }
}

const MapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(MapStateToProps, {addItem})(ItemModal)