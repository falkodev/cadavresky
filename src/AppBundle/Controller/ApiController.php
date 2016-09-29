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
   * @Route("/get/pages/{id}/{language}", name="api_get_page")
   * @Method({"GET"})
   */
  public function getPageAction(Page $page, $language = 'fr')
  {
    $response = new JsonResponse();

    if($language === 'fr') {
      $content = $page->getContent();
    } else {
      $content = $page->getContentEn();
    }
    $response->setData(array(
      'data' => $content
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

  /**
   * @Route("/post/projects/{page}/{folder}", name="api_post_project_new")
   * @Method({"POST"})
   */
  public function postProjectNewAction(Request $request, $page, $folder)
  {
    if ($request->isXMLHttpRequest()) {
      $response = new JsonResponse();

      $folder = $this->slugify($folder);
      $path = 'projects/'.$page.'/'.$folder;

      if (!file_exists($path) && !is_dir($path)) {
        if (!file_exists('projects/'.$page)) {
          mkdir('projects/'.$page);
        }
        mkdir($path);
        mkdir($path.'/cover1');
        mkdir($path.'/cover2');
        mkdir($path.'/medias');
        $response->setData(array(
          'success' => true
        ));
      } else {
        $response->setData(array(
          'success' => false
        ));
      }

      return $response;
    }

    return new Response('Only AJAX');
  }

  /**
   * @Route("/get/projects/{page}", name="api_get_projects")
   * @Method({"GET"})
   */
  public function getProjects(Request $request, $page)
  {
    $response = new JsonResponse();

    $path = 'projects/'.$page;
    $folders = array_diff(scandir($path), array('..', '.', '.DS_Store'));

    $response->setData(array(
      'data' => $folders
    ));

    return $response;
  }

    /**
   * @Route("/get/projects/{page}/{folder}", name="api_get_project_medias")
   * @Method({"GET"})
   */
  public function getProjectMedias(Request $request, $page, $folder)
  {
    $response = new JsonResponse();

    $path = 'projects/'.$page.'/'.$folder;
    $cover1 = array_diff(scandir($path.'/cover1'), array('..', '.', '.DS_Store'));
    $cover2 = array_diff(scandir($path.'/cover2'), array('..', '.', '.DS_Store'));
    $medias = array_diff(scandir($path.'/medias'), array('..', '.', '.DS_Store'));

    $response->setData(array(
      'cover1' => $cover1,
      'cover2' => $cover2,
      'medias' => $medias
    ));

    return $response;
  }

  /**
   * @Route("/post/projects/{page}/{folder}/{type}", name="api_post_project_upload_files")
   * @Method({"POST"})
   *
   * $page : page (to wear, to adorn...)
   * $folder : project name
   * $type : cover1, cover2, medias
   */
  public function postProjectUploadFilesAction(Request $request, $page, $folder, $type)
  {
    if ($request->isXMLHttpRequest()) {
      $path = 'projects/'.$page.'/'.$folder.'/'.$type;

      //for covers, delete existing file before adding a new one
      if($type === 'cover1' || $type === 'cover2') {
        array_map('unlink', glob($path.'/*'));
      }

      $files = $request->files->get('files');
      foreach ($files as $file){
        $name = $file->getClientOriginalName();
        $file->move($path, $name);
      }

      $response = new JsonResponse();
      if ($files) {
        $response->setData(array(
          'success' => true,
        ));
      } else {
        $response->setData(array(
          'success' => false,
        ));
      }

      return $response;
    }

    return new Response('Only AJAX');
  }

  /**
   * @Route("/delete/projects/{file}", name="api_delete_file")
   * @Method({"DELETE"})
   */
  public function deleteFileAction(Request $request)
  {
    if ($request->isXMLHttpRequest()) {
      $path = str_replace('_', '/', $file); // $file contains the whole path, but "/" were converted to "_" to fit in url
      unlink($path);

      $response = new JsonResponse();
      if ($path) {
        $response->setData(array(
          'success' => true,
        ));
      } else {
        $response->setData(array(
          'success' => false,
        ));
      }

      return $response;
    }

    return new Response('Only AJAX');
  }

  /**
   * @Route("/post/email", name="api_send_email")
   * @Method({"POST"})
   */
  public function sendEmailAction(Request $request)
  {
    if ($request->isXMLHttpRequest()) {
      $email = $request->request->get('email');
      $message = $request->request->get('message');

      $message_body = mb_convert_encoding($message, 'HTML-ENTITIES', 'UTF-8');
      $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
          <META HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=iso-8859-1">
          <html><body style="color:#434343;">';
      $body .= '<p style="color:#434343;">Message de '.$email.'</p>';
      $body .= '<p style="color:#434343;">';
      $body .= nl2br($message_body);
      $body .= '</body></html>';
      $headers = 'Content-Type: text/html; charset=iso-8859-1\r\n';
      $headers .= 'From: cadavresky<noreply@cadavresky.com>\r\n';
      $headers .= 'Reply-To: <'.$email.'>\r\n';

      $sent = mail('charlotteabale@gmail.com', 'Cadavresky - Nouveau message depuis le formulaire de contact', $body, $headers);

      $response = new JsonResponse();
      $response->setData(array(
        'success' => $sent,
      ));

      return $response;
    }

    return new Response('Only AJAX');
  }

  static private function slugify($text)
  {
    // replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, '-');

    // remove duplicate -
    $text = preg_replace('~-+~', '-', $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
  }
}
