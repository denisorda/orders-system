import React, {Component} from 'react';
import {Link} from 'react-router'
import {checkFirm} from "./action/api";
import {downloadOrders} from "./action/export";
import {mocup} from "./action/genLI";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lorem: mocup()
        }
    }

    componentDidMount() {
        checkFirm();
    }

    download() {
        downloadOrders();
    }

    render() {
        let text = this.state.lorem;
        let mocup = <div>
            <h1 className="text-uppercase dashboard-title">Lorem Ipsum</h1>
            <div className="dashboard-text">
                {text}
            </div>
        </div>;
        return (
            <div className="dashboard row">
                <div className="col-sm-8 col-xs-12">
                    {mocup}
                </div>
                <div className="btn-dashboard-container col-sm-4 col-xs-12">
                    <div>
                        <Link to="new" className="btn btn-dashboard">Новый заказ</Link>
                    </div>
                    <div>
                        <Link to="orders" className="btn btn-dashboard">Список заказов</Link>
                    </div>
                    <div>
                        <button type="button" onClick={this.download.bind(this)}
                                className="btn btn-dashboard">Экспорт
                        </button>
                    </div>
                    <div>
                        <Link to="import" className="btn btn-dashboard">Импорт</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;