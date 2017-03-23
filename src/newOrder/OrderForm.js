import React, {Component} from 'react';
import FormGroupInput from '../components/FormGroupInput'
import FormGroupTextarea from '../components/FormGroupTextarea'
import DatePickerMy from "../components/DatePickerMy";
import FormGroupSelect from '../components/FormGroupSelect'

export default class OrderForm extends Component {
    render(){
        const {data, errors, onChange, onChangeDate, isEdit} = this.props;
        return(<div className="form-item-container">
            <h3><i className="fa fa-cart-arrow-down" aria-hidden="true"> </i> Заказ</h3>
            <DatePickerMy label="Дата получения заказа"
                          className="form-control"
                          disabled={isEdit}
                          selected={data.startDate}
                          onChange={onChangeDate.bind(undefined, 'startDate')}/>
            <FormGroupTextarea label="Заказ"
                               name="productName"
                               value={data.orderText}
                               error={errors.orderText}
                               onChange={onChange.bind(undefined, 'orderText')}/>
            <FormGroupSelect label="Тип заказа"
                             onChange={onChange.bind(undefined, 'orderType')}
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
                            disabled = {true}
                            value={data.id}/>
        </div>)
    }
}
