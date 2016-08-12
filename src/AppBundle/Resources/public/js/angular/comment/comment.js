'use strict';

angular.module('comments', ['Interpolation',
  'Components',
  'ngResource',
  'goalManage',
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
        lsReply: '@',
        lsReplied: '@',
        lsReportTitle: '@',
        lsUserImage: '@'
      },
      templateUrl: '/bundles/app/htmls/comment.html',
      link: function(scope, el){
        var showStepCount = 5;
        var forEnd = 0;
        var busy = false;

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
            if(!busy) {
              busy = true;
              CommentManager.add({
                param1: scope.lsGoalId,
                param2: comment.id
              }, {'commentBody': comment.replyBody}, function (data) {
                comment.reply = true;
                comment.replyBody = '';
                busy = false;
                comment.children.push(data);
              });
            }
          }
        };
        
        scope.writeComment = function (ev) {
          if(ev.which == 13 && scope.commentBody.length){
            ev.preventDefault();
            ev.stopPropagation();
            if(!busy){
              busy = true;
              CommentManager.add({param1:scope.lsGoalId}, {'commentBody': scope.commentBody},function (data) {
                scope.commentBody = '';
                busy = false;
                scope.comments.push(data);
              });
            }
          }
        }
        
      }
    }
  }])
  .directive('lsReport',['$compile',
    '$http',
    '$rootScope',
    'template',
    'userData',
    function($compile, $http, $rootScope, template, userData){
      return {
        restrict: 'EA',
        scope: {
          lsType: '@',
          lsComment: '@'
        },
        link: function(scope, el){

          el.bind('click', function(){
            scope.run();
          });

          scope.run = function(){
            $(".modal-loading").show();
            userData.report = {
              type: scope.lsType,
              comment: scope.lsComment
            };
            scope.runCallback()
          };

          scope.runCallback = function(){
            var sc = $rootScope.$new();
            var tmp = $compile(template.reportTemplate)(sc);
            scope.openModal(tmp);
            $(".modal-loading").hide();
          };

          scope.openModal = function(tmp){

            angular.element('body').append(tmp);
            tmp.modal({
              fadeDuration: 300
            });

            tmp.on($.modal.CLOSE, function(){
              tmp.remove();
            })
          }

        }
      }
    }
  ]);
