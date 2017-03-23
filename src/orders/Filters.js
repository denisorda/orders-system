import React, {Component} from 'react';
import FormGroupSelectFilter from '../components/FormGroupSelectFilter'

export default class Filters extends Component {
    render() {
        let {onChange, vendors} = this.props;
        return (<div className="row">
            <div className="col-sm-4">
                <FormGroupSelectFilter label="Выберите тип"
                                       onChange={onChange.bind(undefined, 'orderType')}
                                       name="orderType"
                                       optionValue="key"
                                       object={{
                                           'о': 'Опт',
                                           'р': 'Розница',
                                       }}/>
            </div>
            <div className="col-sm-4">
                <FormGroupSelectFilter label="Выберите поставщика"
                                       onChange={onChange.bind(undefined, 'vendor')}
                                       name="vendor"
                                       optionValue="value"
                                       object={vendors}/>
            </div>
            <div className="col-sm-4">
                <FormGroupSelectFilter label="Выберите статус заказа"
                                       onChange={onChange.bind(undefined, 'status')}
                                       name="status"
                                       optionValue="key"
                                       object={{
                                           '1': 'Подтвержденные',
                                           '2': 'Просроченные'
                                       }}/>
            </div>
        </div>)
    }
}
