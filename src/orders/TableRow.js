import React, {Component} from 'react';
import {Link} from 'react-router'
import moment from 'moment'

export default class TableRow extends Component {
    isConfirm() {
        const {order} = this.props;
        return moment().format("YYYY-MM-DD") <= moment(order.doDate).format("YYYY-MM-DD");
    }

    isEditable() {
        const {order, editable} = this.props;
        return moment(order.doDate).diff(moment(), 'days') >= 3 && editable;
    }

    render() {
        const {order} = this.props;
        return (
            <tr className={this.isConfirm() ? 'table-info' : 'table-warning'}>
                <th>{order.id}</th>
                <td>{order.orderType === 'о' ? 'опт' : 'розница'}</td>
                <td>{order.surname} {order.name}</td>
                <td>{order.vendor}</td>
                <td>{moment(order.startDate).format('DD.MM.YY')}</td>
                <td>{moment(order.doDate).format('DD.MM.YY')}</td>
                <td>{this.isConfirm() ? 'Подтвержден' : 'Просрочен'}</td>
                <td>{this.isEditable() ? <Link to={`edit/${order.id}`} className="btn btn-edit">
                    <i className="fa fa-pencil" aria-hidden="true"> </i>
                </Link> : 'недоступно'}</td>
            </tr>
        )
    }
}