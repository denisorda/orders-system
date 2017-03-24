import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import FormGroupSelect from './components/FormGroupSelect'
import FormGroupInput from './components/FormGroupInput'
import {getFirms, setFirmName, getPassword} from "./action/api";
import {validateSelect, validatePassword, deleteError, getErrors} from "./action/validator";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            firms: getFirms(),
            firm: null,
            password: ''
        };
    }

    onChange(key, ev) {
        this.setState({
            [key]: ev.target.value
        });
        //console.log(key, ev.target.value);
        deleteError(key);
    };

    login() {
        validateSelect(this.state.firm, 'firm');
        let passwordVerify = getPassword(this.state.firm);
        validatePassword(this.state.password, 'password', passwordVerify);
        let errors = getErrors()
        if (Object.keys(errors).length === 0) {
            setFirmName(this.state.firm);
            browserHistory.push({
                pathname: `/dashboard`,
            })
        } else {
            this.setState({errors});
        }

    }

    render() {
        let {firms, password, errors} = this.state;

        return (
            <div>
                <div className="login">
                    <FormGroupSelect label="Предприятие"
                                     onChange={this.onChange.bind(this, 'firm')}
                                     name="firm"
                                     error={errors.firm}
                                     optionValue="value"
                                     object={firms}/>
                    <FormGroupInput label="Пароль"
                                    name="password"
                                    type="password"
                                    value={password}
                                    error={errors.password}
                                    onChange={this.onChange.bind(this, 'password')}/>
                    <div className="text-center">
                        <button type="button" className="btn btn-default btn-lg" onClick={this.login.bind(this)}>Войти
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;