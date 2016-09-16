import render from '../app';

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

function ajaxPost(file, data, callback, noContentType, progressBar) {
  var xObj = new XMLHttpRequest();
  xObj.open('POST', file, true);
  if(!noContentType) { xObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); }
  xObj.setRequestHeader("X-Requested-With","XMLHttpRequest");
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  if (progressBar) {
    xObj.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentComplete = ((e.loaded / e.total) * 100).toFixed(0);
        document.getElementById(progressBar).style.width = percentComplete + '%';
      }
    };
  }
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
        const jsonContent = JSON.parse(response).data;
        that.setState({
          isLoading: false,
          content: jsonContent
        });
        cache[page] = {};
        cache[page].id = page;
        cache[page].content = jsonContent;
      });
  }
}

export function sendData(that, page, data) {
  that.setState({isLoading:true});

  ajaxPost('api/post/pages/'+page,
    'data='+data,
    function(response){
      const jsonResponse = JSON.parse(response);
      if(jsonResponse.success) {
        that.setState({
          isLoading: false,
          editMode: false,
        });
      } else {
        that.setState({
          isLoading: false,
          hasError: true,
        });
      }
    });
}

export function login(that, data) {
  that.setState({isLoading:true});

  ajaxPost('user/login/1',
    data,
    function(response){
      const jsonResponse = JSON.parse(response);
      if(jsonResponse.success) {
        that.setState({
          isLoading: false,
          isAdminLoggedIn: true,
        });
        that.props.callbackParent(true); // call connectionHandler in App.js
      } else {
        that.setState({
          isLoading: false,
          hasError: true,
        });
      }
    });
}

let isAdminLoggedIn;
export function connectionHandler(log) {
  isAdminLoggedIn = log;
  window.history.pushState({}, null, "whoswho"); //change url
  render({pathname: 'whoswho'}, isAdminLoggedIn); //render page in editable mode with isAdminLoggedIn = true
}

export function addFolder(that, page, folder) {
  ajaxPost('api/post/projects/'+page+'/'+folder,
    '', //no data
    function(response){
      const jsonResponse = JSON.parse(response);
      if(jsonResponse.success) {
        that.setState({
          isRequesting: false,
          showInput: false,
          showFolderCreationSuccess: true,
          newFolder: folder,
        });
        getFolders(that, page);
      } else {
        that.setState({
          showErrorCreation: true,
          isRequesting: false,
        });
      }
    });
}

export function getFolders(that, page) {
  ajaxGet('api/get/projects/'+page,
    function(response){
      const jsonContent = JSON.parse(response).data;
      const folders = Object.keys(jsonContent).map(function(k) { return jsonContent[k] });
      that.setState({
        folders
      });
    });
}

export function uploadFiles(that, page, folder, data, progressBar) {
  ajaxPost('api/post/projects/'+page+'/'+folder+'/files',
    data,
    function(response){
      const jsonResponse = JSON.parse(response);
      that.setState({
        cover1Progress: false,
      });
      if (jsonResponse.success) {
        that.setState({ cover1UploadSuccess: true, cover1UploadIssue: false });
      } else {
        that.setState({ cover1UploadSuccess: false, cover1UploadIssue: true });
      }
    },
    true, // no Content-Type to be able to upload file
    progressBar);
}
