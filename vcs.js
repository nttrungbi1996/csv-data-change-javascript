function replaceOddColumns(str) {
    const chars = str.split('');

    for (let i = 1; i < chars.length - 1; i += 2) {
        chars[i] = '＊';
    }

    return chars.join('');
}

const csvFile = 'csvfile.csv';

// CSVファイルを取得
let csv = new XMLHttpRequest();

// CSVファイルへのパス
csv.open("GET", "mgt_test.employee.csv", true);

// csvファイル読み込み完了時の処理
csv.onload = function () {
    if (csv.status === 200) {
        let csvArray = [];
        let start = 2;

        // 改行ごとに配列化
        let lines = csv.responseText.split(/\r\n|\n/);

        // 1行ごとに処理
        for (let i = 0; i < lines.length; ++i) {
            let cells = lines[i].split(",");
            if (i >= start && cells.length > 1) {
                cells[2] = replaceOddColumns(cells[2]);
                cells[3] = replaceOddColumns(cells[3]);
            }
            csvArray.push(cells);
        }

        const csvData = csvArray.map(row => row.join(',')).join('\n');
        console.log(csvData);

        // link download 作成
        let bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var blob =new Blob([bom, csvData],{type:"text/csv"}); //配列に上記の文字列(str)を設定
        var link =document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download ="tempdate.csv";
        link.click();

    } else {
        console.error("CSVファイルの読み込みに失敗しました。");
    }
};

// csvファイル読み込み失敗時の処理
csv.onerror = function () {
    console.error("CSVファイルの読み込みに失敗しました。");
};

csv.send(null);

// function downloadCSV(csvData, fileName) {
//     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//     if (navigator.msSaveBlob) { // Internet Explorer用の処理
//         navigator.msSaveBlob(blob, fileName);
//     } else {
//         const link = document.createElement('a');
//         if (link.download !== undefined) {
//             const url = URL.createObjectURL(blob);
//             link.setAttribute('href', url);
//             link.setAttribute('download', fileName);
//             link.style.visibility = 'hidden';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     }
// }

// const data = [
//     ['Column1', 'Column2', 'Column3'], // ヘッダー行
//     ['Data1', 'Data2', 'Data3'],       // データ行
//     ['Data4', 'Data5', 'Data6']        // データ行
// ];

// // CSVデータを作成
// let csvData = data.map(row => row.join(',')).join('\n');

// // ファイル名として使用する日付を取得
// const today = new Date();
// const fileName = `data_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.csv`;

// // CSVファイルをダウンロード
// downloadCSV(csvData, fileName);
