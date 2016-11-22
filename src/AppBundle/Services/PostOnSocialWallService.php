<?php

namespace AppBundle\Services;

class PostOnSocialWallService
{
    const POST_ON_FACEBOOK_WALL_API = 'https://graph.facebook.com/v2.8/me/feed';

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

        //generate post data
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
            //
        }
    }
}