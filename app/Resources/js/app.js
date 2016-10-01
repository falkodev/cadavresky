import React    from 'react';
import ReactDom from 'react-dom';

import history               from './helpers/history';
import { connectionHandler } from './helpers/ajax';
import Layout                from './Layout';
import Page                  from './Page';
import Login                 from './Login';
import Contact               from './Contact';
import SlideMedia            from './SlideMedia';

export default function render(location, isAdminLoggedIn=false) {
  let transformedPathname = process.env.host.split('/').join('\\/');
  transformedPathname = '/\\/' + transformedPathname + '(.*)/';
  const path = location.pathname.match(eval(transformedPathname));
  let component;
  let urlMatch;

  if(path) { //from url
    urlMatch = path[1];
  } else { //from Link
    urlMatch = '/'+location.pathname;
  }

  switch (true) {
    case (/^$/).test(urlMatch): // regex: urlMatch empty -> homepage
      component = <Page page={2} />;
      break;
    case (/^\/$/).test(urlMatch): // regex: urlMatch = '/' -> homepage
      component = <Page page={2} />;
      break;
    case (/\/login/).test(urlMatch):
      component = <Login callbackParent={connectionHandler} />;
      break;
    case (/\/whoswho\/\w/).test(urlMatch): // regex:\w -> any alphanumeric character (in order to test /whoswho/xxx for example)
      component = <Page page={2} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/\/whoswho/).test(urlMatch): // regex -> allow '/whoswho' and '/whoswho/'
      component = <Page page={2} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/projectology/).test(urlMatch):
      component = <Page page={3} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/zoo/).test(urlMatch):
      component = <Page page={4} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/shop/).test(urlMatch):
      component = <Page page={5} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/goodies/).test(urlMatch):
      component = <Page page={6} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/wear/).test(urlMatch):
      component = <Page page={7} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/\/adorn/).test(urlMatch):
      component = <Page page={8} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/\/collaboratory/).test(urlMatch):
      component = <Page page={9} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/buddies/).test(urlMatch):
      component = <Page page={10} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/\/contact/).test(urlMatch):
      component = <Contact />;
      break;
    case (/\/slide/).test(urlMatch):
      component = <SlideMedia />;
      break;
    default: // error 404
      component = <Page page={1} />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
