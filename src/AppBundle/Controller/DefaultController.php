<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
  /**
   * @Route("/dev", name="app")
   */
  public function indexAction()
  {
      return $this->render('default/index.html.twig');
  }

  /**
   * @Route("/", name="in_progress")
   */
  public function inProgressAction()
  {
      return $this->render('default/in_progress.html.twig');
  }
}
