import React, {Component} from 'react'

class FormGroupSelect extends Component {

    render() {
        let {object, error, label, onChange, value, optionValue, disabled = false} = this.props;
        let options = [];
        for (let key in object) {
            options.push(<option key={key} value={optionValue === 'key' ? key : object[key]}>{object[key]}</option>);
        }
        let addClass = error ? 'has-error' : '';
        return (
            <div className={`row form-group ${addClass}`}>
                <div className="col-sm-4 text-right">
                    <label>{label}</label>
                </div>
                <div className="col-sm-8">
                    <select className="form-control"
                            value={value}
                            disabled={disabled}
                            onChange={onChange}>
                        <option key={0} value='0'>Не выбрано</option>
                        {options}
                    </select>
                    <div className="alert-error">{error}</div>
                </div>
            </div>

        )
    }
}

export default FormGroupSelect