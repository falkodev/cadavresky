import React    from 'react';
import ReactDom from 'react-dom';

import history      from './helpers/history';
import { ajaxGet }  from './helpers/ajax';
import Layout       from './Layout';
import WhosWho      from './pages/WhosWho';
import Projectology from './pages/Projectology';
import Error404     from './pages/Error404';

let cache = {
  page: {
    id: '',
    content: ''
  }
};
function loadAjax(that, page) {
  if(cache.page.id === page && cache.page.content) {
    that.setState({
      content: cache.page.content
    });
  } else {
    that.setState({
      content:
        <svg id="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"></path>
          <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" transform="rotate(297.427 16 16)"></path>
        </svg>,
    });
    let data;
    ajaxGet('http://localhost/projets/cadavresky/web/app_dev.php/api/get/pages/'+page,
      function(response){
        data = JSON.parse(response).data;
        that.setState({
          content: data
        });
        cache.page.id = page;
        cache.page.content = data;
      });
  }
}

function render(location) {
  const path = location.pathname.split('/').pop();
  let component;

  switch (path) {
    case 'whoswho':
      component = <WhosWho onAjax={loadAjax} />;
      break;
    case 'projectology':
      component = <Projectology onAjax={loadAjax} />;
      break;
    default:
      component = <WhosWho onAjax={loadAjax} />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
