<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/16/15
 * Time: 8:48 PM
 */

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * Class PageRepository
 * @package AppBundle\Entity\Repository
 */
class PageRepository extends EntityRepository
{
    const PRIVACY = 'privacy';

    /**
     * @return array
     */
    public function findAllByOrdered()
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('p')
                ->from('AppBundle:Page', 'p')
                ->where('p.name NOT LIKE :privacy')
                ->orderBy('p.position', 'ASC')
                ->setParameter('privacy' , '%' . self::PRIVACY . '%')
        ;

        $query->getQuery()->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, 'Gedmo\\Translatable\\Query\\TreeWalker\\TranslationWalker');

        return $query->getQuery()->getResult();
    }

    /**
     * @return array
     */
    public function findPrivacy()
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('p')
                ->from('AppBundle:Page', 'p')
                ->where('p.name LIKE :privacy')
                ->orderBy('p.position', 'ASC')
                ->setParameter('privacy' , '%' . self::PRIVACY . '%')
                ->setMaxResults(1)
        ;

        $query->getQuery()->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, 'Gedmo\\Translatable\\Query\\TreeWalker\\TranslationWalker');

        return $query->getQuery()->getResult();
    }
}