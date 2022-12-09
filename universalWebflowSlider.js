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
    snapLastItemScreenSizeAttribute = 'bmg-data-last-item-snap-screen-size',
    autoCreateDotsAttribute = 'bmg-data-auto-create-dots',
    animationTimeAttribute = 'bmg-uwsc-animation-time',
    cssShowAttribute = 'bmg-data-css-show',
    cssHideAttribute = 'bmg-data-css-hide',
    autoPadderAttribute = 'bmg-data-auto-padding',
    modelContainerSelectorAttribute = 'bmg-data-model-container-selector',
    modelPaddingSelectorAttribute = 'bmg-data-model-container-selector',
    infinityModeAttribute = 'bmg-data-infinity-mode',
    roundGapValueAttribute = 'bmg-data-round-gap-value',
    infinityDuplicationsAttribute = 'bmg-data-infinity-duplications',
    resetIx2Attribute = 'bmg-data-reset-ix-2'

// Defaults
const snappingDefault = 'true',
    snappingDelayDefault = 150,
    snapCallMultiplierDefault = .5,
    snapLastItemScreenSizeDefault = 479,
    animationTimeDefault = 350,
    cssShowDefault = { opacity: 1, cursor: 'pointer' },
    cssHideDefault = { opacity: 0.5, cursor: 'default' },
    autoPaddingDefault = 'false',
    modelContainerSelectorDefault = '.container-large',
    modelPaddingSelector = '.padding-global',
    infinityModeDefault = 'false',
    roundGapValueDefault = 'false',
    infinityDuplicationsDefault = 2,
    resetIx2Default = 'false'
    

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
        let isSnapping = ( $slider.attr(snappingAttribute) || snappingDefault ) == 'true',
            snappingDelay = parseFloat( $slider.attr( snappingDelayAttribute ) || snappingDelayDefault ),
            snapCallMultiplier = parseFloat( $slider.attr( snapCallMultiplierAttribute ) || snapCallMultiplierDefault ),
            snapLastItemScreenSize = parseFloat( $slider.attr( snapLastItemScreenSizeAttribute ) || snapLastItemScreenSizeDefault ),
            animationTime = parseFloat( $slider.attr( animationTimeAttribute ) || animationTimeDefault ),
            cssShow = getJsonAttrVals( $slider, cssShowAttribute, { ...cssShowDefault } ),
            cssHide = getJsonAttrVals( $slider, cssHideAttribute, { ...cssHideDefault } ),
            isAutoPadding = ( $slider.attr(autoPadderAttribute) || autoPaddingDefault ) == 'true',
            containerSelector = $slider.attr(modelContainerSelectorAttribute) || modelContainerSelectorDefault,
            paddingSelector = $slider.attr(modelPaddingSelectorAttribute) || modelPaddingSelector,
            isInfinityMode = ( $slider.attr(infinityModeAttribute) || infinityModeDefault ) == 'true',
            isRoundGapValue = ( $slider.attr(roundGapValueAttribute) || roundGapValueDefault ) == 'true',
            infinityDuplications = parseInt( $slider.attr( infinityDuplicationsAttribute ) || infinityDuplicationsDefault ),
            isResetIx2 = ( $slider.attr(resetIx2Attribute) || resetIx2Default ) == 'true'

        // Set duration if not declared
        if (cssShow['duration'] == undefined) { cssShow['duration'] = animationTime / 1000 }
        if (cssHide['duration'] == undefined) { cssHide['duration'] = animationTime / 1000 }

        // - Fixed -
        let dotClass = $dot.attr( 'class' ),
            currentDotClass = $currentDot.attr( 'class' )

        // - Variables -
        let variablesObject =
        {
            nOfSlides: $slides.length,
            thisSlideIsCurrent: 0,
            animationTriggerType: ''
        }


        // - - - Styling - - - 

        // - Auto padder -
        if ( isAutoPadding )
        {
            // Elements
            const $container = $(containerSelector).eq(0),
                $padding = $(paddingSelector).eq(0)

            // Functions
            function padder()
            {
                // Values
                let padding = ( $padding.outerWidth( true ) - $container.outerWidth() ) / 2
    
                // Action
                $mask.css({ 'padding-left': padding, 'padding-right': padding })
            }

            // Initzialize
            padder()
            $( window ).resize( padder )
        }
        
        
        // Arrows
        if ( !isInfinityMode )
        {
            gsap.set( $left[0], { ...cssHide, duration: 0 } )
            if ( variablesObject.nOfSlides <= 1 ) { gsap.set( $right[0], { ...cssHide, duration: 0 } ) }
        }
        

        // - - - Funcitons - - -

        // - Create dots -
        if ( $nav.attr( autoCreateDotsAttribute ) != 'false' )
        {
            $nav.empty()
            $nav.append( $currentDot )

            for ( let i = 1; i < variablesObject.nOfSlides; i++ )
            {
                $nav.append( $dot.clone() )
            }
        }
        let $dots = $nav.children()
        

        // - - Create calc values - on resize - -
        function createCalcValues( resized = false )
        { 
            // - Screen size -
            variablesObject.screenSize = $(window).width()
            // - Populate slide widths -
            
            // Reset
            variablesObject.slideWidthElement = []

            // Loop
            $slides.each(function(index)
            {
                variablesObject.slideWidthElement.push({ single: $(this).outerWidth() })
            })

            // - Calculate content width -

            // - Get padding values -
            variablesObject.paddingLeft = parseFloat( $mask.css('padding-left') )
            variablesObject.paddingRight = parseFloat( $mask.css('padding-right') )

            // Reset
            variablesObject.contentWidth = 0

            // Loop
            variablesObject.slideWidthElement.forEach(width => { variablesObject.contentWidth += width.single })


            // - Get gap value -

            // Infinity mode variable
            let infinityMultiplier = resized && isInfinityMode ? infinityDuplications * 2 + 1 : 1 

            // Calculation
            variablesObject.gapValue = ( $mask[0].scrollWidth - variablesObject.contentWidth * infinityMultiplier - variablesObject.paddingLeft - variablesObject.paddingRight ) / ( variablesObject.nOfSlides * infinityMultiplier - 1 )
            if ( isRoundGapValue ) { variablesObject.gapValue = Math.round( variablesObject.gapValue ) }
            

            // - Add joint value -
            let tmpJointValue = 0

            variablesObject.slideWidthElement.forEach((width, index) => 
            {
                if ( !index )
                {
                    width.joint = 0
                }
                else
                {
                    tmpJointValue+= width.single + variablesObject.gapValue
                    width.joint = tmpJointValue
                }
            })

            // - Update last scrollable dot -
            if ( !isInfinityMode )
            {
                let tmpScrollWidth = $mask[0].scrollWidth - $mask[0].clientWidth
            
                variablesObject.lastSrollableSlideIndex = returnSlideIndex( tmpScrollWidth, variablesObject )

                $dots.each(function(index)
                {
                    if ( index > variablesObject.lastSrollableSlideIndex )
                    {
                        gsap.set( $(this)[0], { ...cssHide } )
                    }
                    else
                    {
                        gsap.set( $(this)[0], { ...cssShow } )
                    }
                })
            }
            else // If infitnity mode is on
            {
                variablesObject.calcContentWidth = variablesObject.contentWidth + variablesObject.gapValue * variablesObject.nOfSlides
                variablesObject.infinityScrollMaxValue = variablesObject.calcContentWidth * ( infinityDuplications + 1 )
                variablesObject.infinityScrollBaseValue = variablesObject.calcContentWidth * infinityDuplications
                variablesObject.infinityScrollMinValue = variablesObject.calcContentWidth * ( infinityDuplications - 1 )

                $mask.scrollLeft( variablesObject.infinityScrollBaseValue )
            }   
        }

        // Call
        createCalcValues()
        $(window).resize(() => { createCalcValues(true) })


        // - - Initialize infinity mode - -
        if ( isInfinityMode )
        {
            // Elements
            let $slidesPrototype = $slides.clone().attr('bmg-element', 'Fake Slide')

            // Create fake elements
            for ( let i = 0, n = infinityDuplications; i < n; i++ )
            {
                $mask.prepend( $slidesPrototype.clone() )
                $mask.append( $slidesPrototype.clone() )
            }

            // Re initiliaze webflow animations
            if ( isResetIx2 )
            {
                Webflow.destroy();
                Webflow.ready();
                Webflow.require('ix2').init()
            }
        }
        

        // - - Scroll trigger - -
        let snapTimeOutVarialbe
        
        $mask.scroll(function()
        {
            // - Update variablesObject.thisSlideIsCurrent -
            variablesObject.thisSlideIsCurrent = returnSlideIndex( $mask.scrollLeft(), variablesObject, isInfinityMode, infinityDuplications )

            // - Update buttons styles -
            if ( !isInfinityMode )
            {
                if ( variablesObject.thisSlideIsCurrent <= 0 )
                {
                    gsap.to( $left[0], cssHide )
                    if ( variablesObject.lastSrollableSlideIndex > 0 ) { gsap.to( $right[0], cssShow ) }
                }
                else if ( variablesObject.thisSlideIsCurrent >= variablesObject.lastSrollableSlideIndex )
                {
                    gsap.to( $right[0], cssHide )
                    if ( variablesObject.lastSrollableSlideIndex > 0 ) { gsap.to( $left[0], cssShow ) }
                }
                else
                {
                    gsap.to( $left[0], cssShow )
                    gsap.to( $right[0], cssShow )
                }
            }
            else // If infinity mode is on
            {
                // Values
                let scrollVal = $mask.scrollLeft()

                if ( scrollVal >= variablesObject.infinityScrollMaxValue ) { $mask.scrollLeft( variablesObject.infinityScrollBaseValue ) }
                else if ( scrollVal <= variablesObject.infinityScrollMinValue ) { $mask.scrollLeft( variablesObject.infinityScrollBaseValue ) }
            }

            // - Update current dot -

            // Style dots
            $dots.removeClass( currentDotClass ).addClass( dotClass ).css({ 'cursor': 'pointer' })
            $dots.eq( variablesObject.thisSlideIsCurrent ).removeClass( dotClass ).addClass( currentDotClass ).css({ 'cursor': 'default' })

            // - Scroll snapping -
            if ( isSnapping )
            {
                // Clear
                clearTimeout(snapTimeOutVarialbe)

                // Set
                if ( variablesObject.screenSize <= snapLastItemScreenSize || variablesObject.thisSlideIsCurrent < variablesObject.lastSrollableSlideIndex || isInfinityMode ) 
                {
                    snapTimeOutVarialbe = setTimeout(() => 
                    {
                        variablesObject.animationTriggerType = 'snap'
                        scrollToItem( variablesObject.thisSlideIsCurrent, snapCallMultiplier )
                    }, snappingDelay)
                }
            }
        })


        // - - Click events - -
        let fastClickItterateInt = 0

        // - Buttons -
        $left.click(() => 
        {
            if ( !isInfinityMode )
            {
                if ( variablesObject.animationTriggerType != 'button' ) { fastClickItterateInt = variablesObject.thisSlideIsCurrent }
                fastClickItterateInt--
                
                if ( fastClickItterateInt >= 0 ) { scrollToItem( fastClickItterateInt ) }
                else { fastClickItterateInt = 0 }
            }
            else
            {
                fastClickItterateInt = variablesObject.thisSlideIsCurrent
                fastClickItterateInt--
                
                if ( fastClickItterateInt >= 0 ) { scrollToItem( fastClickItterateInt ) }
                else { fastClickItterateInt = 0 }
            }

            variablesObject.animationTriggerType = 'button'
        })

        $right.click(() => 
        {
            if ( !isInfinityMode )
            {
                if ( variablesObject.animationTriggerType != 'button' ) { fastClickItterateInt = variablesObject.thisSlideIsCurrent }
                fastClickItterateInt++
                
                if ( fastClickItterateInt <= variablesObject.lastSrollableSlideIndex ) { scrollToItem( fastClickItterateInt ) }
                else { fastClickItterateInt = variablesObject.lastSrollableSlideIndex }
            }
            else
            {
                fastClickItterateInt = variablesObject.thisSlideIsCurrent
                fastClickItterateInt++
                
                if ( fastClickItterateInt <= variablesObject.nOfSlides -1 ) { scrollToItem( fastClickItterateInt ) }
                else { fastClickItterateInt = variablesObject.nOfSlides -1 }
            }

            variablesObject.animationTriggerType = 'button'
        })

        // - dots -
        $dots.each(function(index)
        {
            $(this).click(() => 
            {
                variablesObject.animationTriggerType = 'dot'
                scrollToItem( index )
            })
        })


        // - - Scroll to item x - -
        function scrollToItem( x, snapCallMultiplierValue = 1, goLeft = false )
        {
            // Values
            let sWE = variablesObject.slideWidthElement,
                sWEJointCalc = sWE[sWE.length -1].joint,
                sWESingleCalc = sWE[sWE.length -1].single,
                gapVal = variablesObject.gapValue,
                infinityPlusBaseVal = sWEJointCalc + sWESingleCalc + gapVal,
                infinityPlus = isInfinityMode ? infinityPlusBaseVal * infinityDuplications : 0

            // If infinity left
            if ( isInfinityMode && ( Math.round( $mask.scrollLeft() ) < Math.round( infinityPlus - sWESingleCalc / 2 - gapVal + 1 ) || goLeft ) )
            {
                infinityPlus -= infinityPlusBaseVal    
            }

            // Prevent double snapping
            clearTimeout(snapTimeOutVarialbe)
            
            // Animate
            $mask.stop().animate( { scrollLeft: infinityPlus + sWE[x].joint }, animationTime * snapCallMultiplierValue )
        }
    })
}


// + Helper functions +

// - - - Return closest slide index - - -
function returnSlideIndex( scrollPosition, variablesObject = {}, isInfinityMode = false, infinityDuplications = 2 )
{
    // Value
    let smallestValue,
        closestSlide

    // Infinity mode logic
    if ( isInfinityMode )
    {
        // Values
        let sWE = variablesObject.slideWidthElement,
            sWECalc = sWE[sWE.length -1].single / 2,
            gapVal = variablesObject.gapValue,
            cWidth = variablesObject.calcContentWidth
            
        // Give new base point a scroll width of 0
        scrollPosition -= cWidth * infinityDuplications - sWECalc

        // Switch values for negative scroll value
        scrollPosition = scrollPosition < 0 ? cWidth + scrollPosition - sWECalc - gapVal : scrollPosition - sWECalc - gapVal

        // Right scrolling recalculation
        scrollPosition = scrollPosition >= cWidth - sWECalc ? 0 : scrollPosition
    }
    

    // Loop
    variablesObject.slideWidthElement.forEach((width, index) => 
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
