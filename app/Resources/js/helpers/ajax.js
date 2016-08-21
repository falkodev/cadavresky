export function ajaxGet(file, callback) {
  var xObj = new XMLHttpRequest();

  xObj.open('GET', file, true);
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(null);
}

export function ajaxPost(file, data, callback) {
  var xObj = new XMLHttpRequest();

  xObj.open('POST', file, true);
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(data);
}
