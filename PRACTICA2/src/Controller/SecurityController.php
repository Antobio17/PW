<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends IndexController
{

    /**
     * @Route("/login", name="app_login")
     *
     * @return Response Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
         if ($this->getUser()):
             return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                 'logged' => TRUE,
             ));
         else:
             return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                 'logged' => FALSE,
             ));
         endif;
    }

    /**
     * @Route("/logout", name="app_logout")
     *
     * @return Response Response
     */
    public function logout(): Response
    {
        return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
    }
}
