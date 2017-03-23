export function downloadOrders() {
    let firmName = localStorage.getItem('firm');
    let orders = localStorage.getItem(`${firmName}`);
    download(orders, `${firmName}.json`, 'txt')
}

// Function to download data to a file
function download(data, filename, type) {
    let a = document.createElement("a"),
        file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
