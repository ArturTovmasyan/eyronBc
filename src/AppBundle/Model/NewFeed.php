<?php
/**
 * Created by PhpStorm.
 * User: pc-4
 * Date: 11/13/15
 * Time: 1:35 PM
 */
namespace AppBundle\Model;

use JMS\Serializer\Annotation\Groups;

/**
 * Class NewFeed
 * @package AppBundle\Model
 */
class NewFeed
{
    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $user;

    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $action;

    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $datetime;

    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $goal;

    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $comment;

    /**
     * @var
     * @Groups({"new_feed"})
     */
    public $successStory;
}