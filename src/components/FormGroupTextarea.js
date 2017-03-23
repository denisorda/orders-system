import React, {Component} from 'react'

class FormGroupTextarea extends Component {

    render() {
        let {label, error, onChange, value} = this.props;
        let addClass = error ? 'has-error' : '';
        return (
            <div className={`form-group row ${addClass}`}>
                <div className="col-sm-4 text-right">
                    <label>{label}</label>
                </div>
                <div className="col-sm-8">
                    <textarea className="form-control"
                           value={value}
                           rows="5"
                           onChange={onChange}/>
                    <div className="alert-error">{error}</div>
                </div>
            </div>
        )
    }
}

export default FormGroupTextarea
