<?php

namespace AppBundle\Listener;

use AppBundle\Entity\Goal;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Routing\RouterInterface;

use Presta\SitemapBundle\Service\SitemapListenerInterface;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;

class SitemapListener implements SitemapListenerInterface
{
    const PROJECT = 'bucket_list';
    const PROJECT_ITEM_LIMIT = 100;

    private $event;

    private $router;

    private $em;

    public function __construct(RouterInterface $router, EntityManager $em)
    {
        $this->router = $router;
        $this->em = $em;
    }

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        $this->event = $event;

        $section = $this->event->getSection();

        if (is_null($section) || $section == 'default') {

            //get absolute homepage url
            $url = $this->router->generate('homepage', array(), true);

            //add homepage url to the urlset named default
            $this->createSitemapEntry($url, new \DateTime(), UrlConcrete::CHANGEFREQ_YEARLY, 1);

            // get all tag
            $goals = $this->em->getRepository('AppBundle:Goal')->findBy(array('publish' => Goal::PUBLISH));

            foreach ($goals as $goal) {

                $slug = $goal->getSlug();
                $url = $this->router->generate('inner_goal', array('slug' => $slug), true);
                $tagUpdatedDate = $goal->getUpdated()->format("Y-m-d H:i:s");

                //add homepage url to the urlset named default
                $this->createSitemapEntry($url, new \DateTime($tagUpdatedDate), UrlConcrete::CHANGEFREQ_YEARLY, 0.8);
            }
        }
    }

    private function createSitemapEntry($url, $modifiedDate, $changeFrequency, $priority)
    {
        //add homepage url to the urlset named default
        $this->event->getGenerator()->addUrl(
            new UrlConcrete(
                $url,
                $modifiedDate,
                $changeFrequency,
                $priority
            ),
            'default'
        );
    }
}

