<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Class GetSessionExtension
 * @package AppBundle\Twig\Extension
 */


class GetSessionExtension extends \Twig_Extension
{

    /**
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('getSession', array($this, 'getSession'))
        );
    }

    /**
     * @param $text
     * @return mixed
     */
    public function getSession($text)
    {
        //get session
        $session = $this->session;

        //set addUrl default data
        $addUrl = null;

        //if session have data with nam $text
        if($session->has($text)) {

            //get add url in session
            $addUrl = $session->get($text);

            $session->remove($text);
        }

        return $addUrl;
    }

    public function getName()
    {
        return 'bl_get_session_extension';
    }
}