/* JavaScript for Vertical Student View. */

var SEEN_COMPLETABLES = new Set();

window.VerticalStudentView = function(runtime, element) {
    'use strict';
    RequireJS.require(['course_bookmarks/js/views/bookmark_button'], function(BookmarkButton) {
        var $element = $(element);
        var $bookmarkButtonElement = $element.find('.bookmark-button');

        return new BookmarkButton({
            el: $bookmarkButtonElement,
            bookmarkId: $bookmarkButtonElement.data('bookmarkId'),
            usageId: $element.data('usageId'),
            bookmarked: $element.parent('#seq_content').data('bookmarked'),
            apiUrl: $bookmarkButtonElement.data('bookmarksApiUrl')
        });
    });
    $(element).find('.vert').each(
        function(idx, block) {
            var blockKey = block.dataset.id;

            if (block.dataset.completableByViewing === undefined) {
                return;
            }
            if (blockKey && !SEEN_COMPLETABLES.has(blockKey)) {
                $.ajax({
                    type: 'POST',
                    url: runtime.handlerUrl(element, 'publish_completion'),
                    data: JSON.stringify({
                        block_key: blockKey,
                        completion: 1.0
                    })
                });
                SEEN_COMPLETABLES.add(blockKey);
            }
        }
    );
};
