(() => { /* Start of: BMG video code */

// Global strings
const wrapperSelector = '[bmg_video = "wrapper"]'
const embedSelector = '[bmg_video = "embed"]'
const unmuteSelector = '[bmg_video = "unmute"]'
const muteSelector = '[bmg_video = "mute"]'
const popUpOpenerSelector = '[bmg_video = "popup-opener"]'
const popUpCloserSelector = '[bmg_video = "popup-closer"]'
const muteLevelSelector = 'bmg_video-mute-level'

// Main function
$(wrapperSelector).each(function()
{
    // Local elements
    let $embed = $(this).find(embedSelector)
    let $video = $embed.find('video')
    let $unmute = $(this).find(unmuteSelector)
    let $mute = $(this).find(muteSelector)
    let $popUpOpener = $(this).find(popUpOpenerSelector)

    // Local functions

    // Play/pause
    let videoClicks = 0
    $embed.click(function() 
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

    // Popup
    console.log($popUpOpener)
    if ( $popUpOpener )
    {
        // Popup elements & variables
        let $popUpCloser = $(this).find(popUpCloserSelector)
        let isSound = parseFloat( $embed.attr(muteLevelSelector) )

        $popUpOpener.click(function()
        {
            $video[0].muted = isSound
            $video[0].play()
        })

        $popUpCloser.click(function()
        {
            $video[0].muted = true
            $video[0].play()
        })
    }
})
    
})() /* End of: BMG video code */
