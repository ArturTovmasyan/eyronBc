<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 1/25/16
 * Time: 5:46 PM
 */
namespace AppBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use FOS\RestBundle\View\View as RestView;

/**
 * @Rest\RouteResource("Goal")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class GoalController extends FOSRestController
{
    /**
     * @Rest\Get("/goals/{first}/{count}", defaults={"first"=0}, requirements={"first"="\d+", "count"="\d+"})
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     *  parameters={
     *      {"name"="category", "dataType"="string", "required"=false, "description"="Goals category slug"},
     *      {"name"="search", "dataType"="string", "required"=false, "description"="search data"}
     *  }
     *
     *
     * )
     *
     * @param int $first
     * @param int $count
     * @param Request $request
     * @return mixed
     * @Rest\View(serializerGroups={"goal"})
     */
    public function getAllAction($first, $count, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $category = $request->get('category');
        $search = $request->get('search');

        $goals = $em->getRepository("AppBundle:Goal")->findAllByCategory($category, $search, $first, $count);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

        $goals = array_values($goals);

        return  $goals;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get all categories",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"category"})
     */
    public function getCategoriesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $categories  = $em->getRepository('AppBundle:Category')->findAll();

        return $categories;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to create a goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     *  parameters={
     *      {"name"="is_public", "dataType"="boolean", "required"=true, "description"="Goal's status"},
     *      {"name"="title", "dataType"="string", "required"=true, "description"="Goal's title"},
     *      {"name"="description", "dataType"="string", "required"=false, "description"="Goal's description"},
     *      {"name"="goal_images[0]", "dataType"="file", "required"=false, "description"="Goal's images"},
     *      {"name"="video_links[0]", "dataType"="string", "required"=false, "description"="Goal's video links"}
     *  }
     * )
     *
     * @param Request $request
     * @return mixed
     * @Security("has_role('ROLE_USER')")
     * @Rest\View()
     */
    public function postAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data = $request->request->all();

        $goal = new Goal();
        $goal->setStatus(array_key_exists('is_public', $data) && $data['is_public']  ? Goal::PUBLIC_PRIVACY : Goal::PRIVATE_PRIVACY);
        $goal->setTitle(array_key_exists('title', $data) ? $data['title'] : null);
        $goal->setDescription(array_key_exists('description', $data) ? $data['description'] : null);
        $goal->setVideoLink(array_key_exists('video_links', $data) ? $data['video_links'] : null);
        $goal->setReadinessStatus(Goal::DRAFT);
        $goal->setAuthor($this->getUser());

        $images = $request->files->get('goal_images');

//        if (!is_array($images)){
//            $images = array($images);
//        }
//
//        foreach($images as $image){
//
//        }

        $em->persist($goal);
        $em->flush();

        return array('goalId' => $goal->getId());
    }
}