<?php

namespace App\Controller\Traits;

use App\Entity\Comment;
use App\Entity\Exhibition;
use App\Entity\ImageFile;
use App\Entity\Piece;
use App\Entity\User;
use App\Repository\CommentRepository;
use App\Repository\ExhibitionRepository;
use App\Repository\ImageFileRepository;
use App\Repository\PieceRepository;
use App\Repository\UserRepository;
use App\Controller\Traits\Interfaces\HasRepositoriesInterface;

/**
 * Trait to implement Repositories property.
 *
 * @see HasRepositoriesInterface
 */
trait RepositoriesTrait
{

    /************************************************* PROPERTIES *************************************************/

    /******************************************** GETTERS AND SETTERS *********************************************/

    /************************************************* CONSTRUCT **************************************************/

    /*********************************************** PUBLIC METHODS ***********************************************/

    /**
     * @inheritDoc
     * @return UserRepository UserRepository
     */
    public function getUserRepository(): UserRepository
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getEntityManager()->getRepository(User::class);
    }

    /**
     * @inheritDoc
     * @return ExhibitionRepository ExhibitionRepository
     */
    public function getExhibitionRepository(): ExhibitionRepository
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getEntityManager()->getRepository(Exhibition::class);
    }

    /**
     * @inheritDoc
     * @return PieceRepository PieceRepository
     */
    public function getPieceRepository(): PieceRepository
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getEntityManager()->getRepository(Piece::class);
    }

    /**
     * @inheritDoc
     * @return ImageFileRepository ImageFileRepository
     */
    public function getImageFileRepository(): ImageFileRepository
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getEntityManager()->getRepository(ImageFile::class);
    }

    /**
     * @inheritDoc
     * @return CommentRepository CommentRepository
     */
    public function getCommentRepository(): CommentRepository
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getEntityManager()->getRepository(Comment::class);
    }

    /********************************************** PROTECTED METHODS *********************************************/

    /*********************************************** STATIC METHODS ***********************************************/

}