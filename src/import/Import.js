import React, {Component} from 'react';
import Back from '../components/Back'
import {checkFirm, saveBase} from "../action/api";
import {browserHistory} from 'react-router'
import Orders from "../orders/Orders";

class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
        }
    }

    componentDidMount() {
        checkFirm();
    }

    selectFile (e) {
        let file= e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = () => {
            this.setState({
                orders: JSON.parse(reader.result)
            });
        }
    }

    updateBase(){
        saveBase(this.state.orders);
        browserHistory.push({
            pathname: `/dashboard`,
        })
    }

    render() {
        let {orders} = this.state;
        let ordersRender = null;
        if (orders){
            ordersRender = <div>
                <h3>Внимание! При нажатии на эту кнопку произойдет замена базы заказов фирмы.</h3>
                <button className="btn btn-save" onClick={this.updateBase.bind(this)}>Обновить базу</button>
                <Orders orders={orders} editable={false}/>
            </div>;
        }

        return (
            <div>
                <Back to='/dashboard'/>
                <div className="dashboard row">
                    <div className="col-sm-6 col-xs-12">
                        <div>
                            <button type="button" className="btn btn-save fileinput-button">
                                Загрузить базу
                                <input type="file" onChange={this.selectFile.bind(this)} value=""/>
                            </button>
                        </div>
                    </div>

                </div>
                {ordersRender}
            </div>
        );
    }
}

export default Import;