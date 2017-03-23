import React, {Component} from 'react';
import DatePickerMy from "../components/DatePickerMy";
import FormGroupSelect from '../components/FormGroupSelect'

export default class OrderForm extends Component {
    render(){
        const {data, errors, vendors, onChange, onChangeDate} = this.props;
        return(<div className="form-item-container">
            <h3><i className="fa fa-truck" aria-hidden="true"> </i> Поставщик</h3>
            <FormGroupSelect label="Поставщик"
                             onChange={onChange.bind(undefined, 'vendor')}
                             name="vendor"
                             value={data.vendor}
                             optionValue="value"
                             error={errors.vendor}
                             object={vendors}/>
            <DatePickerMy label="Дата выполнения заказа"
                          className="form-control"
                          selected={data.doDate}
                          onChange={onChangeDate.bind(undefined, 'doDate')}/>
        </div>)
    }
}

