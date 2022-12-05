(() => { /* Start of: BMG - Universal webflow slider code */

// + Global strings +

// Selectors
const sliderSelctor = '[bmg-uwsc = "Slider"]',
    maskSelector = '[bmg-uwsc = "Mask"]',
    leftSelector = '[bmg-uwsc = "Left Arrow"]',
    rightSelector = '[bmg-uwsc = "Right Arrow"]',
    navSelector = '[bmg-uwsc = "Slide Nav"]',
    notASlideSelector = '[bmg-uwsc = "Not A Slide"]'

// Attributes
const snappingAttribute = 'bmg-data-snapping',
    snappingDelayAttribute = 'bmg-data-snapping-delay',
    snapCallMultiplierAttribute = 'bmg-data-snap-call-multiplier',
    autoCreateDotsAttribute = 'bmg-data-auto-create-dots',
    animationTimeAttribute = 'bmg-uwsc-animation-time',
    cssShowAttribute = 'bmg-data-css-show',
    cssHideAttribute = 'bmg-data-css-hide'

// Defaults
const snappingDefault = 'true',
    snappingDelayDefault = 150,
    snapCallMultiplierDefault = .5,
    animationTimeDefault = 350,
    cssShowDefault = { opacity: 1, cursor: 'pointer' },
    cssHideDefault = { opacity: 0.5, cursor: 'default' }
    

// + Main function +
function main()
{
    $(sliderSelctor).each(function()
    {
        // - - - Glocal Values - - -

        // - Elements -
        let $slider = $(this),
            $mask = $slider.find(maskSelector),
            $slides = $mask.children().not(notASlideSelector),
            $left = $slider.find(leftSelector),
            $right = $slider.find(rightSelector),
            $nav = $slider.find(navSelector),
            $dot = $nav.children().eq(1).clone(),
            $currentDot = $nav.children().eq(0).css({ 'cursor': 'default' }).clone()

        // - Attributes -
        let isSnapping = $slider.attr(snappingAttribute) || snappingDefault,
            snappingDelay = parseFloat( $slider.attr( snappingDelayAttribute ) || snappingDelayDefault ),
            snapCallMultiplier = parseFloat( $slider.attr( snapCallMultiplierAttribute ) || snapCallMultiplierDefault ),
            animationTime = parseFloat( $slider.attr( animationTimeAttribute ) || animationTimeDefault ),
            cssShow = getJsonAttrVals( $slider, cssShowAttribute, { ...cssShowDefault } ),
            cssHide = getJsonAttrVals( $slider, cssHideAttribute, { ...cssHideDefault } )

        // Set duration if not declared
        if (cssShow['duration'] == undefined) { cssShow['duration'] = animationTime / 1000 }
        if (cssHide['duration'] == undefined) { cssHide['duration'] = animationTime / 1000 }

        // - Fixed -
        let dotClass = $dot.attr( 'class' ),
            currentDotClass = $currentDot.attr( 'class' )

        // - Variables -
        let nOfSlides = $slides.length,
            thisSlideIsCurrent = 0,
            lastSrollableSlideIndex,
            slideWidthElement,
            paddingLeft,
            paddingRight,
            contentWidth,
            gapValue,
            animationTriggerType


        // - - - Styling - - - 
        gsap.set( $left[0], { ...cssHide, duration: 0 } )
        if ( nOfSlides <= 1 ) { gsap.set( $right[0], { ...cssHide, duration: 0 } ) }


        // - - - Funcitons - - -

        // - Create dots -
        if ( $nav.attr( autoCreateDotsAttribute ) != 'false' )
        {
            $nav.empty()
            $nav.append( $currentDot )

            for ( let i = 1; i < nOfSlides; i++ )
            {
                $nav.append( $dot.clone() )
            }
        }
        let $dots = $nav.children()
        

        // - - Create calc values - on resize - -
        function createCalcValues()
        { 
            // - Populate slide widths -
            
            // Reset
            slideWidthElement = []

            // Loop
            $slides.each(function(index)
            {
                slideWidthElement.push({ single: $(this).outerWidth() })
            })

            // - Calculate content width -

            // - Get padding values -
            paddingLeft = parseFloat( $mask.css('padding-left') )
            paddingRight = parseFloat( $mask.css('padding-right') )

            // Reset
            contentWidth = 0

            // Loop
            slideWidthElement.forEach(width => { contentWidth += width.single })

            // - Get gap value -
            gapValue = Math.round( ( $mask[0].scrollWidth - contentWidth - paddingLeft - paddingRight ) / ( nOfSlides - 1 ) )

            // - Add joint value -
            let tmpJointValue = 0

            slideWidthElement.forEach((width, index) => 
            {
                if ( !index )
                {
                    width.joint = 0
                }
                else
                {
                    tmpJointValue+= width.single + gapValue
                    width.joint = tmpJointValue
                }
            })

            // - Update last scrollable dot -
            let tmpScrollWidth = $mask[0].scrollWidth - $mask[0].clientWidth
            
            lastSrollableSlideIndex = returnSlideIndex( tmpScrollWidth, slideWidthElement )

            $dots.each(function(index)
            {
                if ( index > lastSrollableSlideIndex )
                {
                    gsap.set( $(this)[0], { ...cssHide } )
                }
                else
                {
                    gsap.set( $(this)[0], { ...cssShow } )
                }
            })
        }

        // Call
        createCalcValues()
        $(window).resize(createCalcValues)

        

        // - - Scroll trigger - -
        let snapTimeOutVarialbe
        
        $mask.scroll(function()
        {
            // - Update thisSlideIsCurrent -
            thisSlideIsCurrent = returnSlideIndex( $mask.scrollLeft(), slideWidthElement )

            // - Update buttons styles -
            if ( thisSlideIsCurrent <= 0 )
            {
                gsap.to( $left[0], cssHide )
            }
            else if ( thisSlideIsCurrent >= lastSrollableSlideIndex )
            {
                gsap.to( $right[0], cssHide )
            }
            else
            {
                gsap.to( $left[0], cssShow )
                gsap.to( $right[0], cssShow )
            }

            // - Update current dot -

            // Style dots
            $dots.removeClass( currentDotClass ).addClass( dotClass ).css({ 'cursor': 'pointer' })
            $dots.eq( thisSlideIsCurrent ).removeClass( dotClass ).addClass( currentDotClass ).css({ 'cursor': 'default' })

            // - Scroll snapping -
            if ( isSnapping == 'true' )
            {
                // Clear
                clearTimeout(snapTimeOutVarialbe)

                // Set
                if ( thisSlideIsCurrent < lastSrollableSlideIndex ) 
                {
                    snapTimeOutVarialbe = setTimeout(() => 
                    {
                        animationTriggerType = 'snap'
                        scrollToItem( thisSlideIsCurrent, snapCallMultiplier )
                    }, snappingDelay)
                }
            }
        })


        // - - Click events - -
        let fastClickItterateInt = 0

        // - Buttons -
        $left.click(() => 
        {
            if ( animationTriggerType != 'button' ) { fastClickItterateInt = thisSlideIsCurrent }
            fastClickItterateInt-- 
            
            if ( fastClickItterateInt >= 0 ) { scrollToItem( fastClickItterateInt ) }
            else { fastClickItterateInt = 0 }

            animationTriggerType = 'button'
        })

        $right.click(() => 
        {
            if ( animationTriggerType != 'button' ) { fastClickItterateInt = thisSlideIsCurrent }
            fastClickItterateInt++
            
            if ( fastClickItterateInt <= lastSrollableSlideIndex ) { scrollToItem( fastClickItterateInt ) }
            else { fastClickItterateInt = lastSrollableSlideIndex }

            animationTriggerType = 'button'
        })

        // - dots -
        $dots.each(function(index)
        {
            $(this).click(() => 
            {
                animationTriggerType = 'dot'
                scrollToItem( index )
            })
        })


        // - - Scroll to item x - -
        function scrollToItem( x, snapCallMultiplierValue = 1 )
        {
            // Prevent double snapping
            clearTimeout(snapTimeOutVarialbe)
            
            // Animate
            $mask.stop().animate( { scrollLeft: slideWidthElement[x].joint }, animationTime * snapCallMultiplierValue )
        }
    })
}


// + Helper functions +

// - - - Return closest slide index - - -
function returnSlideIndex( scrollPosition, slideWidthElement )
{
    // Value
    let smallestValue,
        closestSlide

    // Loop
    slideWidthElement.forEach((width, index) => 
    {
        // Logic
        if ( smallestValue == undefined ) // Case 0
        {
            smallestValue = Math.abs( width.joint - scrollPosition )
            closestSlide = index
        }
        else
        {
            // Values 
            let cmpValue = Math.abs( width.joint - scrollPosition )

            // Logic
            if ( cmpValue < smallestValue )
            {
                smallestValue = cmpValue
                closestSlide = index
            }
        }
    })

    return closestSlide
}


// - - - String related functions - - -

// - Get attribute values -
function getJsonAttrVals( $element, attribute, defaultVals, objectMode = true )
{
    return ($element.attr(attribute) || '{}') == '{}' ?
    defaultVals
    : JSON.parse( preJsonParse( $element.attr(attribute), true ) )
}

// - Prepare for JSON parse -
function preJsonParse( string, objectMode = true )
{
    let array = trimBothStringSides( string.replace(', ', ',') ).split(','),
        newString = '',
        arrayLength = array.length - 1

    array.forEach((item, i) => 
    {
        item
            .replace(/\'/g, '')
            .replace(': ', ':')
            .split(':')
            .forEach((item, i2) => 
            {
                newString += `"${ item }"${ i2 > 0 ? '' : ': '}`
            })
        
        newString += i < arrayLength ? ', ' : ''
    })

    if ( objectMode )
    {
        return `{${ newString }}`
    }
    else
    {
        return newString
    }
}

// Removes two both string sides
function trimBothStringSides( string )
{
    return string.substring(1).slice(0, -1)
}


// - - - Load related functions - - -

// Allows for loading other scripts
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    })
}

// Loader
"undefined" == typeof gsap
    ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js", function () {
          main()
      })
    : main()


})() /* Start of: BMG - Universal webflow slider code */
