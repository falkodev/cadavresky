<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
  public function getPageAction(Page $page)
  {
    $response = new JsonResponse();
    $response->setData(array(
      'data' => $page->getContent()
    ));

    return $response;
  }

  /**
   * @Route("/post/pages/{id}", name="api_post_page")
   * @Method({"POST"})
   */
  public function postPageAction(Request $request, Page $page)
  {
    if ($request->isXMLHttpRequest()) {
      $content = $request->request->get('data');
      $page->setContent($content);

      $em = $this->getDoctrine()->getManager();
      $em->flush();

      $response = new JsonResponse();
      $response->setData(array(
        'success' => true
      ));

      return $response;
    }

    return new Response('Only AJAX');
  }
}
