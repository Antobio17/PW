<?php

namespace App\Controller\Traits\Interfaces;

use App\Repository\CommentRepository;
use App\Repository\ExhibitionRepository;
use App\Repository\ImageFileRepository;
use App\Repository\PieceRepository;
use App\Repository\UserRepository;

/**
 * RepositoriesTrait interface.
 */
interface HasRepositoriesInterface
{

    /******************************************** GETTERS AND SETTERS *********************************************/

    /*********************************************** PUBLIC METHODS ***********************************************/

    /**
     * Facade that returns an instance of the UserRepository.
     *
     * @return UserRepository UserRepository
     */
    public function getUserRepository(): UserRepository;

    /**
     * Facade that return an instance of the ExhibitionRepository.
     *
     * @return ExhibitionRepository ExhibitionRepository
     */
    public function getExhibitionRepository(): ExhibitionRepository;

    /**
     * Facade that return an instance of the PieceRepository.
     *
     * @return PieceRepository PieceRepository
     */
    public function getPieceRepository(): PieceRepository;

    /**
     * Facade that return an instance of the ImageFileRepository.
     *
     * @return ImageFileRepository ImageFileRepository
     */
    public function getImageFileRepository(): ImageFileRepository;

    /**
     * Facade that return an instance of the CommentRepository.
     *
     * @return CommentRepository CommentRepository
     */
    public function getCommentRepository(): CommentRepository;

    /*********************************************** STATIC METHODS ***********************************************/

}