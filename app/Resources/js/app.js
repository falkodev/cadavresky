import React    from 'react';
import ReactDom from 'react-dom';

import history               from './helpers/history';
import { connectionHandler } from './helpers/ajax';
import Layout                from './Layout';
import Page                  from './Page';
import Login                 from './Login';
import Contact               from './Contact';
import DisplayProject        from './DisplayProject';

export default function render(location, isAdminLoggedIn=false) {
  let urlMatch;
  let component;

  if(process.env.host === '/') { //prod server
    urlMatch = location.pathname;
  } else {
    let transformedPathname = process.env.host.split('/').join('\\/');
    transformedPathname = '/\\/' + transformedPathname + '(.*)/';
    const path = location.pathname.match(eval(transformedPathname));

    if(path) { //from url
      urlMatch = path[1];
    } else { //from Link
      urlMatch = '/'+location.pathname;
    }
  }

  switch (true) {
//    case (/^$/).test(urlMatch): // regex: urlMatch empty -> homepage
//      component = <Page page={2} />;
//      break;
//    case (/^\/$/).test(urlMatch): // regex: urlMatch = '/' -> homepage
//      component = <Page page={2} />;
//      break;
    // prod: /\/login/
    case (/dev\/login/).test(urlMatch):
      component = <Login callbackParent={connectionHandler} />;
      break;
    case (/dev\/whoswho/).test(urlMatch): // regex -> allow '/whoswho' and '/whoswho/'
      component = <Page page={2} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/dev\/projectology/).test(urlMatch):
      component = <Page page={3} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/dev\/zoo/).test(urlMatch):
      component = <Page page={4} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/dev\/shop/).test(urlMatch):
      component = <Page page={5} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/dev\/goodies/).test(urlMatch):
      component = <Page page={6} isAdminLoggedIn={isAdminLoggedIn} />;
      break;
    case (/dev\/wear\/\w/).test(urlMatch): // regex:\w -> any alphanumeric character (in order to test /wear/xxx for example)
      component = <DisplayProject page={7} />;
      break;
    case (/dev\/wear/).test(urlMatch):
      component = <Page page={7} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/dev\/adorn\/\w/).test(urlMatch): // regex:\w -> any alphanumeric character (in order to test /adorn/xxx for example)
      component = <DisplayProject page={8} />;
      break;
    case (/dev\/adorn/).test(urlMatch):
      component = <Page page={8} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/dev\/collaboratory\/\w/).test(urlMatch): // regex:\w -> any alphanumeric character (in order to test /collaboratory/xxx for example)
      component = <DisplayProject page={9} />;
      break;
    case (/dev\/collaboratory/).test(urlMatch):
      component = <Page page={9} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/dev\/buddies\/\w/).test(urlMatch): // regex:\w -> any alphanumeric character (in order to test /buddies/xxx for example)
      component = <DisplayProject page={10} />;
      break;
    case (/dev\/buddies/).test(urlMatch):
      component = <Page page={10} isAdminLoggedIn={isAdminLoggedIn} project="true" />;
      break;
    case (/dev\/contact/).test(urlMatch):
      component = <Contact />;
      break;
    /******* ajout dev *******/
    case (/dev/).test(urlMatch):
      component = <Page page={2} />;
      break;
    default:
      component = <Page page={2} isAdminLoggedIn={isAdminLoggedIn}/>;
      /***** fin ajout dev *****/
//    default: // error 404
//      component = <Page page={1} />;
  }

  ReactDom.render((
    <Layout>{component}</Layout>
  ), document.getElementById('app'));
}

render(history.getCurrentLocation());
history.listen(render);
