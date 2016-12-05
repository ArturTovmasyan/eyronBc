<?php

namespace AppBundle\Services;

use Symfony\Bundle\FrameworkBundle\Translation\Translator;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\Session\Session;
use TwitterAPIExchange;

class PostOnSocialWallService
{
    const POST_ON_FACEBOOK_WALL_API = 'https://web.facebook.com/dialog/share';
    const POST_ON_TWITTER_WALL_API = 'https://api.twitter.com/1.1/statuses/update.json';
    const UPLOAD_TWITTER_MEDIA_API = 'https://upload.twitter.com/1.1/media/upload.json';

    /**
     * @var Container $container
     */
    private $container;

    /**
     * @var $protocol string
     */
    private $protocol;

    /**
     * @var $projectHost string
     */
    private $projectHost;

    /**
     * @var Translator $translator
     */
    private $translator;

    /**
     * @var $imageLink string
     */
    private $imageLink;

    /**
     * @var $message string
     */
    private $message;

    /**
     * PostOnSocialWallService constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->projectHost = $this->container->getParameter('project_name');
        $this->translator = $this->container->get('translator');
        $this->protocol = $this->container->getParameter('protocol');
        $this->imageLink = $this->protocol.'://'.$this->projectHost.'/bundles/app/images/BL127.png';
        $this->message = $this->translator->trans('social_post_text', [], 'messages');
    }

    /**
     * This function is used to send post on user facebook wall
     *
     * @throws \Exception
     */
    public function postOnFacebookWall()
    {
        $session = $this->container->get('session');
        $appId = $this->container->getParameter('facebook_client_id');
        $projectName = $this->container->getParameter('email_sender');

        //generate data for post on wall
        $urlParams = [
            'app_id' => $appId,
            'display' => 'page',
            'title' => $projectName,
            'image' => $this->imageLink,
            'quote' => $this->message,
            'href' => $this->projectHost,
            'redirect_uri' => $this->protocol.'://'.$this->projectHost
            'hashtag' => '#BucketList127',
        ];

        //generate post on FB wall url
        $url = sprintf('%s', self::POST_ON_FACEBOOK_WALL_API).'?'.http_build_query($urlParams);

        //set session for FB post
        $session->set('fb_post_url', $url);
    }

    /**
     * This function is used to send post on user twitter wall
     *
     * @param $accessToken
     * @param $tokenSecret
     * @throws \Exception
     */
    public function postOnTwitterWall($accessToken, $tokenSecret)
    {
        //twitter secret and keys
        $twitterConsumerKey = $this->container->getParameter('twitter_client_id');
        $twitterConsumerSecret =  $this->container->getParameter('twitter_client_secret');

        //generate Twitter authorization settings
        $settings = ['oauth_access_token' => $accessToken,
            'oauth_access_token_secret' => $tokenSecret,
            'consumer_key' => $twitterConsumerKey,
            'consumer_secret' => $twitterConsumerSecret
        ];

        //get twitter class
        $twitter = new TwitterAPIExchange($settings);

        //generate data for upload twitter image
        $postImageData = ['media' => base64_encode(file_get_contents($this->imageLink))];

        //upload image for twitter
        $imageData = $twitter->buildOauth(self::UPLOAD_TWITTER_MEDIA_API, 'POST')
            ->setPostfields($postImageData)
            ->performRequest();

        //json decode $imageData
        $imageData = json_decode($imageData, true);

        //get image id
        $imageId = $imageData['media_id'];

        //generate twitter status
        $status = substr($this->message, 0, 98);
        $status = $status.' '.$this->projectHost.' #BucketList127';

        //generate data for post on twitter wall
        $postData = ['status' => $status, 'media_ids' => $imageId];

        try{
            //send post on twitter wall
            $twitter->buildOauth(self::POST_ON_TWITTER_WALL_API, 'POST')
                ->setPostfields($postData)
                ->performRequest();

        }catch (\Exception $e){
        }
    }

    /**
     * This function is used to post on google wall
     *
     * @param $accessToken
     * @param $id
     */
    public function postOnGoogleWall($accessToken, $id)
    {
        //generate facebook post on wall api
        $url = sprintf('https://www.googleapis.com/plusDomains/v1/people/%s/activities?key=AIzaSyDLBvq2ZzFkkmuKzROfqnRbQJsm7nkLMyw&access_token='.$accessToken.'', $id);

        //create post data
        $body = [
            "object" => [
                "attachments" =>
                    [
                        "url" => $this->imageLink,
                        "objectType" => "article"
                    ],
                "originalContent" => $this->message,
            ],
            "access" => [
                "items" => [
                    ["type"=>"public"]
                ],
                "domainRestricted" => true
            ]
        ];

        //use curl for post on user google + wall
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        $k = curl_exec($ch);
        curl_close($ch);
    }
}