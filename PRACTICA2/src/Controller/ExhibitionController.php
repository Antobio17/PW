<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Exhibition;
use App\Entity\ImageFile;
use App\Entity\Piece;
use App\Entity\User;
use App\Form\ExhibitionFormType;
use App\Form\PieceFormType;
use App\Form\RegistrationFormType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExhibitionController extends IndexController
{

    /************************************************* CONSTANTS **************************************************/

    public const ROUTE_EXHIBITION_PAGE = 'exhibition_page';
    public const ROUTE_PIECE_PAGE = 'piece_page';

    /************************************************* PROPERTIES *************************************************/

    /************************************************** ROUTING ***************************************************/

    /**
     * @Route("/exhibition", name="exhibition_page")
     *
     * @return JsonResponse JsonResponse
     */
    public function exhibitionPage(Request $request): Response
    {
        $exhibitionID = $request->query->get('id');

        if ($exhibitionID !== NULL):
            $exhibition = $this->getExhibitionRepository()->findByID($exhibitionID);
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        if ($exhibition === NULL):
            $response = $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        else:
            $response = $this->render('pages/exhibition.html.twig', array(
                'exhibition' => $exhibition,
                'comments' => $exhibition->getComments(),
                'pieces' => $exhibition->getPieces(),
                'navBar' => array('Home' => '/'),
                'user' => $this->getUser(),
            ));
        endif;

        return $response;
    }

    /**
     * @Route("/exhibition/create")
     *
     * @return JsonResponse JsonResponse
     */
    public function createExhibition(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $imageFile = new ImageFile('', 0, 0);
        $exhibition = new Exhibition('', '', $imageFile, date_create(), '', '');

        # Mensajes Flash
        $flashMessages = array();
        $flashMessage = $request->query->get('flashMessage');
        $flashSuccess = $request->query->get('flashSuccess');
        if ($flashMessage !== NULL && $flashSuccess !== NULL):
            $flashMessages[] = array(
                'message' => $flashMessage,
                'success' => $flashSuccess,
            );
        endif;

        $form = $this->createForm(ExhibitionFormType::class, $exhibition);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            # Validación de formulario
            $exist = FALSE;
            $exhibitions = $this->getExhibitionRepository()->findByName($exhibition->getName());
            foreach ($exhibitions as $exh):
                if ($exh !== NULL and $exh->getAuthor() === $exhibition->getAuthor()):
                    $exist = TRUE;
                    break;
                endif;
            endforeach;
            if ($exist):
                $flashMessages[] = array(
                    'message' => sprintf(
                        'Ya existe una exposición para el autor %s con el nombre %s.',
                        $exhibition->getAuthor(),
                        $exhibition->getName()
                    ),
                    'success' => FALSE,
                );
            else:
                $uploadedFile = $form->get('imageSrc')->getData();
                if ($uploadedFile instanceof UploadedFile):
                    /** @noinspection DuplicatedCode */
                    try {
                        $uploadedFile->move(
                            $this->getParameter('kernel.project_dir') . '/public/build/images/',
                            $uploadedFile->getClientOriginalName()
                        );
                    } catch (FileException $e) {
                        return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                            'flashMessage' => 'Error al subir la imagen al servidor.',
                            'flashSuccess' => FALSE,
                        ));
                    }
                    $imageFile = new ImageFile(
                        $uploadedFile->getClientOriginalName(),
                        $form->get('width')->getData(),
                        $form->get('height')->getData(),
                    );
                    $this->persistAndFlush($imageFile);
                    $exhibition->setImageFile($imageFile);
                    $this->persistAndFlush($exhibition);
                    return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                        'flashMessage' => 'Nueva exposición creada con éxito.',
                        'flashSuccess' => TRUE,
                    ));
                endif;
            endif;
        }

        return $this->render('pages/exhibition.form.create.html.twig', array(
            'navBar' => array('Home' => '/'),
            'user' => $this->getUser(),
            'form' => $form->createView(),
            'flashMessages' => $flashMessages,
        ));
    }

    /**
     * @Route("/exhibition/edit")
     *
     * @param Request $request
     * @return Response
     */
    public function editExhibition(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $exhibitionID = $request->query->get('id');
        if ($exhibitionID !== NULL):
            $exhibition = $this->getExhibitionRepository()->findByID($exhibitionID);
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        if ($exhibition === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        /** @noinspection DuplicatedCode */
        $form = $this->createForm(ExhibitionFormType::class, $exhibition, array('trait_choices' => array(
            'width' => $exhibition->getImageFile()->getWidth(),
            'height' => $exhibition->getImageFile()->getHeight(),
        )));
        $form->handleRequest($request);

        $flashMessages = array();
        if ($form->isSubmitted() && $form->isValid()) {
            # Validación de formulario
            $exist = FALSE;
            $exhibitions = $this->getExhibitionRepository()->findByName($exhibition->getName());
            foreach ($exhibitions as $exh):
                if (
                    $exh !== NULL
                    && $exh->getAuthor() === $exhibition->getAuthor()
                    && $exh->getID() !== (int)$exhibitionID
                ):
                    $exist = TRUE;
                    break;
                endif;
            endforeach;

            /** @noinspection DuplicatedCode */
            if ($exist):
                $flashMessages[] = array(
                    'message' => sprintf(
                        'Ya existe una exposición para el autor %s con el nombre %s.',
                        $exhibition->getAuthor(),
                        $exhibition->getName()
                    ),
                    'success' => FALSE,
                );
            else:
                $uploadedFile = $form->get('imageSrc')->getData();
                if ($uploadedFile instanceof UploadedFile):
                    /** @noinspection DuplicatedCode */
                    try {
                        $uploadedFile->move(
                            $this->getParameter('kernel.project_dir') . '/public/build/images/',
                            $uploadedFile->getClientOriginalName()
                        );
                    } catch (FileException $e) {
                        return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                            'flashMessage' => 'Error al subir la imagen al servidor.',
                            'flashSuccess' => FALSE,
                        ));
                    }
                    $imageFile = new ImageFile(
                        $uploadedFile->getClientOriginalName(),
                        $form->get('width')->getData(),
                        $form->get('height')->getData(),
                    );
                    $this->persistAndFlush($imageFile);
                    $exhibition->setImageFile($imageFile);
                else:
                    $imageFile = $exhibition->getImageFile();
                    $imageFile->setWidth($form->get('width')->getData() ?? $imageFile->getWidth());
                    $imageFile->setHeight($form->get('height')->getData() ?? $imageFile->getHeight());
                    $this->persistAndFlush($imageFile);
                endif;

                $this->persistAndFlush($exhibition);
                return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
                    'flashMessage' => 'Exposición editada con éxito.',
                    'flashSuccess' => TRUE,
                    'id' => $exhibitionID,
                ));
            endif;
        }

        return $this->render('pages/exhibition.form.edit.html.twig', array(
            'navBar' => array('Home' => '/'),
            'user' => $this->getUser(),
            'form' => $form->createView(),
            'flashMessages' => $flashMessages,
        ));
    }

    /**
     * @Route("/exhibition/delete")
     *
     * @param Request $request
     *
     * @return JsonResponse JsonResponse
     */
    public function deleteExhibition(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $exhibitionID = $request->query->get('id');

        if ($exhibitionID !== NULL):
            $exhibition = $this->getExhibitionRepository()->findByID($exhibitionID);
            $this->getEntityManager()->remove($exhibition);
            $this->getEntityManager()->flush();
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
            'flashMessage' => 'Exposición eliminada con éxito.',
            'flashSuccess' => TRUE,
        ));
    }

    /**
     * @Route("/piece", name="piece_page")
     *
     * @return Response Response
     */
    public function piecePage(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $pieceID = $request->query->get('id');

        if ($pieceID !== NULL):
            $piece = $this->getPieceRepository()->findByID($pieceID);
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        if ($piece === NULL):
            $response = $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        else:
            $exhibition = $piece->getExhibition();
            $response = $this->render('pages/piece.html.twig', array(
                'piece' => $piece,
                'navBar' => array(
                    'Home' => '/',
                    $exhibition->getName() => sprintf('/exhibition?id=%d', $exhibition->getID())
                ),
                'user' => $this->getUser(),
            ));
        endif;

        return $response;
    }

    /**
     * @Route("/piece/create")
     *
     * @return JsonResponse JsonResponse
     */
    public function createPiece(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $exhibitionID = $request->query->get('exhibition_id');
        if ($exhibitionID === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;
        $exhibition = $this->getExhibitionRepository()->findByID($exhibitionID);
        if ($exhibition === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE, array(
                'flashMessage' => 'No existe la exposición en la que se intenta crear la pieza.',
                'flashSuccess' => FALSE,
            ));
        endif;

        $imageFile = new ImageFile('', 0, 0);
        $piece = new Piece($exhibition, '', '', $imageFile, '');

        $form = $this->createForm(PieceFormType::class, $piece);
        $form->handleRequest($request);

        $flashMessages = array();
        if ($form->isSubmitted() && $form->isValid()) {
            # Validación de formulario
            $oldPiece = $this->getPieceRepository()->findByName($piece->getName(), $piece->getAuthor(), $exhibitionID);
            if ($oldPiece !== NULL):
                $flashMessages[] = array(
                    'message' => sprintf(
                        'Ya existe una pieza para esta exposición con el nombre %s y autor %s.',
                        $piece->getName(),
                        $piece->getAuthor()
                    ),
                    'success' => FALSE,
                );
            else:
                $uploadedFile = $form->get('imageSrc')->getData();
                if ($uploadedFile instanceof UploadedFile):
                    /** @noinspection DuplicatedCode */
                    try {
                        $uploadedFile->move(
                            $this->getParameter('kernel.project_dir') . '/public/build/images/',
                            $uploadedFile->getClientOriginalName()
                        );
                    } catch (FileException $e) {
                        return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
                            'flashMessage' => 'Error al subir la imagen al servidor.',
                            'flashSuccess' => FALSE,
                            'id' => $exhibitionID
                        ));
                    }
                    $imageFile = new ImageFile(
                        $uploadedFile->getClientOriginalName(),
                        $form->get('width')->getData(),
                        $form->get('height')->getData(),
                    );
                    $this->persistAndFlush($imageFile);
                    $piece->setImageFile($imageFile);
                    $this->persistAndFlush($piece);
                    return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
                        'flashMessage' => 'Nueva pieza creada con éxito.',
                        'flashSuccess' => TRUE,
                        'id' => $exhibitionID
                    ));
                endif;
            endif;
        }

        return $this->render('pages/piece.form.create.html.twig', array(
            'navBar' => array(
                'Home' => '/',
                $exhibition->getName() => sprintf('/exhibition?id=%d', $exhibition->getID())
            ),
            'user' => $this->getUser(),
            'form' => $form->createView(),
            'flashMessages' => $flashMessages,
        ));
    }

    /**
     * @Route("/piece/edit")
     *
     * @param Request $request
     * @return Response
     */
    public function editPiece(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $pieceID = $request->query->get('id');

        if ($pieceID !== NULL):
            $piece = $this->getPieceRepository()->findByID($pieceID);
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        if ($piece === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        /** @noinspection DuplicatedCode */
        $form = $this->createForm(PieceFormType::class, $piece, array('trait_choices' => array(
            'width' => $piece->getImageFile()->getWidth(),
            'height' => $piece->getImageFile()->getHeight(),
        )));
        $form->handleRequest($request);

        $flashMessages = array();
        if ($form->isSubmitted() && $form->isValid()) {
            # Validación de formulario
            $oldPiece = $this->getPieceRepository()->findByName(
                $piece->getName(),
                $piece->getAuthor(),
                $piece->getExhibition()->getID()
            );
            if ($oldPiece !== NULL && $oldPiece->getID() !== (int)$pieceID):
                $flashMessages[] = array(
                    'message' => sprintf(
                        'Ya existe una pieza para esta exposición con el nombre %s y autor %s.',
                        $piece->getName(),
                        $piece->getAuthor()
                    ),
                    'success' => FALSE,
                );
            else:
                $uploadedFile = $form->get('imageSrc')->getData();
                if ($uploadedFile instanceof UploadedFile):
                    /** @noinspection DuplicatedCode */
                    try {
                        $uploadedFile->move(
                            $this->getParameter('kernel.project_dir') . '/public/build/images/',
                            $uploadedFile->getClientOriginalName()
                        );
                    } catch (FileException $e) {
                        return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
                            'flashMessage' => 'Error al subir la imagen al servidor.',
                            'flashSuccess' => FALSE,
                            'id' => $piece->getExhibition()->getID()
                        ));
                    }
                    $imageFile = new ImageFile(
                        $uploadedFile->getClientOriginalName(),
                        $form->get('width')->getData(),
                        $form->get('height')->getData(),
                    );
                    $this->persistAndFlush($imageFile);
                    $piece->setImageFile($imageFile);
                else:
                    $imageFile = $piece->getExhibition()->getImageFile();
                    $imageFile->setWidth($form->get('width')->getData() ?? $imageFile->getWidth());
                    $imageFile->setHeight($form->get('height')->getData() ?? $imageFile->getHeight());
                    $this->persistAndFlush($imageFile);
                endif;

                $this->persistAndFlush($piece);
                return $this->redirectToRoute(static::ROUTE_PIECE_PAGE, array(
                    'flashMessage' => 'Pieza editada con éxito.',
                    'flashSuccess' => TRUE,
                    'id' => $pieceID,
                ));
            endif;
        }

        $exhibition = $piece->getExhibition();
        return $this->render('pages/piece.form.edit.html.twig', array(
            'navBar' => array(
                'Home' => '/',
                $exhibition->getName() => sprintf('/exhibition?id=%d', $exhibition->getID())
            ),
            'user' => $this->getUser(),
            'form' => $form->createView(),
            'exhibition' => $piece->getExhibition(),
            'flashMessages' => $flashMessages,
        ));
    }

    /**
     * @Route("/piece/delete")
     *
     * @param Request $request
     *
     * @return Response Response
     */
    public function deletePiece(Request $request): Response
    {
        if (
            $this->getUser() === NULL
            || (!in_array(User::ROLE_COMISARIO, $this->getUser()->getRoles())
                && !in_array(User::ROLE_ADMIN, $this->getUser()->getRoles()))
        ):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $pieceID = $request->query->get('id');

        if ($pieceID !== NULL):
            $piece = $this->getPieceRepository()->findByID($pieceID);
            if ($piece !== NULL):
                $exhibitionID = $piece->getExhibition()->getID();
                $this->getEntityManager()->remove($piece);
                $this->getEntityManager()->flush();
            else:
                return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
            endif;
        else:
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
            'flashMessage' => 'Pieza eliminada con éxito.',
            'flashSuccess' => TRUE,
            'id' => $exhibitionID,
        ));
    }

    /**
     * @Route("/exhibition/comment")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function commentExhibition(Request $request): Response
    {
        if ($this->getUser() === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $exhibitionID = $request->query->get('exhibition_id');
        $message = $request->query->get('message');
        $user = $this->getUser();
        $exhibition = $this->getExhibitionRepository()->findByID($exhibitionID);
        if ($user === NULL || $exhibition === NULL):
            return $this->redirectToRoute(HomeController::ROUTE_HOME_PAGE);
        endif;

        $comment = new Comment($message, $exhibition, $user, date_create());
        $this->persistAndFlush($comment);

        return $this->redirectToRoute(static::ROUTE_EXHIBITION_PAGE, array(
            'id' => $exhibitionID,
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