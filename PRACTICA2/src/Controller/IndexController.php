<?php

namespace App\Controller;

use App\Entity\Exhibition;
use App\Entity\Interfaces\ORMInterface;
use App\Controller\Traits\Interfaces\HasRepositoriesInterface;
use App\Controller\Traits\RepositoriesTrait;
use App\Entity\User;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class IndexController extends AbstractController implements HasRepositoriesInterface
{

    /************************************************* CONSTANTS **************************************************/

    /************************************************* PROPERTIES *************************************************/

    /**
     * @var ObjectManager
     */
    protected ObjectManager $entityManager;

    use RepositoriesTrait;

    /************************************************** ROUTING ***************************************************/

    /**
     * @Route("/signup")
     *
     * @return JsonResponse JsonResponse
     */
    public function signupPage(Request $request): Response
    {
        return $this->render('pages/signup.html.twig', array('mainCSSClass' => 'page-signup'));
    }

    /**
     * @Route("/contact")
     *
     * @return JsonResponse JsonResponse
     */
    public function contactPage(Request $request): Response
    {
        return $this->render('pages/contact.html.twig', array(
            'navBar' => array('Home' => '/'),
            'user' => $this->getUser(),
        ));
    }

    /**
     * @Route("/doc")
     *
     * @return JsonResponse JsonResponse
     */
    public function documentationPage(Request $request): Response
    {
        return $this->render('pages/doc.html.twig', array(
            'navBar' => array('Home' => '/'),
            'user' => $this->getUser(),
        ));
    }

    /**
     * @Route("/category")
     *
     * @return JsonResponse JsonResponse
     */
    public function categoryPage(Request $request): Response
    {
        $category = $request->query->get('type');

        if (!in_array((int)$category, array(
            Exhibition::CATEGORY_PHOTOGRAPHY,
            Exhibition::CATEGORY_PAINTING,
            Exhibition::CATEGORY_SCULPTURE,
        ))):
            $response = $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        return $this->render('pages/category.html.twig', array(
            'navBar' => array('Home' => '/'),
            'category' => $category,
            'exhibitions' => $this->getExhibitionRepository()->findByCategory($category),
            'user' => $this->getUser(),
        ));
    }

    /**
     * @Route("/create/admin/user")
     *
     * @return JsonResponse JsonResponse
     */
    public function createAdminUser(Request $request): Response
    {
        $user = $this->getUserRepository()->findByEmail('admin@admin.com');

        if ($user === NULL):
            $user = new User(
                'admin@admin.com',
                '$2y$13$fQ7JhTt0Y.rtL0CTIK/rfu5EbBiNGo7lutqCRtakpGd3YIb4gny0u',
                'admin',
                'admin',
                date_create(),
                array(User::ROLE_USER, User::ROLE_ADMIN)
            );
            $this->persistAndFlush($user);
        endif;

        return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
            'flashMessage' => 'Usuario administrador creado con éxito.',
            'flashSuccess' => TRUE,
        ));
    }

    /************************************************* CONSTRUCT **************************************************/

    /**
     * IndexController construct.
     *
     * @param ManagerRegistry $doctrine Doctrine to manage the ORM.
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->setEntityManager($doctrine->getManager());
    }

    /******************************************** GETTERS AND SETTERS *********************************************/

    /**
     * Obtiene la propiedad EntityManager de la entidad.
     *
     * @return ObjectManager ObjectManager
     */
    public function getEntityManager(): ObjectManager
    {
        return $this->entityManager;
    }

    /**
     * Establece el entityManager en la entidad.
     *
     * @param ObjectManager $entityManager EntityManager para el manejo ORM.
     *
     * @return $this $this
     */
    public function setEntityManager(ObjectManager $entityManager): self
    {
        $this->entityManager = $entityManager;

        return $this;
    }

    /*********************************************** PUBLIC METHODS ***********************************************/

    /**
     * Funcionalidad para persistir entidades.
     *
     * @param ORMInterface $object Objeto a persistir.
     *
     * @return bool bool
     */
    public function persistAndFlush(ORMInterface $object): bool
    {
        $persisted = FALSE;
        try {
            $entityManager = $this->getEntityManager();
            $entityManager->persist($object);
            $entityManager->flush();
            $persisted = TRUE;
        } catch (Exception $e) {

        }

        return $persisted;
    }


    /**
     * @return UserInterface|null UserInterface|null
     */
    public function getAdminUser(): ?UserInterface
    {
        return $this->getUserRepository()->findByEmail('admin@admin.com');
    }

    /********************************************** PROTECTED METHODS *********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}