$(document).ready(function()
{
    setTimeout(function(){
        $("#app_bundle_merge_goal_goal").change(function(element){
            var id = element.val;
            $.get( "/api/v1.0/goals/image/"+id, function( data ) {
                $('#merge_image').attr("src",data.image_path);
            });
        })
    }, 500);
});