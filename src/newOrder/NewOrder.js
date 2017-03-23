import React, {Component} from 'react';
import moment from 'moment'
import Back from '../components/Back'
import {save, getVendors, getOrder, getOrders, checkFirm} from "../action/api";
import {validate, getErrors, deleteError} from "../action/validator";
import ClientForm from "./ClientForm";
import OrderForm from "./OrderForm";
import VendorForm from "./VendorForm";

class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                startDate: moment(),
                doDate: moment().add(5, 'days'),
                orderType: 0,
                isEdit: false
            },
            errors: {},
            vendors: getVendors(),
            orders: getOrders()
        };
    }

    componentDidMount() {
        checkFirm();
        let {id = null} = this.props.params;
        let order = {};
        if (id) {
            order = getOrder(id);
            for (let key in order) {
                if (key === 'startDate' || key === 'doDate') {
                    this.state.data[key] = moment(order[key]);
                } else {
                    this.state.data[key] = order[key];
                }
            }
            this.state.isEdit = true;
            this.setState(this.state);
        }
    }

    onChange(key, ev) {
        this.state.data[key] = ev.target.value;
        if (!this.state.isEdit) {
            this.buildId();
        }
        this.forceUpdate();
        console.log(key, ev.target.value);
        deleteError(key);
    };

    onChangeDate(key, date) {
        this.state.data[key] = date;
        if (!this.state.isEdit) {
            this.buildId();
        }
        this.forceUpdate();
        console.log(key, date);
    };

    buildId() {
        let {startDate, orderType} = this.state.data;
        let {orders} = this.state;
        let idsArr = Object.keys(orders);
        let number = 1;
        for (let i = 0; i < idsArr.length; i++) {
            if (idsArr[i].substr(2, 4) === startDate.format('YY') + startDate.format('MM')) {
                number++;
            }
        }
        let id = orderType + '-' + startDate.format('YY') + startDate.format('MM') + startDate.format('DD') + number;
        this.state.data.id = id;
    }

    saveOrder() {
        validate(this.state.data);
        this.state.errors = getErrors();
        this.setState(this.state);
        if (Object.keys(getErrors()).length === 0) {
            save(this.state.data);
            this.state.orders = getOrders();
            this.setState({
                data: {
                    orderType: 0,
                    vendor: '0',
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    id: '',
                    orderText: '',
                    startDate: moment(),
                    doDate: moment().add(5, 'days'),
                }
            });
            if (this.state.isEdit) {
                history.back();
            }
        }
    };

    render() {
        let {errors, vendors, data, isEdit} = this.state;
        let to = '/';
        if (isEdit) {
            to = null;
        }
        return (
            <div>
                <Back to={to}/>
                <div className="form">
                    <h2>Новый заказ</h2>
                    <ClientForm data={data} errors={errors} onChange={this.onChange.bind(this)}/>
                    <OrderForm data={data} errors={errors} onChange={this.onChange.bind(this)}
                               onChangeDate={this.onChangeDate.bind(this)} isEdit={isEdit}/>
                    <VendorForm data={data} errors={errors} onChange={this.onChange.bind(this)}
                                onChangeDate={this.onChangeDate.bind(this)} vendors={vendors}/>
                    <div className="text-center">
                        <button className="btn btn-save" type="button" onClick={this.saveOrder.bind(this)}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewOrder;