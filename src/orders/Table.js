import React, {Component} from 'react';
import SortButton from "./SortButton";
import TableRow from "./TableRow";

export default class Table extends Component {
    render() {
        let {orders, onSort, editable} = this.props;
        return (
            <div className="table-container table-responsive">
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тип</th>
                        <th>Клиент</th>
                        <th>Поставщик</th>
                        <th>Принят <span>
                            <SortButton direction='up' date='startDate' onClick={onSort}/>
                            <SortButton direction='down' date='startDate' onClick={onSort}/>
                            </span>
                        </th>
                        <th>Отгрузка <span>
                            <SortButton direction='up' date='doDate' onClick={onSort}/>
                            <SortButton direction='down' date='doDate' onClick={onSort}/>
                            </span>
                        </th>
                        <th>Статус</th>
                        <th>Редактировать</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length > 0
                        ? orders.map((key, index) => <TableRow key={index} order={orders[index]} editable={editable}/>)
                        : <tr key={1} className="text-center">
                            <td colSpan={8}>
                                <div className="no-data">Список заказов пуст</div>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}