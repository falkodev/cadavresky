<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
  /**
   * @Route("/get/pages/{id}", name="api_get_page")
   * @Method({"GET"})
   * @ParamConverter("page", class="AppBundle:Page")
   */
  public function indexAction(Page $page)
  {
      return $this->render('default/index.html.twig');
  }
}
