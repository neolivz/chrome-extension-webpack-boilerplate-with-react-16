import moment from 'moment';
import { unparse } from 'papaparse';

function getActualCoin (coin) {
    if(coin === 'BCC')
        return 'BCH'
    else 
        return coin
}

function dataMapper(transaction) {
  const resultData = {
    Date: '',
    Type: '',
    Exchange: 'CoinSpot',
    'Base amount': '',
    'Base currency': '',
    'Quote amount': '',
    'Quote currency': '',
    Fee: '',
    'Fee currency': '',
    'Costs/Proceeds': '',
    'Costs/Proceeds currency': '',
    'Sync Holdings': '1',
    'Sent/Received from': '',
    'Sent to': '',
    Notes: ''
  };

  const [buyCoin, sellCoin] = transaction['Market'].split('/');
  const [feeCoin, fee] = transaction['Fee'].split(' ');
  const [totalCoin, total] = transaction['Total'].split(' ');

  // Find Date (move it to a different function)
  let dateStr = transaction['Transaction Date'];
  dateStr = `${dateStr.substring(3, 5)}/${dateStr.substring(
    0,
    2
  )}${dateStr.substring(5)}`;
  const date = new Date(dateStr);
  resultData['Date'] = moment(date).format('YYYY-MM-DD HH:mm:SS Z');

  // Find type
  resultData['Type'] = transaction['Type'].toUpperCase();

  // Amount & Coin
  resultData['Base amount'] = parseFloat(
    transaction['Amount'].replace(',', '')
  );
  resultData['Base currency'] = getActualCoin(buyCoin);

  resultData['Per coin'] = parseFloat(
    transaction['Rate inc. fee'].replace(',', '')
  );
  resultData['Quote amount'] = parseFloat(total.replace(',', ''));

  resultData['Quote currency'] = getActualCoin(sellCoin);

  resultData['Fee'] = parseFloat(fee.replace(',', ''));
  resultData['Fee currency'] = getActualCoin(feeCoin);

  resultData['Diff'] = resultData['Base amount'] * resultData['Per coin'] - resultData['Quote amount'];
  
  if(resultData['Type'] === 'SELL'){
      resultData['Quote amount'] += resultData['Fee']
  }

  return resultData;
}

function getData(showDiff) {
  const rows = document.querySelectorAll(
    'table.table.table-bordered.table-condensed tr'
  );
  const headers = [];
  const data = [];
  let newRow = false;
  rows.forEach(row => {
    if (headers.length === 0) {
      const ths = row.querySelectorAll('th');
      ths.forEach(th => headers.push(th.textContent));
      if (showDiff) {
        if (ths[ths.length - 1].innerHTML !== 'Diff') {
          newRow = true;
          const diffTh = document.createElement('th');
          diffTh.innerHTML = 'Diff';
          row.appendChild(diffTh);
        }
      }
    } else {
      const tds = row.querySelectorAll('td');
      const dataPoint = {};
      tds.forEach((td, index) => {
        dataPoint[headers[index]] = td.textContent;
      });
      const mappedData = dataMapper(dataPoint);
      if (showDiff) {
        if (!newRow) {
          tds[tds.length - 1].innerHTML = mappedData['Diff'];
        } else {
          const diffTd = document.createElement('td');
          diffTd.innerHTML = mappedData['Diff'];
          row.appendChild(diffTd);
        }
      }
      data.push(mappedData);
    }
  });
  return data;
}

function makeCSV() {
  const data = getData().map(data => ({
    'Date': data['Date'],
    'Type': data['Type'],
    'Exchange': data['Exchange'],
    'Base amount': data['Base amount'],
    'Base currency': data['Base currency'],
    'Quote amount': data['Quote amount'],
    'Quote currency': data['Quote currency'],
    'Fee': data['Fee'],
    'Fee currency': data['Fee currency'],
    'Costs/Proceeds': data['Costs/Proceeds'],
    'Costs/Proceeds currency': data['Costs/Proceeds currency'],
    'Sync Holdings': data['Sync Holdings'],
    'Sent/Received from': data['Sent/Received from'],
    'Sent to': data['Sent to'],
    'Notes': data['Notes'],
  }));
  const csvData = new Blob([unparse(data)], { type: 'text/csv;charset=utf-8;' });
  const lastTransactionDate = document
    .querySelector('table.table.table-bordered.table-condensed tr td')
    .innerHTML.replace(/(\s|\/)/g, '_');

  const csvURL = window.URL.createObjectURL(csvData);
  const tempLink = document.createElement('a');
  tempLink.href = csvURL;
  tempLink.setAttribute('download', `coinspot_${lastTransactionDate}.csv`);
  tempLink.click();
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.instruction === 'diff') {
    getData(true);
    sendResponse({ status: 'Success' });
  } else if (request.instruction === 'download') {
    makeCSV();
    sendResponse({ status: 'Success' }); // snub them.
  }
});
