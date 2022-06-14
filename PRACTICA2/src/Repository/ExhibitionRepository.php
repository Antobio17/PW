<?php

namespace App\Repository;

use App\Entity\Exhibition;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Exhibition|null find($id, $lockMode = null, $lockVersion = null)
 * @method Exhibition|null findOneBy(array $criteria, array $orderBy = null)
 * @method Exhibition[]    findAll()
 * @method Exhibition[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExhibitionRepository extends ServiceEntityRepository
{
    /**
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Exhibition::class);
    }

    /**
     * @param int $exhibitionID
     *
     * @return Exhibition|null Exhibition|null
     */
    public function findByID(int $exhibitionID): ?Exhibition
    {
        $alias = 'exh';

        $queryBuilder = $this->createQueryBuilder($alias)
            ->andWhere(sprintf('%s.id = :id', $alias))
            ->setParameter('id', $exhibitionID);

        try {
            $exhibition = $queryBuilder->orderBy(sprintf('%s.id', $alias), 'ASC')
                ->getQuery()
                ->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            $exhibition = NULL;
        }

        return $exhibition;
    }

    /**
     * @param string $name
     *
     * @return Exhibition[] Exhibition[]
     */
    public function findByName(string $name): array
    {
        $alias = 'ext';

        $queryBuilder = $this->createQueryBuilder($alias)
            ->andWhere(sprintf('%s.name = :name', $alias))
            ->setParameter('name', $name);

        return $queryBuilder->getQuery()->execute();
    }

    /**
     *
     * @return Exhibition[] Exhibition[]
     */
    public function findAllByStartAt(): array
    {
        $alias = 'ext';

        $queryBuilder = $this->createQueryBuilder($alias)
            ->orderBy($alias . '.startAt', 'ASC');

        return $queryBuilder->getQuery()->execute();
    }

    /**
     * @param int $category
     *
     * @return Exhibition[] Exhibition[]
     */
    public function findByCategory(int $category): array
    {
        $alias = 'exb';

        $queryBuilder = $this->createQueryBuilder($alias)
            ->andWhere(sprintf('%s.category = :category', $alias))
            ->setParameter('category', $category);

        return $queryBuilder->getQuery()->execute();
    }

}
