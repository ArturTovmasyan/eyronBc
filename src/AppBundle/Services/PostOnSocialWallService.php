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
     * PostOnSocialWallService constructor.
     * @param Translator $translator
     * @param $twitterConsumerKey
     * @param $twitterConsumerSecret
     */
    public function __construct(Translator $translator, $twitterConsumerKey, $twitterConsumerSecret)
    {
        $this->translator = $translator;
        $this->twitterConsumerKey = $twitterConsumerKey;
        $this->twitterConsumerSecret = $twitterConsumerSecret;
    }

    /**
     * This function is used to send post on user facebook wall
     *
     * @param $accessToken
     * @return null
     * @throws \Exception
     */
    public function postOnFacebookWall($accessToken)
    {
        //generate facebook post on wall api
        $url = sprintf('%s/?access_token=%s', self::POST_ON_FACEBOOK_WALL_API, $accessToken);

        //generate data for post on wall
        $postData = [
            'message' => 'This is Bucket List 127 Test FOR POST ON WALL',
            'description' => 'Description For TEST Post on wall',
            'picture'   => 'https://www.bucketlist127.com/media/cache/slide_max_size/uploads/images/aa6b6e2e68ccd5af7de9daf87df57b75.jpg',
            'link' => 'https://www.bucketlist127.com',
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
        //set photo path
        $photoPath = __DIR__ . '/photo.jpg';

        //generate Twitter authorization settings
        $settings = ['oauth_access_token' => $accessToken,
                     'oauth_access_token_secret' => $tokenSecret,
                     'consumer_key' => $this->twitterConsumerKey,
                     'consumer_secret' => $this->twitterConsumerSecret
                    ];

        //get twitter class
        $twitter = new TwitterAPIExchange($settings);

        //generate data for upload twitter image
        $postImageData = ['media' => base64_encode(file_get_contents($photoPath))];

        //upload image for twitter
        $imageData = $twitter->buildOauth(self::UPLOAD_TWITTER_MEDIA_API, 'POST')
            ->setPostfields($postImageData)
            ->performRequest();

        //json decode $imageData
        $imageData = json_decode($imageData, true);

        //get image id
        $imageId = $imageData['media_id'];

        //generate data for post on twitter wall
        $postData = ['status' => 'Test For Post on Twitter wall by www.bucketlist127.com', 'media_ids' => $imageId];

        try{
            //send post on twitter wall
            $twitter->buildOauth(self::POST_ON_TWITTER_WALL_API, 'POST')
                ->setPostfields($postData)
                ->performRequest();

        }catch (\Exception $e){
        }
    }
}