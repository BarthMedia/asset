(() => { /* Start of: BMG video code */

// Global strings
const wrapperSelector = '[bmg_video = "wrapper"]'
const embedSelector = '[bmg_video = "embed"]'
const unmuteSelector = '[bmg_video = "unmute"]'
const muteSelector = '[bmg_video = "mute"]'

// Main function
$(wrapperSelector).each(function()
{
    // Local elements
    let $video = $(this).find(embedSelector).find('video')
    let $unmute = $(this).find(unmuteSelector)
    let $mute = $(this).find(muteSelector)

    // Local functions

    // Play/pause
    let videoClicks = 0
    $video.parent().click(function() 
    {
        if ( videoClicks == 0 )
        {
            videoClicks++
            $video[0].pause()
        }
        else
        {
            videoClicks--
            $video[0].play()
        }
    })

    // Unmute
    $unmute.click(function() 
    {
        $video[0].muted = false
        $unmute.hide()
        $mute.css({ 'display': 'flex' })
    })

    // Mute
    $mute.click(function() 
    {
        $video[0].muted = true
        $mute.hide()
        $unmute.css({ 'display': 'flex' })
    })
})

})() /* End of: BMG video code */
