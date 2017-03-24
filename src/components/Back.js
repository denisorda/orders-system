import React, {Component} from 'react'
import {Link} from 'react-router'

class Back extends Component {

    render() {
        let {to = null} = this.props;
        let link = <button type="button" onClick={this.goBack} className="btn btn-link btn-lg">
            <i className="fa fa-fw fa-angle-left"> </i>
            Назад
        </button>;
        if (to === '/') {
            link = <Link to="/dashboard" className="btn btn-link btn-lg">
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
