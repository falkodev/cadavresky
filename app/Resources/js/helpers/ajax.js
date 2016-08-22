function ajaxGet(file, callback) {
  var xObj = new XMLHttpRequest();

  xObj.open('GET', file, true);
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(null);
}

function ajaxPost(file, data, callback) {
  var xObj = new XMLHttpRequest();

  xObj.open('POST', file, true);
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(data);
}

let cache = [];
export function loadData(that, page) {
  if(cache.hasOwnProperty()  && cache[page].id === page) {
    that.setState({
      isLoading: false,
      content: cache[page].content
    });
  } else {
    let data;
    ajaxGet('api/get/pages/'+page,
      function(response){
        data = JSON.parse(response).data;
        that.setState({
          isLoading: false,
          content: data
        });
        cache[page] = {};
        cache[page].id = page;
        cache[page].content = data;
      });
  }
}
