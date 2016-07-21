'use strict';

angular.module('comments', ['Interpolation',
  'Components',
  'ngResource',
  'PathPrefix'
]).directive('lsCommentManage',['$compile',
  '$rootScope',
  '$timeout',
  'CommentManager',
  function($compile, $rootScope, $timeout, CommentManager){
    return {
      restrict: 'EA',
      scope: {
        lsGoalId: '@',
        lsTitle: '@',
        lsSlug: '@',
        lsUserImage: '@'
      },
      templateUrl: '/bundles/app/htmls/comment.html',
      link: function(scope, el){
        var showStepCount = 5;
        var forEnd = 0;

        CommentManager.comments({param1:'goal_'+scope.lsSlug}, function (resource){
          scope.comments = resource;
          scope.commentsLength = scope.comments.length - 2;
        });
        
        scope.showMoreComment = function () {
          if(scope.commentIndex === forEnd){
            return;
          }
          if(!scope.commentIndex){
            scope.commentIndex = scope.comments.length - 3;
          }

          var startIndex = scope.commentIndex;

          if(scope.commentsLength > showStepCount){
            scope.commentsLength -= showStepCount;
            scope.commentIndex -= showStepCount;
          } else {
            scope.commentIndex -= scope.commentsLength;
            scope.commentsLength = forEnd;
          }

          for(var i = startIndex; i > scope.commentIndex; i--){
            scope.comments[i].visible = true;
          }

        };

        scope.writeReply = function(ev, comment){
          if(ev.which == 13 && comment.replyBody.length) {
            ev.preventDefault();
            ev.stopPropagation();
            CommentManager.add({param1: scope.lsGoalId, param2: comment.id}, {'commentBody': comment.replyBody}, function (data) {
              comment.reply = true;
              comment.replyBody = '';
              comment.children.push(data);
            });
          }
        };
        
        scope.writeComment = function (ev) {
          if(ev.which == 13 && scope.commentBody.length){
            ev.preventDefault();
            ev.stopPropagation();
            CommentManager.add({param1:scope.lsGoalId}, {'commentBody': scope.commentBody},function (data) {
              scope.commentBody = '';
              scope.comments.push(data);
            });
          }
        }
        
      }
    }
  }]);
