<?php
//namespace Application\UserBundle\Entity;
//
//use Doctrine\ORM\Mapping as ORM;
//use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
//use Symfony\Component\Validator\Constraints as Assert;
//use Gedmo\Mapping\Annotation as Gedmo;
//use JMS\Serializer\Annotation\Groups;
//
///**
// * @ORM\Entity()
// * @ORM\Table(name="user_notify")
// */
//class UserNotify
//{
//    /**
//     * @ORM\Id
//     * @ORM\Column(type="integer")
//     * @ORM\GeneratedValue(strategy="AUTO")
//     */
//    protected $id;
//
//    /**
//     * @ORM\Column(name="is_comment_notify", type="boolean", nullable=true)
//     * @var
//     * @Groups({"settings"})
//     */
//    private $isCommentNotify = true;
//
//    /**
//     * @ORM\Column(name="is_success_story_notify", type="boolean", nullable=true)
//     * @var
//     * @Groups({"settings"})
//     */
//    private $isSuccessStoryNotify = true;
//
//    /**
//     * @ORM\Column(name="is_comment_push_note", type="boolean", nullable=true)
//     * @var
//     * @Groups({"settings"})
//     */
//    private $isCommentPushNote = true;
//
//    /**
//     * @ORM\Column(name="is_success_story_push_note", type="boolean", nullable=true)
//     * @var
//     * @Groups({"settings"})
//     */
//    private $isSuccessStoryPushNote = true;
//
//    /**
//     * @ORM\Column(name="is_progress_push_note", type="boolean", nullable=true)
//     * @var
//     * @Groups({"settings"})
//     */
//    private $isProgressPushNote = true;
//
//}
//
////
////Goals commented
////Ideas commented
////Success stories for Goals
////Success stories for Ideas
////Success stories liked
////Published Ideas
////Comments replied
////Deadline expires
////New Goalfriends
////New Ideas                 