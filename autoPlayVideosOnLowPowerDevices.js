(() => { /* Start of: Make Video Autoplay on iPhone */

// Global elements
let videoElements = document.querySelectorAll('[playsinline], [autoplay]'),
    autoplayAllowed = 'undefined'

// Main function
for (videoElement of videoElements)
{
    videoElement.addEventListener('suspend', () => 
    {
        // suspend invoked
        // show play button
        autoplayAllowed = false
    });

    videoElement.addEventListener('play', () => 
    {
        // video is played
        // remove play button UI
        autoplayAllowed = true
    })
}

$('body').on('click touchstart', function ()
{
    if ( autoplayAllowed == false ) // video is already playing so do nothing
    {
        // video is not playing
        // so play video now
        for (videoElement of videoElements)
        {
            videoElement.play()
        }
        autoplayAllowed = 'granted'
    }
})
        
})() /* Start of: Make Video Autoplay on iPhone */
