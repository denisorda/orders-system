import React, {Component} from 'react'

class FormErrors extends Component {

    render() {
        let {errors}=this.props;
        console.log(errors);
        if (!(errors && Object.keys(errors).length > 0)) {
            return null;
        }
        let errorsLi = [];
        for (let key in errors) {
            errorsLi.push(<li key={`errors_${key}`}>{errors[key]}.</li>);
        }

        return (
            <div className="alert alert-dismissible alert-danger">
                {errorsLi}
            </div>
        )
    }
}

export default FormErrors