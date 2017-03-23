import React, {Component} from 'react';
import FormGroupInput from '../components/FormGroupInput'

export default class ClientForm extends Component {
    render(){
        const {data, errors, onChange} = this.props;
        return(<div className="form-item-container">
            <h3><i className="fa fa-user-o" aria-hidden="true"> </i> Клиент</h3>
            <FormGroupInput label="Имя"
                            name="name"
                            value={data.name}
                            error={errors.name}
                            onChange={onChange.bind(undefined, 'name')}/>
            <FormGroupInput label="Фамилия"
                            name="surname"
                            value={data.surname}
                            error={errors.surname}
                            onChange={onChange.bind(undefined, 'surname')}/>
            <FormGroupInput label="Email"
                            type="email"
                            value={data.email}
                            name="email"
                            error={errors.email}
                            onChange={onChange.bind(undefined, 'email')}/>
            <FormGroupInput label="Телефон"
                            type="phone"
                            value={data.phone}
                            name="phone"
                            error={errors.phone}
                            onChange={onChange.bind(undefined, 'phone')}/>
        </div>)
    }
}
