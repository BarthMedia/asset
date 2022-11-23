(() => { /* Start of: Make Video Autoplay on iPhone */

// Global elements
let videoElements = document.querySelectorAll('[bmg_video = "embed"] > video'),
    autoplayAllowed = 'undefined'

// Main function
index = 0
for (videoElement of videoElements)
{
    index++ 
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
    if (!autoplayAllowed) // video is already playing so do nothing
    {
        // video is not playing
        // so play video now
        for (videoElement of videoElements)
        {
            videoElement.play()
        }
    }
})
        
})() /* Start of: Make Video Autoplay on iPhone */
