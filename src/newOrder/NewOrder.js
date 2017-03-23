import React, {Component} from 'react';
import moment from 'moment'
import FormGroupSelect from '../components/FormGroupSelect'
import FormGroupInput from '../components/FormGroupInput'
import FormGroupTextarea from '../components/FormGroupTextarea'
import Back from '../components/Back'
import DatePickerMy from "../components/DatePickerMy";
import {save, getVendors, getOrder, getOrders, checkFirm} from "../action/api";
import {validate, getErrors, deleteError} from "../action/validator";

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
            if (idsArr[i].substr(2, 4) == startDate.format('YY') + startDate.format('MM')) {
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
                    <div className="form-item-container">
                    <h3><i className="fa fa-user-o" aria-hidden="true"> </i> Клиент</h3>
                    <FormGroupInput label="Имя"
                                    name="name"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={this.onChange.bind(this, 'name')}/>
                    <FormGroupInput label="Фамилия"
                                    name="surname"
                                    value={data.surname}
                                    error={errors.surname}
                                    onChange={this.onChange.bind(this, 'surname')}/>
                    <FormGroupInput label="Email"
                                    type="email"
                                    value={data.email}
                                    name="email"
                                    error={errors.email}
                                    onChange={this.onChange.bind(this, 'email')}/>
                    <FormGroupInput label="Телефон"
                                    type="phone"
                                    value={data.phone}
                                    name="phone"
                                    error={errors.phone}
                                    onChange={this.onChange.bind(this, 'phone')}/>
                    </div>
                    <div className="form-item-container">
                    <h3><i className="fa fa-cart-arrow-down" aria-hidden="true"> </i> Заказ</h3>
                    <DatePickerMy label="Дата получения заказа"
                                  className="form-control"
                                  disabled={isEdit}
                                  selected={data.startDate}
                                  onChange={this.onChangeDate.bind(this, 'startDate')}/>
                    <FormGroupTextarea label="Заказ"
                                       name="productName"
                                       value={data.orderText}
                                       error={errors.orderText}
                                       onChange={this.onChange.bind(this, 'orderText')}/>
                    <FormGroupSelect label="Тип заказа"
                                     onChange={this.onChange.bind(this, 'orderType')}
                                     name="orderType"
                                     disabled={isEdit}
                                     optionValue="key"
                                     error={errors.orderType}
                                     value={data.orderType}
                                     object={{
                                         'о': 'Опт',
                                         'р': 'Розница',
                                     }}/>
                    <FormGroupInput label="ID заказа"
                                    name="id"
                                    disabled="true"
                                    value={data.id}/>
                    </div>
                    <div className="form-item-container">
                    <h3><i className="fa fa-truck" aria-hidden="true"> </i> Поставщик</h3>
                    <FormGroupSelect label="Поставщик"
                                     onChange={this.onChange.bind(this, 'vendor')}
                                     name="vendor"
                                     value={data.vendor}
                                     optionValue="value"
                                     error={errors.vendor}
                                     object={vendors}/>
                    <DatePickerMy label="Дата выполнения заказа"
                                  className="form-control"
                                  selected={data.doDate}
                                  onChange={this.onChangeDate.bind(this, 'doDate')}/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-save" type="button" onClick={this.saveOrder.bind(this)}>Сохранить
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewOrder;