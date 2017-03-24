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
                vendor: '0',
                name: '',
                surname: '',
                email: '',
                phone: '',
                id: '',
                orderText: '',
            },
            errors: {},
            vendors: getVendors(),
            orders: getOrders(),
            isEdit: false,
        };
    }

    componentDidMount() {
        checkFirm();
        let {isEdit, data} = this.state;
        let {id = null} = this.props.params;
        let order = {};
        if (id) {
            order = getOrder(id);
            for (let key in order) {
                if (key === 'startDate' || key === 'doDate') {
                    data[key] = moment(order[key]);
                } else {
                    data[key] = order[key];
                }
            }
            isEdit = true;
            this.setState({isEdit, data});
        } else {
            data.id = this.buildId();
            this.setState({isEdit, data});
        }

    }

    onChange(key, ev) {
        let {data, isEdit} = this.state
        data[key] = ev.target.value;
        if (!isEdit) {
            data.id = this.buildId();
        }
        this.setState({data});
        //console.log(key, ev.target.value);
        deleteError(key);
    };

    onChangeDate(key, date) {
        let {data, isEdit} = this.state
        data[key] = date;
        if (!isEdit) {
            data.id = this.buildId();
        }
        this.setState({data});
        //console.log(key, date);
    };

    buildId() {
        let {startDate, orderType} = this.state.data;
        let {orders} = this.state;
        let number = 1;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id.substr(2, 4) === startDate.format('YY') + startDate.format('MM')) {
                number++;
            }
        }
        return orderType + '-' + startDate.format('YY') + startDate.format('MM') + startDate.format('DD') + number;
    }

    saveOrder() {
        let {data, errors, isEdit} = this.state;
        validate(data);
        errors = getErrors();
        if (Object.keys(errors).length === 0) {
            save(data);
            data = {
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

            if (isEdit) {
                this.setState({data, errors});
                history.back();
            } else {
                this.setState({data, errors, orders: getOrders()});
            }
        } else {
            this.setState({data, errors});
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
                    <h2>{isEdit ? `Редактирование заказа ${data.id}` : 'Новый заказ'}</h2>
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