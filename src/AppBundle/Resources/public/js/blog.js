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
    select2TegIds[index] = '#' + $(newForm).find( "select" ).last()[0].id;
    $(select2TegIds[index]).parent().parent().hide();

    $("select[id$='_" + index+"_type']").change(function(ev){
        var choice = ev.target.value;
        if(choice == 'goal'){
            $(select2TegIds[index]).parent().parent().show();
            $(select2TegIds[index]).select2();
            $("div[id$='_" + index+"_content']").hide()
        } else if(choice == 'text'){
            $("div[id$='_" + index+"_content']").show();
            $(select2TegIds[index]).parent().parent().hide();
        }
    });

    $("select[id$='_" + index+"_goal']").change(function(ev){
        var id = ev.val;
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

function toHiddenList(hiddenId)
{
    console.log(hiddenId);
    $(".bl_list_hidden").val(0);
    $("#"+hiddenId).val(1);
}

