import React, { Component } from "react";
import UserTable from '../util/UserTable';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from 'react-redux';



const mapStateToProps = state => {
    return state;
}

class AdminPage extends Component {


    render() {
        return (
            <div>
                <h1>Admin Bereich</h1>
                <UserTable/>
            </div>
        )
    }
    //<CardList recipes={this.props.recipeReducer.recipes} />
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

const ConnectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage)
export default ConnectedAdminPage;