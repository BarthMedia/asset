(() => { /* Start of: BMG video 100vw by 100vw */

// Global strings
const videoWrapperSelector = '[bmg_video = "wrapper"]'
const videoEmbedSelector = '[bmg_video = "embed"]'

// Main function
$(wrapperSelector).each(function()
{
    // Local elements
    let $video = $(this).find(embedSelector).find('video')

    // Local calc values
    let initRatio = parseInt( $video.css('width') ) / parseInt( $video.css('height') )
    let width, height

    // Local function
    function calcValues() 
    {
        width = $video.parent().css('width')
        height = $video.parent().css('height')

        if ( parseInt(width) / parseInt(height) > initRatio )
        {
            height = parseInt(width) / initRatio + 'px'
        }
        else
        {
            width = 'auto'
        }
        
        $video.css(
        {
            'height': height,
            'width': width
        })
    }
    calcValues() 
    $( window ).resize(calcValues)
})

})() /* End of: BMG video 100vw by 100vw */
