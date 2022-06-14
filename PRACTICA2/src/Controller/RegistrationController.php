<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\LoginFormAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends IndexController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request                    $request, UserPasswordHasherInterface $userPasswordHasher,
                             UserAuthenticatorInterface $userAuthenticator, LoginFormAuthenticator $authenticator,
                             EntityManagerInterface     $entityManager): Response
    {
        $user = new User('', '', '', '');
        if (
            $this->getUser() !== NULL
            && (in_array(User::ROLE_ADMIN, $this->getUser()->getRoles())
                || in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles()))
        ):
            $user->setRoles(array(User::ROLE_USER, User::ROLE_COMISARIO));
        endif;

        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                'flashMessage' => 'Nuevo usuario registrado con éxito.',
                'flashSuccess' => TRUE,
            ));
        }

        return $this->render('registration/register.html.twig', [
            'navBar' => array('Home' => '/'),
            'registrationForm' => $form->createView(),
            'user' => $this->getUser()
        ]);
    }

    #[Route('/user/profile/update', name: 'update_user')]
    public function updateUser(Request                    $request, UserPasswordHasherInterface $userPasswordHasher,
                               UserAuthenticatorInterface $userAuthenticator, LoginFormAuthenticator $authenticator,
                               EntityManagerInterface     $entityManager): Response
    {
        if ($this->getUser() === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $user = $this->getUser();

        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid() && $user instanceof User) {
            // encode the plain password
            if ($form->get('plainPassword')->getData() !== NULL):
                $user->setPassword(
                    $userPasswordHasher->hashPassword(
                        $user,
                        $form->get('plainPassword')->getData()
                    )
                );
            endif;

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                'flashMessage' => 'Has actualizado tus datos correctamente.',
                'flashSuccess' => TRUE,
            ));
        }

        return $this->render('registration/update.html.twig', [
            'navBar' => array('Home' => '/'),
            'registrationForm' => $form->createView(),
            'user' => $this->getUser()
        ]);
    }

    /**
     * @Route("/check/user")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function checkUser(Request $request): JsonResponse
    {
        $userID = $request->query->get('id');
        $email = $request->query->get('email');

        $user = NULL;
        if ($email !== NULL):
            $user = $this->getUserRepository()->findByEmail($email);
            if ($userID !== NULL && $user !== NULL && (int)$userID === $user->getID()):
                $user = NULL;
            endif;
        endif;

        return new JsonResponse(array(
            'data' => $user === NULL,
            'result' => TRUE,
            'code' => 200,
            'debug' => array(
                'email' => $email,
            ),
        ));
    }
}
