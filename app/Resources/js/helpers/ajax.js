import render from '../app';

let pathname = location.protocol + '//' + location.host + '/' + process.env.host;
if (process.env.NODE_ENV === 'production' && process.env.localhost) {
  pathname += '/web';
}

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

function ajaxDelete(file, callback) {
  var xObj = new XMLHttpRequest();

  xObj.open('DELETE', file, true);
  xObj.setRequestHeader("X-Requested-With","XMLHttpRequest");
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(null);
}

let cache = [];
export function loadData(that, page, language) {
  if(cache.hasOwnProperty(page) && cache[page].id === page && cache[page].language === language) {
    that.setState({
      isLoading: false,
      content: cache[page].content
    });
  } else {
    let data;
    ajaxGet(pathname+'/api/get/pages/'+page+'/'+language,
      function(response){
        const jsonContent = JSON.parse(response).data;
        that.setState({
          isLoading: false,
          content: jsonContent
        });
        cache[page] = {};
        cache[page].id = page;
        cache[page].content = jsonContent;
        cache[page].language = language;
      });
  }
}

export function sendData(that, page, data, language) {
  that.setState({isLoading:true});

  ajaxPost(pathname+'/api/post/pages/'+page+'/'+language,
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

  ajaxPost(pathname+'/user/login/1',
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
  ajaxPost(pathname+'/api/post/projects/'+page+'/'+folder,
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
  ajaxGet(pathname+'/api/get/projects/'+page,
    function(response){
      const jsonContent = JSON.parse(response).data;
      const folders = Object.keys(jsonContent).map(function(k) { return jsonContent[k] });
      that.setState({
        folders
      });
    });
}

export function getMedias(that, page, folder) {
  ajaxGet(pathname+'/api/get/projects/'+page+'/'+folder,
    function(response){
      const jsonCover1 = JSON.parse(response).cover1;
      const jsonCover2 = JSON.parse(response).cover2;
      const jsonMedias = JSON.parse(response).medias;
      const path = pathname+'/../projects/'+page+'/'+folder;

      const cover1 = typeof jsonCover1[Object.keys(jsonCover1)[0]] == 'undefined' ? false : path+'/cover1/'+jsonCover1[Object.keys(jsonCover1)[0]];
      const cover2 = typeof jsonCover2[Object.keys(jsonCover2)[0]] == 'undefined' ? false : path+'/cover2/'+jsonCover2[Object.keys(jsonCover2)[0]];
      const medias = Object.keys(jsonMedias).map(key => path+'/medias/'+jsonMedias[key]);

      that.setState({
        cover1OnServer: cover1,
        cover2OnServer: cover2,
        mediasOnServer: medias,
      });
    });
}

export function uploadFiles(that, page, folder, data, progressBar) {
  let type;
  if (progressBar === 'barCover1') {
    type = 'cover1';
  } else if (progressBar === 'barCover2') {
    type = 'cover2';
  } else {
    type = 'medias';
  }

  ajaxPost(pathname+'/api/post/projects/'+page+'/'+folder+'/'+type,
    data,
    function(response){
      const jsonResponse = JSON.parse(response);

      if (progressBar === 'barCover1') {
        that.setState({
          cover1Progress: false,
        });
        if (jsonResponse.success) {
          that.setState({ cover1UploadSuccess: true, cover1UploadIssue: false, cover1OnServer: false });
        } else {
          that.setState({ cover1UploadSuccess: false, cover1UploadIssue: true });
        }
      } else if (progressBar === 'barCover2') {
        that.setState({
          cover2Progress: false,
        });
        if (jsonResponse.success) {
          that.setState({ cover2UploadSuccess: true, cover2UploadIssue: false, cover2OnServer: false });
        } else {
          that.setState({ cover2UploadSuccess: false, cover2UploadIssue: true });
        }
      } else {
        that.setState({
          mediasProgress: false,
        });
        if (jsonResponse.success) {
          getMedias(that, page, folder);
          that.setState({ mediasUploadSuccess: true, mediasUploadIssue: false, medias: null });
        } else {
          that.setState({ mediasUploadSuccess: false, mediasUploadIssue: true });
        }
      }
    },
    true, // no Content-Type to be able to upload file
    progressBar);
}

export function deleteFile(that, file) {
  console.log('file to delete', file);
  const path = file.replace('../../', '').split('/').join('@@');
  const page = path.split('@@')[1];
  const folder = path.split('@@')[2];

  ajaxDelete(pathname+'/api/delete/projects/'+path,
    function(response){
      getMedias(that, page, folder);
    });
}

export function sendEmail(that, data) {
  ajaxPost(pathname+'/api/post/email',
    data,
    function(response){
      const jsonContent = JSON.parse(response).success;
      that.setState({ isLoading: false });
      if(jsonContent) {
        that.setState({ hasError: false, sentSuccess: true, email: '', message: '' });
      } else {
        that.setState({ hasError: true, sentSuccess: false });
      }
    });
}
