(() => { /* Start of: BMG - Universal webflow slider code */

// Global strings
const sliderSelctor = '[bmg-uwsc = "Slider"]',
    maskSelector = '[bmg-uwsc = "Mask"]',
    leftSelector = '[bmg-uwsc = "Left Arrow"]',
    rightSelector = '[bmg-uwsc = "Right Arrow"]',
    navSelector = '[bmg-uwsc = "Slide Nav"]'

// - Global styles -

// Insert stylesheet into <head> tag
$('head').append(
`
<!-- Universal webflow slider styles -->
<style>
/* Add native CSS animation for smooth snapping when scrolling */
${ maskSelector } {
	scroll-snap-type: x mandatory
}

${ maskSelector } > * {
	scroll-snap-align: center;
}
</style>
`)


// Main function
$(sliderSelctor).each(function()
{
    // Local elements
    let $slider = $(this),
        $mask = $slider.find(maskSelector),
        $left = $slider.find(leftSelector),
        $right = $slider.find(rightSelector),
        $nav = $slider.find(navSelector),
        $dot = $nav.children().eq(1).clone(),
        $currentDot = $nav.children().eq(0).css({ 'cursor': 'default' }).clone()

    // Local variables
    let nOfSlides = $mask.children().length,
        animationTime = parseInt( $slider.attr( '[bmg-uwsc-animation-time]' ) || 350 ),
        slideOuterWidthBoolean = $slider.attr( '[bmg-uwsc-slides-outer-width]' ) ? false : true,
        cssHide =
        {
            'opacity': $slider.attr( '[bmg-uwsc-arrow-opacity]' ) || .5,
            'transition-property': 'opacity',
            'transition-duration': animationTime + 'ms',
            'transition-timing-function': 'ease',
            'cursor': 'default'
        },
        cssShow =
        {
            'opacity': 1,
            'transition-property': 'opacity',
            'transition-duration': animationTime + 'ms',
            'transition-timing-function': 'ease',
            'cursor': 'pointer'
        },
        thisSlideIsVisible = 0
        

    // - Local functions -

    // Arrow functions
    $left.css( cssHide )
    if ( nOfSlides <= 1 ){ $right.css( cssHide ) }

    $left.click(() => 
    { // i = x < 0 ? 0 : ( x > nOfSlides -1 ? nOfSlides -1 : x  )
        if ( thisSlideIsVisible - 1 >= 0 ) { thisSlideIsVisible-- }
        scrollToItem( thisSlideIsVisible )
    })

    $right.click(() => 
    {
        if ( thisSlideIsVisible + 1 < nOfSlides ) { thisSlideIsVisible++ }
        scrollToItem( thisSlideIsVisible )
    })

    // When slide i is visible do xyz
    function thisSlideIsScrolledTo(i)
    {
        // Update local tracker variable
        thisSlideIsVisible = i
        
        // Style dots
        $dots.removeClass( currentDotClass ).addClass( dotClass ).css({ 'cursor': 'pointer' })
        $dots.eq(i).removeClass( dotClass ).addClass( currentDotClass ).css({ 'cursor': 'default' })

        // Style arrows
        if ( i == 0 )
        {
            $left.css( cssHide )
            $right.css( cssShow )
        }
        else if ( i == nOfSlides - 1 )
        {
            $left.css( cssShow )
            $right.css( cssHide )
        }
        else
        {
            $left.css( cssShow )
            $right.css( cssShow )
        }
    }
    
    // On mask scroll do xyz
    $mask.scroll(function()
    {
        if ( slideScrollLeftValueArray != 'Do not return.' )
        {
            for ( let i = 0, n = nOfSlides; i < n; i++ )
            {
                let x = $mask.scrollLeft() - slideScrollLeftValueArray[i]
                
                if ( x >= -1 && x <= 1 )
                {
                    thisSlideIsScrolledTo(i)
                }
            }
        }
        else
        {
            populateSlideScrollLeftValueArray()
        }
    })

    // Create dots
    if ( $nav.attr( 'bmg-uwsc-auto-dots' ) != 'off' )
    {
        $nav.empty()
        $nav.append( $currentDot )

        for ( let i = 1; i < nOfSlides; i++ )
        {
            $nav.append( $dot.clone() )
        }
    }

    // Add click events to dots
    let $dots = $nav.children(),
        dotClass = $dot.attr( 'class' ),
        currentDotClass = $currentDot.attr( 'class' )
        
    $dots.each(function(index)
    {
        $(this).click(() => 
        {
            scrollToItem( index )
        })
    })

    // Save indivual slide scrollLeft() values
    let slideScrollLeftValueArray = 'Do not return.',
        widthOfSlides

    // Allow new value calculation
    $( window ).resize(() => { slideScrollLeftValueArray = 'Do not return.' })

    function populateSlideScrollLeftValueArray()
    {
        // Reduce necessary processing power
        if ( slideScrollLeftValueArray != 'Do not return.' ) { return }
        
        // Reset
        slideScrollLeftValueArray = [0]
        widthOfSlides = 0

        // Populate base values
        $mask.children().each(function()
        {
            widthOfSlides += $(this).outerWidth( slideOuterWidthBoolean )
            slideScrollLeftValueArray.push( widthOfSlides )
        })

        // Finetune values
        let gap = Math.round( ( $mask[0].scrollWidth - widthOfSlides ) / ( nOfSlides - 1 ) )
        
        for ( let i = 1, n = nOfSlides; i < n; i++ )
        {
            slideScrollLeftValueArray[i] += gap * i
        }
    }

    // Scroll to item x
    function scrollToItem( x )
    {
        populateSlideScrollLeftValueArray()
        let n = slideScrollLeftValueArray[x]
        
        $mask.css("scroll-snap-type", "none")
        $mask.stop().animate( { scrollLeft: n }, animationTime, () => $mask.css("scroll-snap-type", "x mandatory") )
    }
})

})() /* Start of: BMG - Universal webflow slider code */
