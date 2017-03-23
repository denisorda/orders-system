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

    isPager(){
        this.ordersFilter();
        let orders = this.state.ordersFilter;
        let cnt = orders.length;
        let onPage = this.state.onPage;
        if (cnt > onPage) {
            this.state.isPager = true;
            this.state.total = Math.ceil(cnt / onPage);
            this.state.cnt = cnt;
            this.getPage();
        } else {
            this.state.isPager = false;
            this.state.ordersPager = orders;
            this.state.current = 0;
        }
    }

    getPage() {
        let orders = this.state.ordersFilter;
        this.state.ordersPager = [];
        let {onPage, current} = this.state;
        for (let i = 0; i < orders.length; i++) {
            if (i >= current * onPage && i < (current + 1) * onPage) {
                this.state.ordersPager.push(orders[i]);
            }
        }
        this.setState(this.state);
    }

    handlePageChanged(newPage) {
        this.state.current = newPage;
        this.isPager();
    }

    onChange(key, ev) {
        this.state[key] = ev.target.value;
        this.forceUpdate();
        this.isPager();
    };

    ordersFilter() {
        let {orderType, vendor, status} = this.state;
        let orders = this.state.ordersBase;
        this.state.ordersFilter = [];
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
                this.state.ordersFilter.push(orders[i]);
            }
        }
    }

    ordersSortToDate(date, direction) {
        let orders = this.state.ordersPager;
        this.state.ordersPager = [];
        orders.sort((dateA, dateB) => {
            if (direction === 'up') {
                return moment(dateA[date]).diff(moment(dateB[date]), 'seconds');
            } else if (direction === 'down') {
                return moment(dateB[date]).diff(moment(dateA[date]), 'seconds');
            }
        });
        for (let i = 0; i < orders.length; i++) {
            this.state.ordersPager.push(orders[i]);
        }
        this.setState(this.state);
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
                        onPageChanged={this.handlePageChanged}
                    />
                </div> : <div></div>}
                <Table orders={orders} editable={editable} onSort={this.ordersSortToDate.bind(this)}/>
            </div>
        );
    }
}

export default Orders;