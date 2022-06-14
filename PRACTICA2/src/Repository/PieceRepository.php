<?php

namespace App\Repository;

use App\Entity\Exhibition;
use App\Entity\Piece;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Piece|null find($id, $lockMode = null, $lockVersion = null)
 * @method Piece|null findOneBy(array $criteria, array $orderBy = null)
 * @method Piece[]    findAll()
 * @method Piece[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PieceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Piece::class);
    }

    /**
     * @param int $pieceID
     *
     * @return Piece|null Piece|null
     */
    public function findByID(int $pieceID): ?Piece
    {
        $alias = 'pie';

        $queryBuilder = $this->createQueryBuilder($alias)
            ->andWhere(sprintf('%s.id = :id', $alias))
            ->setParameter('id', $pieceID);

        try {
            $piece = $queryBuilder->orderBy(sprintf('%s.id', $alias), 'ASC')
                ->getQuery()
                ->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            $piece = NULL;
        }

        return $piece;
    }

    /**
     * @param string $name
     * @param string $author
     * @param int $exhibitionID
     *
     * @return Piece|null Piece|null
     */
    public function findByName(string $name, string $author, int $exhibitionID): ?Piece
    {
        $alias = 'pic';
        try {
            $piece = $queryBuilder = $this->createQueryBuilder($alias)
                ->andWhere(sprintf('%s.name = :name', $alias))
                ->setParameter('name', $name)
                ->andWhere(sprintf('%s.author = :author', $alias))
                ->setParameter('author', $author)
                ->andWhere(sprintf('%s.exhibition  = :exhibition', $alias))
                ->setParameter('exhibition', $exhibitionID)
                ->getQuery()
                ->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            $piece = NULL;
        }

        return $piece;
    }
}
