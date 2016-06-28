<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 6/28/16
 * Time: 4:56 PM
 */
namespace AppBundle\Security;

use AppBundle\Entity\SuccessStory;
use AppBundle\Model\PublishAware;
use Application\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class SuccessStoryVoter extends Voter
{
    const VIEW = 'view';
    const EDIT = 'edit';

    /**
     * @param string $attribute
     * @param mixed $subject
     * @return bool
     */
    protected function supports($attribute, $subject)
    {
        if (!in_array($attribute, array(self::VIEW, self::EDIT))) {
            return false;
        }

        if (!$subject instanceof SuccessStory) {
            return false;
        }

        return true;
    }

    /**
     * @param string $attribute
     * @param mixed $goal
     * @param TokenInterface $token
     * @return bool
     */
    protected function voteOnAttribute($attribute, $goal, TokenInterface $token)
    {
        $user = $token->getUser();

        switch ($attribute) {
            case self::VIEW:
                return $this->canView($goal, $user);
            case self::EDIT:
                return $this->canEdit($goal, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    /**
     * @param SuccessStory $story
     * @param $user
     * @return bool
     */
    private function canView(SuccessStory $story, $user)
    {
        return true;
    }

    /**
     * @param SuccessStory $story
     * @param $user
     * @return bool
     */
    private function canEdit(SuccessStory $story, $user)
    {
        if (!$user instanceof User){
            return false;
        }

        if ($user->isAdmin()){
            return true;
        }

        if ($user->getId() == $story->getUser()->getId()){
            return true;
        }

        return false;
    }
}