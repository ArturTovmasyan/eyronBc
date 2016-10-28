<?php

namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogController
 * @package AppBundle\Controller\Rest
 */
class BlogController extends FOSRestController
{
    /**
     * @Rest\Get("/api/v1.0/blogs/{first}/{count}", requirements={"first"="\d+", "count"="\d+"})
     * @ApiDoc(
     *  resource=true,
     *  section="Blog",
     *  description="This function is used to get all blog",
     *  statusCodes={
     *         200="Returned when all blog was returned",
     *         400="Bad request",
     *  },
     * )
     * @Rest\View()
     * @param Request $request
     * @param $first
     * @param $count
     * @return Response
     */
    public function getAllBlog(Request $request, $first, $count)
    {
        if (is_null($first) && is_null($count)) {
            return new Request('first and count params must not be empty', Response::HTTP_BAD_REQUEST);
        }

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get last updated date for caching
//        $lastModifiedDate = $em->getRepository('AppBundle:Blog')->findLastUpdated($first, $count);

        //new response
        $response = new Response();

//        // set last modified data
//        $response->setLastModified($lastModifiedDate);
//
//        // Set response as public. Otherwise it will be private by default.
//        $response->setPublic();
//
//        // Check that the Response is not modified for the given Request
//        if ($response->isNotModified($request)) {
//            // return the 304 Response immediately
//            return $response;
//        }

        //get all blog
        $blogs = $em->getRepository('AppBundle:Blog')->findAllBlogForMobile($first, $count);

        $content = [
            'items' => $blogs,
        ];

        $serializer = $this->get('serializer');
        $serializedContent = $serializer->serialize($content, 'json',
            SerializationContext::create()->setGroups(['blog']));

        $response->setContent($serializedContent);

        return $response;
    }

    /**
     * @Rest\Get("/api/v1.0/blog/{slug}")
     * @ApiDoc(
     *  resource=true,
     *  section="Blog",
     *  description="This function is used to get blog by slug",
     *  statusCodes={
     *         200="Returned when blog was returned",
     *         404="Not found",
     *  },
     * )
     *
     * @param Request $request
     * @param $slug
     * @return array
     * @Rest\View()
     */
    public function getBlogBySlug(Request $request, $slug)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get blog
        $blog = $em->getRepository('AppBundle:Blog')->findOneBy(['slug' => $slug]);

        if(is_null($blog)){
            return new Response('Blog not found', Response::HTTP_NOT_FOUND);
        }

//        //get last updated date for caching
//        $lastModifiedDate = $blog->getUpdated();
//
//        //new response
        $response = new Response();
//
//        // set last modified data
//        $response->setLastModified($lastModifiedDate);
//
//        // Set response as public. Otherwise it will be private by default.
//        $response->setPublic();
//
//        // Check that the Response is not modified for the given Request
//        if ($response->isNotModified($request)) {
//            // return the 304 Response immediately
//            return $response;
//        }

        //add goals in arrayCollection
        $goalIds = $blog->getRelatedGoalIds();
        $relatedGoals = $em->getRepository('AppBundle:Goal')->findGoalByIds($goalIds);
        $blog->addGoals($relatedGoals);

        //set content in response
        $content = ['blog' => $blog];
        $serializer = $this->get('serializer');
        $serializedContent = $serializer->serialize($content, 'json',
            SerializationContext::create()->setGroups(['blog']));

        $response->setContent($serializedContent);

        return $response;
    }
}