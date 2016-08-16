<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use AppBundle\Entity\Page;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
  /**
   * @Route("/get/pages/{id}", name="api_get_page")
   * @Method({"GET"})
   */
  public function indexAction(Page $page)
  {
      $response = new JsonResponse();
      $response->setData(array(
        'data' => $page->getContent()
      ));

      return $response;
  }
}
