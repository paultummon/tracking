import React, {Component} from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import {v1 as uuid} from "uuid"; 
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../../Actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
    // state = {
    //     items: [
    //         {id: uuid(), name: 'Eggs'},
    //         {id: uuid(), name: 'Milk'},
    //         {id: uuid(), name: 'Steak'},
    //         {id: uuid(), name: 'Water'}
    //     ]
    // }
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onDeleteClick = (id) => {
        console.log('THIS IS DELETE ID ====>', id)
        const { deleteItem } = this.props
        deleteItem(id)
    }

    componentDidMount() {
        const { getItems } = this.props
        getItems()
    }
    render() {
        const { item: {items} } = this.props
        return (
            // <Container>
            //   <ListGroup>
            //       <TransitionGroup className='shopping-list'>
            //           {items.map(({ _id, name}) => (
            //               <CSSTransition key={_id} timeout={500} classNames="fade">
            //                   <ListGroupItem>
            //                      {this.props.isAuthenticated && <Button
            //                       className="remove-btn"
            //                       color="danger"
            //                       size="sm"
            //                       onClick={this.onDeleteClick.bind(this, _id)}
            //                       >&times;</Button> }
            //                       {name}
            //                   </ListGroupItem>
            //               </CSSTransition>
            //           ))}
            //       </TransitionGroup>
            //   </ListGroup>
            // </Container>
            <h1>Main Screen</h1>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)