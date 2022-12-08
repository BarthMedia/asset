(() => { /* Start of: [BMG.studio] Beer Slider webflow replica */

// + Strings +

// Selectors
const triggerSelctor = '.mint_hero-drag-button-wrapper',
    dragImageWrapperSelector = '.mint_second-image-wrapper',
    dragLineWrapperSelector = '.mint_hero-drag-wrapper',
    wrapperSelector = '.mint_hero-image-content'

// Elements
const $trigger = $(triggerSelctor),
    $images = $(dragImageWrapperSelector),
    $line = $(dragLineWrapperSelector),
    $wrapper = $(wrapperSelector)

// Variables
let offsetLeft,
    elementWidth,
    isPressed = false
    

// + Functions +

// Gather accurate pixel data
function updatePixelData()
{
    offsetLeft = $wrapper.offset().left
    elementWidth = $wrapper.width()
}
updatePixelData()
$(window).resize(updatePixelData)


// - Permission -

// Update drag state
$trigger
    .mousedown(() => { isPressed = true; })
    .mouseup(() => { isPressed = false; })
    .mouseleave(() => { isPressed = false; })

// Update grad state for mobile
$trigger[0].addEventListener("touchstart", () => { isPressed = true; console.log(isPressed) })
$trigger[0].addEventListener("touchend", () => { isPressed = false; console.log(isPressed) })


// - Moves -

// Update on touch/ mouse move
$wrapper.bind('touchmove mousemove', (e) => { styleUpdate(e) })


// - Action -

// Style update function
function styleUpdate(e)
{
    // Check
    if ( !isPressed ) { return }
    
    // Values
    let pageX = e.pageX || e.originalEvent.targetTouches[0].pageX
     dragXPercentage = Math.max( Math.min( ( ( pageX - offsetLeft ) / elementWidth ) * 100, 99.99 ), 0.01 )

    // Action
    $images.eq(0).css({ width: dragXPercentage + '%' })
    $images.eq(1).css({ width: 100 - dragXPercentage + '%' })
    $line.css({ left: dragXPercentage + '%' })
}

})() /* End of: [BMG.studio] Beer Slider webflow replica */
