import React, {Component} from 'react'

class FormGroupInput extends Component {
    static defaultProps = {
        onChange: () => {},
    }
    render() {
        let {label, error, type, onChange, value, disabled = false} = this.props;
        let addClass = error ? 'has-error' : '';
        return (
            <div className={`form-group row ${addClass}`}>
                <div className="col-sm-4 text-right">
                    <label>{label}</label>
                </div>
                <div className="col-sm-8">
                    <input type={type ? type : "text"}
                           className={`form-control ${disabled ? 'text-mut' : ''}`}
                           disabled={disabled}
                           value={value}
                           onChange={onChange}/>
                    <div className="alert-error">{error}</div>
                </div>
            </div>
        )
    }
}

export default FormGroupInput
