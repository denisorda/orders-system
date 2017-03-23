import React, {Component} from 'react';
import DatePicker from 'react-datepicker'
import '../../node_modules/react-datepicker/dist/react-datepicker.min.css'

class DatePickerMy extends Component {

    render(){
        let {label, className, onChange, selected, disabled = false} = this.props;
        return (
            <div className="row form-group">
                <div className="col-sm-4 text-right">
                    <label>{label}</label>
                </div>
                <div className="col-sm-4">
                    <DatePicker
                        className={className}
                        selected={selected}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    <div className="alert-error"> </div>
                </div>
            </div>
        )
    }
}

export default DatePickerMy;