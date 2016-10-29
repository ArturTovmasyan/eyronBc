var $collectionHolder;

// setup an "add a tag" link
var $addTagLink = $('<div class=" btn-group btn-group-sm"><button type="button" class="btn btn-xs add-button">Add blog</button></div>');
var $newLinkLi = $('<p class="add-blog"></p>').append($addTagLink);
var select2TegIds = [];


jQuery(document).ready(function() {

    // Get the ul that holds the collection of tags
    $collectionHolder = $('ul.blog');

    // add the "add a tag" anchor and li to the tags ul
    $collectionHolder.append($newLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    for(var index = 0; index < $collectionHolder.data('index'); index++){
        if($("div[id$='_" + index+"_type']").length){
            simpleTypeByIndex(index, 'div[id$="_bl_multiple_blog_'+index+'"');
        }
    }

    $addTagLink.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new tag form (see next code block)
        addTagForm($collectionHolder, $newLinkLi);
    });
});

function addTagForm($collectionHolder, $newLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a tag" link li
    var $newFormLi = $('<li class="file-list col-sm-3"></li>').append(newForm);
    addTagFormDeleteLink($newFormLi);
    $newLinkLi.after($newFormLi);
    simpleTypeByIndex(index, newForm);
}

function addTagFormDeleteLink($newFormLi)
{
    var $removeFormA = $('<a class="delete-link" href="#">Delete</a>');
    $newFormLi.append($removeFormA);

    $removeFormA.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // remove the li for the tag form
        $newFormLi.remove();
    });
}

function simpleTypeByIndex(index, newForm) {
    select2TegIds[index] = '#' + $(newForm).find( "select" ).last()[0].id;
    var type = $("select[id$='_" + index+"_type']").val();
    if(type == 'goal'){
        $("textarea[id$='_" + index+"_content']").parent().parent().hide();
        var goalId = $("select[id$='_" + index+"_goal']").val();

        $.get( "/api/v1.0/goals/image/"+goalId, function( data ) {
            var img = $("img[id='_" + index+"_goal']");
            if(img.length){
                img.attr("src",data.image_path);
            } else {
                img = $('<img style="width: 270px;height: 200px;margin-bottom: 13px;" src="' + data.image_path + '" alt="goal image" id="_'+index+'_goal">');
                img.prependTo($("div[id$='_" + index+"_goal']").first())
            }

        });
    } else {
        $(select2TegIds[index]).parent().parent().hide();
    }

    $("select[id$='_" + index+"_type']").change(function(ev){
        var choice = ev.target.value;
        if(choice == 'goal'){
            $(select2TegIds[index]).parent().parent().show();
            $(select2TegIds[index]).select2();
            var goalId = $("select[id$='_" + index+"_goal']").val();
            if(goalId){
                $("textarea[id$='_" + index+"_content']").val(goalId);
            }
            $("div[id$='_" + index+"_content']").hide()
        } else if(choice == 'text'){
            $("textarea[id$='_" + index+"_content']").val('');
            $("div[id$='_" + index+"_content']").show();
            $(select2TegIds[index]).parent().parent().hide();
        }
    });

    $("select[id$='_" + index+"_goal']").change(function(ev){
        var id = ev.val;
        $("textarea[id$='_" + index+"_content']").val(id);
        $.get( "/api/v1.0/goals/image/"+id, function( data ) {
            var img = $("img[id='_" + index+"_goal']");
            if(img.length){
                img.attr("src",data.image_path);
            } else {
                img = $('<img style="width: 270px;height: 200px;margin-bottom: 13px;" src="' + data.image_path + '" alt="goal image" id="_'+index+'_goal">');
                img.prependTo($("div[id$='_" + index+"_goal']").first())
            }

        });

    });
}

function toHiddenList(hiddenId)
{
    console.log(hiddenId);
    $(".bl_list_hidden").val(0);
    $("#"+hiddenId).val(1);
}

