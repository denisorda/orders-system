import {browserHistory} from 'react-router'

export function save(order) {
    let id = order.id;
    let firmName = getFirmName();
    let orders = getOrders(firmName);
    orders[id] = {...order};
    localStorage.setItem(firmName, JSON.stringify(orders));
}

export function getVendors(){
    return {
        '1': 'ТОВ "Виват Кацелярия"',
        '2': 'СПД Кучеренко',
        '3': 'ТОВ "Грантрейд"',
        '4': 'ТОВ "Висла"',
        '5': 'СПД Троян',
        '6': 'СПД Зорин',
        '7': 'СПД Цушко',
    }
}

export function getOrders(){
    let firmName = getFirmName();
    let orders = localStorage.getItem(`${firmName}`);
    if (!orders || orders === undefined || orders === null) {
        return {};
    }
    return JSON.parse(orders);
}

export function getOrder(id){
    let firmName = getFirmName();
    let orders = JSON.parse(localStorage.getItem(`${firmName}`));
    return orders[id]['order'];
}

export function getFirms(){
    return {
        '1': 'ТОВ "Стор Трейд"',
        '2': 'СПД Сенченко',
        '3': 'СПД Остапенко',
    }
}

function passwords(){
    return {
        'ТОВ "Стор Трейд"': '123',
        'СПД Сенченко': '123456',
        'СПД Остапенко': '123456789',
    }
}

export function getPassword(firm){
    return passwords()[firm];
}

export function getFirmName(){
    let firmName = localStorage.getItem('firm');
    return firmName;
}

export function setFirmName(firmName){
    localStorage.setItem('firm', firmName);
}

export function cleanFirmName(){
    localStorage.setItem('firm', '');
}

export function checkFirm(){
    if (localStorage.getItem('firm') === ''){
        browserHistory.push({
            pathname: `/login`,
        })
    }
}

export function saveBase(orders) {
    let firmName = getFirmName();
    localStorage.setItem(firmName, JSON.stringify(orders));
}





