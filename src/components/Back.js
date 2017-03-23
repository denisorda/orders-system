import React, {Component} from 'react'
import {Link} from 'react-router'

class Back extends Component {

    render() {
        let {to = null} = this.props;
        let link = <a href="javascript:void(0)" onClick={this.goBack}>
            <i className="fa fa-fw fa-angle-left"> </i>
            Назад
        </a>;
        if (to === '/') {
            link = <Link to="/dashboard">
                <i className="fa fa-fw fa-angle-left"> </i>
                Назад
            </Link>
        }

        return (
            <div className="form-group btn-back">
                {link}
            </div>
        )
    }

    goBack() {
        history.back();
    }

}

export default Back
