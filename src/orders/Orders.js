import React, {Component} from 'react';
import {getOrders, getVendors, checkFirm} from "../action/api";
import moment from 'moment'
import Back from '../components/Back'
import Filters from './Filters'
import Pager from 'react-pager';
import Table from "./Table";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersBase: props.orders || getOrders(),
            vendors: getVendors(),
            ordersFilter: null,
            ordersPager: null,
            orderType: '0',
            vendor: '0',
            status: '0',
            isPager: false,
            onPage: 5,
            current: 0,
            visiblePage: 5,
            editable: props.editable !== undefined ? props.editable : true
        };
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            editable: nextProps.editable !== undefined ? nextProps.editable : true
        });
    }

    componentWillMount() {
        checkFirm();
        this.isPager();
    }

    isPager(current = 0) {
        let {total, onPage} = this.state;
        let ordersFilter = this.ordersFilter();
        let cnt = ordersFilter.length;
        if (cnt > onPage) {
            total = Math.ceil(cnt / onPage);
            this.setState({isPager: true, total, cnt, current, ordersPager: this.getPage(ordersFilter, current)});
        } else {
            this.setState({isPager: false, ordersPager: ordersFilter, current});
        }
    }

    getPage(ordersFilter, current) {
        let {onPage} = this.state;
        let ordersPager = [];
        for (let i = 0; i < ordersFilter.length; i++) {
            if (i >= current * onPage && i < (current + 1) * onPage) {
                ordersPager.push(ordersFilter[i]);
            }
        }
        return ordersPager;
    }

    handlePageChanged(newPage) {
        this.isPager(newPage);
    }

    onChange(key, ev) {
        this.setState({[key]: ev.target.value}, () => {
            this.isPager();
        });
    };

    ordersFilter() {
        let {orderType, vendor, status} = this.state;
        let orders = this.state.ordersBase;
        let ordersFilter = [];
        for (let i = 0; i < orders.length; i++) {
            let typeFlag = false, vendorFlag = false, statusFlag = false;
            if (orderType === '0' || orders[i].orderType === orderType) {
                typeFlag = true;
            }
            if (vendor === '0' || orders[i].vendor === vendor) {
                vendorFlag = true;
            }
            if (status === '0') {
                statusFlag = true;
            } else if (moment().format("YYYY-MM-DD") <= moment(orders[i].doDate).format("YYYY-MM-DD") && status === '1') {
                statusFlag = true;
            } else if (moment().format("YYYY-MM-DD") > moment(orders[i].doDate).format("YYYY-MM-DD") && status === '2') {
                statusFlag = true;
            }
            if (typeFlag && vendorFlag && statusFlag) {
                ordersFilter.push(orders[i]);
            }
        }
        return ordersFilter;
    }

    ordersSortToDate(date, direction) {
        let {ordersPager} = this.state;
        ordersPager.sort((dateA, dateB) => {
            if (direction === 'up') {
                return moment(dateA[date]).diff(moment(dateB[date]), 'seconds');
            } else {
                return moment(dateB[date]).diff(moment(dateA[date]), 'seconds');
            }
        });
        this.setState({ordersPager});
    }

    render() {
        let {editable, ordersPager, ordersFilter, vendors, total, current, visiblePage, isPager = false} = this.state;
        let orders = ordersPager || ordersFilter;
        return (
            <div>
                {editable && <Back to="/"/>}
                <h2>Список заказов</h2>
                <Filters vendors={vendors} onChange={this.onChange.bind(this)}/>
                {isPager ? <div className="text-center">
                    <Pager
                        total={total}
                        current={current}
                        visiblePages={visiblePage}
                        titles={{first: '|<', last: '>|'}}
                        className="pagination-sm"
                        onPageChanged={this.handlePageChanged.bind(this)}
                    />
                </div> : <div></div>}
                <Table orders={orders} editable={editable} onSort={this.ordersSortToDate.bind(this)}/>
            </div>
        );
    }
}

export default Orders;