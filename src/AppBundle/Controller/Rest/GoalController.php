<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 1/25/16
 * Time: 5:46 PM
 */
namespace AppBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
     * @Rest\View(serializerGroups={"tiny_goal"})
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
     *  description="This function is used to get goal by id",
     *  statusCodes={
     *         200="Returned when goal was found",
     *         404="Returned when goal was not found",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"goal", "goal_image", "image"})
     *
     * @param $id
     * @return Goal|null|object|Response
     */
    public function getAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $goal = $em->getRepository('AppBundle:Goal')->findWithRelations($id);

        if (!$goal){
            return new Response('Goal not found', Response::HTTP_NOT_FOUND);
        }

        return $goal;
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
     *         404="Returned when goal was not found",
     *  },
     *  parameters={
     *      {"name"="is_public", "dataType"="boolean", "required"=true, "description"="Goal's status"},
     *      {"name"="title", "dataType"="string", "required"=true, "description"="Goal's title"},
     *      {"name"="description", "dataType"="string", "required"=false, "description"="Goal's description"},
     *      {"name"="video_links[0]", "dataType"="string", "required"=false, "description"="Goal's video links"}
     *  }
     * )
     *
     * @param Request $request
     * @param $id
     * @return mixed
     * @Security("has_role('ROLE_USER')")
     * @Rest\Put("/goals/{id}", defaults={"id"=null}, requirements={"id"="\d+"})
     * @Rest\View()
     */
    public function putAction(Request $request, $id = null)
    {
        $em = $this->getDoctrine()->getManager();
        $data = $request->request->all();

        if ($id){
            $goal = $em->getRepository('AppBundle:Goal')->find($id);
            if (!$goal){
                return new Response("Goal wasn't found", Response::HTTP_NOT_FOUND);
            }
        }
        else {
            $goal = new Goal();
        }

        $goal->setStatus(array_key_exists('is_public', $data) && $data['is_public']  ? Goal::PUBLIC_PRIVACY : Goal::PRIVATE_PRIVACY);
        $goal->setTitle(array_key_exists('title', $data) ? $data['title'] : null);
        $goal->setDescription(array_key_exists('description', $data) ? $data['description'] : null);
        $goal->setVideoLink(array_key_exists('video_links', $data) ? $data['video_links'] : null);
        $goal->setReadinessStatus(Goal::DRAFT);
        $goal->setAuthor($this->getUser());

        $validator = $this->get('validator');
        $error = $validator->validate($goal, null, array('goal'));

        if(count($error) > 0){
            return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($goal);
        $em->flush();

        return array('goalId' => $goal->getId());
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This action is used for upload image for a goal",
     *  statusCodes={
     *         200="Returned when image was uploaded",
     *         400="Returned when there are validation error",
     *         403="Returned when adding image to goal which author isn't current user",
     *         404="Returned when there aren't file, or goal not found",
     *  },
     *  parameters={
     *      {"name"="file", "dataType"="file", "required"=false, "description"="Goal's images"}
     *  }
     * )
     *
     * @Rest\Post("/goals/add-images/{id}", defaults={"id"=null}, requirements={"id"="\d+"})
     * @Security("has_role('ROLE_USER')")
     * @param $id
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addImagesAction($id = null, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        if ($id){
            $goal = $em->getRepository('AppBundle:Goal')->find($id);
            if (!$goal){
                return new JsonResponse('Goal not found', Response::HTTP_NOT_FOUND);
            }

            if ($this->getUser() != $goal->getAuthor()){
                return new JsonResponse('Goal not found', Response::HTTP_FORBIDDEN);
            }
        }

        // get all files form request
        $file = $request->files->get('file');

        // check file
        if($file){

            // get bucket list service
            $bucketService = $this->get('bl_service');

            // create new goal image object
            $goalImage = new GoalImage();
            $goalImage->setFile($file);

            // validate goal image
            $validator = $this->get('validator');
            $error = $validator->validate($goalImage, null, array('goal'));

            if(count($error) > 0){
                return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
            }
            else { // upload image id there is no error

                // upload file
                $bucketService->uploadFile($goalImage);

                if (isset($goal)){
                    $images = $goal->getImages();

                    if($images->count() == 0) {
                        $blService = $this->container->get('bl_service');
                        $goalImage->setList(true);
                        $goalImage->setCover(true);
                        $blService->generateFileForCover($goalImage);
                        $blService->generateFileForList($goalImage);
                    }

                    $goalImage->setGoal($goal);
                    $goal->addImage($goalImage);
                }

                $em->persist($goalImage);
                $em->flush();
            }

            return $goalImage->getId();
        }

        return new JsonResponse('', Response::HTTP_NOT_FOUND);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get user draft goals",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"goal_draft"})
     *
     * @Rest\Get("/goals/drafts/{first}/{count}", requirements={"first"="\d+", "count"="\d+"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     * @return array
     */
    public function getDraftsAction($first, $count)
    {
        $em = $this->getDoctrine()->getManager();

        // find all drafts goal
        $draftGoals = $em->getRepository("AppBundle:Goal")->findMyDrafts($this->getUser());

        if (is_numeric($first) && is_numeric($count)) {
            $draftGoals = array_slice($draftGoals, $first, $count);
        }

        return $draftGoals;
    }
}