<?php

namespace Application\CommentBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ApplicationCommentBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSCommentBundle';
    }
}
