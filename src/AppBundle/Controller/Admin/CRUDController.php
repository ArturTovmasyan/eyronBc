<?php
/**
 * Created by PhpStorm.
 * User: artur
 * Date: 05/05/16
 * Time: 17:12 PM
 */
namespace AppBundle\Controller\Admin;

use AppBundle\Entity\Goal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CRUDController extends Controller
{

    /**
     * @param Goal $goal
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @return \Symfony\Component\HttpFoundation\Response
     */

    public function mergeAction(Goal $goal, $mergeId = null)
    {
        $object = $this->admin->getSubject();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : test'));
        }


//        // Be careful, you may need to overload the __clone method of your object
//        // to set its id to null !
//        $clonedObject = clone $object;
//
//        $clonedObject->setName($object->getName().' (Clone)');
//
//        $this->admin->create($clonedObject);
//
//        $this->addFlash('sonata_flash_success', 'Cloned successfully');

        return $this->render('AppBundle:Admin:goal_merge.html.twig', array(
          'mergeGoal' => $goal
        ));
    }

}