<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use AppBundle\Entity\User;

/**
 * @Route("/user")
 */
class UserController extends Controller
{
  /**
   * @Route("/login/{id}", name="user_login")
   * @Method({"POST"})
   */
  public function loginAction(Request $request, User $user)
  {
    $password = $request->request->get('password');
    $username = $request->request->get('username');

    $hashInDB = $user->getPassword();
    $usernameInDB = $user->getUsername();

    if (password_verify($password, $hashInDB) && $username === $usernameInDB) {
        $success = true;
    } else {
        $success = false;
    }

    $response = new JsonResponse();
    $response->setData(array(
      'success' => $success
    ));

    return $response;
  }

  /**
   * @Route("/logout", name="user_logout")
   * @Method({"POST"})
   */
  public function logoutAction(Request $request, User $user)
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
