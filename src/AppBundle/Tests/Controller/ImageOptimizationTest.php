<?php

namespace AppBundle\Tests\Controller;

class ImageOptimizationControllerTest extends BaseClass
{

    /**
     * This function is used to check image optimization by nodejs
     */
    public function testImageOptimizationForJpg()
    {
        $input = __DIR__ . '/Images/test.jpg';
        $output = __DIR__ . '/';

        //get image file before optimization
        $currentFileSize = filesize($input);

        //correctly optimization size by percent
        $optimizeImageSize = $currentFileSize * 52/100;

        //get node path
        $node = $this->container->getParameter('node_path');

        //get node path in project
        $nodePath = __DIR__ . '../../../../node/';

        //create command
        $command  = $node .' ' . $nodePath . 'ImageOptimiser.js'
            . ' -f ' . $input
            . ' -p jpg'
            . ' -r ' . $output
            . ' -t ' . 'new.jpg' ;

        //get exec file
        $execFile = $output . 'new.jpg';

        //run command
        exec($command);

        //get file size after optimization
        $execFileSize = filesize($execFile);

        //set default status
        $status = false;

        if($optimizeImageSize < $execFileSize) {
            //set status
            $status = true;
        }

        // Assert that the response status code is 2xx
        $this->assertTrue($status, "Images optimization don't work correctly!");

        unlink($execFile);
    }

    /**
     * This function is used to check image optimization by nodejs
     */
    public function testImageOptimizationForPng()
    {
        $input = __DIR__ . '/Images/test1.png';
        $output = __DIR__ . '/';

        //get image file before optimization
        $currentFileSize = filesize($input);

        //correctly optimization size by percent
        $optimizeImageSize = $currentFileSize * 13.5/100;

        //get node path
        $node = $this->container->getParameter('node_path');

        //get node path in project
        $nodePath = __DIR__ . '../../../../node/';

        //create command
        $command  = $node .' ' . $nodePath . 'ImageOptimiser.js'
            . ' -f ' . $input
            . ' -p png'
            . ' -r ' . $output
            . ' -t ' . 'new.png' ;

        //get exec file
        $execFile = $output . 'new.png';

        //run command
        exec($command);

        //get file size after optimization
        $execFileSize = filesize($execFile);

        //set default status
        $status = false;

        if($optimizeImageSize < $execFileSize) {
            //set status
            $status = true;
        }

        // Assert that the response status code is 2xx
        $this->assertTrue($status, "Images optimization don't work correctly!");

        unlink($execFile);
    }
}
