import React, {Component, useState, useEffect} from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Admin from '../Admin'
import Slider from '../../components/Slider'
// import {v1 as uuid} from "uuid"; 
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../../Actions/itemActions'
import PropTypes from 'prop-types'
import Map from '../Map/Map2'
// import auth from '../../../../middleware/auth'

class Home extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onDeleteClick = (id) => {
        const { deleteItem } = this.props
        deleteItem(id)
    }

    componentDidMount() {
        const { getItems } = this.props
        getItems()
    }
    render() {
        const { isAuthenticated, auth: { user } } = this.props
        return (
            <div>
                {isAuthenticated ? <Admin /> : <h1>Logged Out</h1> }
            </div>
        )
    }
}

Home.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStateToProps, { getItems, deleteItem })(Home)