import React, {Component} from 'react'

class FormGroupSelectFilter extends Component {

    render() {
        let {object, label, onChange, value, optionValue} = this.props;
        let options = [];
        for (let key in object) {
            options.push(<option key={key} value={optionValue === 'key' ? key : object[key]}>{object[key]}</option>);
        }
        return (
            <div className="form-group">
                <label>{label}</label>
                <div>
                    <select className="form-control" value={value}
                            onChange={onChange}>
                        <option key={0} value='0'>Все</option>
                        {options}
                    </select>
                </div>
            </div>

        )
    }
}

export default FormGroupSelectFilter