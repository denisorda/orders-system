import React, {Component} from 'react';

export default class SortButton extends Component {
    render() {
        let {direction, date, onClick} = this.props;
        return (<span className="caret-sort">
                <i className={`fa fa-caret-${direction}`}
                   onClick={onClick.bind(undefined, date, direction)}> </i>
            </span>)
    }
}
