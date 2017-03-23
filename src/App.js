import React, {Component} from 'react';
import {Link} from 'react-router'
import {getFirmName, cleanFirmName} from "./action/api";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firm: getFirmName()
        };
    }

    logout() {
        cleanFirmName();
        this.setState({
            firm: ''
        })
    }

    render() {
        let {firm} = this.state;
        let logout = <div></div>;
        if(firm){
            logout = <Link to="/login" onClick={this.logout.bind(this)}>Выйти</Link>;
        }

        return (
            <div>
                <header>
                    <div className="firm-name pull-left">
                        {firm}
                    </div>
                    <div className="logout pull-right">
                        {logout}
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
                <footer>
                    <div className="row">
                        <div className="col-sm-4 col-xs-12">
                            Copyright 2017 {firm}
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            All rights reserved
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            Design by <a href="javascript:void(0)">Den</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
