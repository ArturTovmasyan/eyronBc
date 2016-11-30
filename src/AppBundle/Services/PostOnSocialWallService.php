<?php

namespace AppBundle\Services;

use Symfony\Bundle\FrameworkBundle\Translation\Translator;
use TwitterAPIExchange;

class PostOnSocialWallService
{
    const POST_ON_FACEBOOK_WALL_API = 'https://graph.facebook.com/v2.8/me/feed';
    const POST_ON_TWITTER_WALL_API = 'https://api.twitter.com/1.1/statuses/update.json';
    const UPLOAD_TWITTER_MEDIA_API = 'https://upload.twitter.com/1.1/media/upload.json';

    /**
     * @var Translator
     */
    private $translator;

    /**
     * @var string
     */
    private $twitterConsumerKey;

    /**
     * @var string
     */
    private $twitterConsumerSecret;

    /**
     * @var string
     */
    private $projectHost;

    /**
     * @var string
     */
    private $imageLink;

    /**
     * @var string
     */
    private $message;

    /**
     * @var string
     */
    private $protocol;

    /**
     * PostOnSocialWallService constructor.
     * @param Translator $translator
     * @param $twitterConsumerKey
     * @param $twitterConsumerSecret
     * @param $projectHost
     * @param $protocol
     */
    public function __construct(Translator $translator, $twitterConsumerKey, $twitterConsumerSecret, $projectHost, $protocol)
    {
        $this->translator = $translator;
        $this->twitterConsumerKey = $twitterConsumerKey;
        $this->twitterConsumerSecret = $twitterConsumerSecret;
        $this->projectHost = $projectHost;
        $this->protocol = $protocol;
        $this->imageLink = $protocol.'://'.$this->projectHost.'/bundles/app/images/BL127.png';
        $this->message =  $this->translator->trans('social_post_text', [], 'messages');//get message
    }

    /**
     * This function is used to send post on user facebook wall
     *
     * @param $accessToken
     * @throws \Exception
     */
    public function postOnFacebookWall($accessToken)
    {
        //generate facebook post on wall api
        $url = sprintf('%s/?access_token=%s', self::POST_ON_FACEBOOK_WALL_API, $accessToken);

        //generate data for post on wall
        $postData = [
            'message' => $this->message.' #BucketList127 #BucketList #LifeGoals',
            'picture' => $this->imageLink,
            'link' => $this->projectHost,
        ];

        try{
            //use curl for post on user facebook wall
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            curl_exec($ch);
            curl_close($ch);

        }catch (\Exception $e){
        }
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
        //generate Twitter authorization settings
        $settings = ['oauth_access_token' => $accessToken,
                     'oauth_access_token_secret' => $tokenSecret,
                     'consumer_key' => $this->twitterConsumerKey,
                     'consumer_secret' => $this->twitterConsumerSecret
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
     * @param $accessToken
     * @param $id
     */
    public function postOnGoogleWall($accessToken, $id)
    {
//        ?key=AIzaSyDLBvq2ZzFkkmuKzROfqnRbQJsm7nkLMyw&access_token='.$accessToken.'
        //generate facebook post on wall api
        $url = sprintf('https://www.googleapis.com/plusDomains/v1/people/%s/activities?key=AIzaSyDLBvq2ZzFkkmuKzROfqnRbQJsm7nkLMyw&access_token='.$accessToken.'', $id);

        $body = [
            "object" => [
                "attachments" =>
                    [
                    "url" => "http://stage.bucketlist127.com/bundles/app/images/BL127.png",
                    "objectType" => "article"
                    ],
                "originalContent" => "Happy TEST TEST Monday!",
            ],
            "access" => [
                "items" => [
                    ["type"=>"public"]
                ],
                "domainRestricted" => true
            ]
        ];


        //use curl for post on user facebook wall
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