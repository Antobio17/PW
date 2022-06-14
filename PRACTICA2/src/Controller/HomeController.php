<?php

namespace App\Controller;

use App\Entity\Exhibition;
use App\Entity\ImageFile;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class HomeController extends IndexController
{

    /************************************************* CONSTANTS **************************************************/

    public const ROUTE_HOME_PAGE = 'home_page';

    /************************************************* PROPERTIES *************************************************/

    /************************************************** ROUTING ***************************************************/

    /**
     * @Route("/", name="home_page")
     *
     * @return JsonResponse JsonResponse
     */
    public function homePage(Request $request): Response
    {
        $logged = $request->query->get('logged');
        $flashMessages = array();
        if ($logged):
            $flashMessages[] = array(
                'message' => sprintf(
                    '¡Bienvenido %s! Has iniciado sesión con éxito.',
                    $this->getUser()->getUserIdentifier()
                ),
                'success' => TRUE,
            );
        endif;

        $flashMessage = $request->query->get('flashMessage');
        $flashSuccess = $request->query->get('flashSuccess');
        if ($flashMessage !== NULL && $flashSuccess !== NULL):
            $flashMessages[] = array(
                'message' => $flashMessage,
                'success' => $flashSuccess,
            );
        endif;

        return $this->render('pages/home.html.twig', array(
            'exhibitions' => $this->getExhibitionRepository()->findAllByStartAt(),
            'user' => $this->getUser(),
            'flashMessages' => $flashMessages
        ));
    }

    /************************************************* CONSTRUCT **************************************************/

    /**
     * AppController construct.
     *
     * @param ManagerRegistry $doctrine Doctrine to manage the ORM.
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        parent::__construct($doctrine);
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /*********************************************** PUBLIC METHODS ***********************************************/

    /********************************************** PROTECTED METHODS *********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}