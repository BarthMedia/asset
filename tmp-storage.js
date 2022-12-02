/* Start of: BMG - Universal multistep forms script */

// + Global strings +

// Dependencies - make sure scripts don't load twice
const gsapDependency = typeof gsap, 
    hammerJsDependency = typeof Hammer

// Custom selectors
const formBlockSelctor = '[bmg-form = "Form Block"]',
    formSelctor = '[bmg-form = "Form"]',
    stepSelctor = '[bmg-form = "Form Step"]',
    dividerSelctor = '[bmg-form = "Visual Divider"]',
    continueButtonSelector = '[bmg-form = "Continue Button"]',
    submitButtonSelector = '[bmg-form = "Submit Button"]',
    quizResultSelector = '[bmg-form = "Quiz Result"]'

// Webflow classes
const radioSelector = '.w-radio',
    checkboxSelector = '.w-checkbox',
    wButtonSelector = '.w-button',
    successSelector = '.w-form-done'

// Functional attribues
const formBlockindexAttribute = 'bmg-data-form-block-index',
    stepIndexAttribute = 'bmg-data-step-index',
    stepTypeAttribute = 'bmg-data-step-type',
    relativeLastStepAttribute = 'bmg-data-relative-last-step',
    conditionalAttribute = 'bmg-data-conditional',
    conditionalNextAttribute = 'bmg-data-conditional-next',
    notAutoContinueAttribute = 'bmg-data-not-auto-continue',
    markClickElementAttribute = 'bmg-data-click-element',
    clickElementIdAttribute = 'bmg-data-click-element-id',
    removeOtherStepsAttribute = 'bmg-data-remove-other-steps',
    autoFocusAttribute = 'bmg-data-autofocus',
    keyboardEventsOnStepAttribute = 'bmg-data-keyboard-events',
    escEventAttribute = 'bmg-data-esc-event',
    enterEventAttribute = 'bmg-data-enter-event',
    devModeAttribute = 'bmg-data-dev-mode',
    swipeAllowedAttribute = 'bmg-data-swipe-allowed'

// Functional defaults
const escEventDefault = 'escape, esc, arrowup, up',
    enterEventDefault = 'enter, arrowdown, down'

// Development mode object
const devModeObject = [
    {
        names: ['false'],
        value: 0
    },
    {
        names: ['half', '50%'],
        value: 1
    },
    {
        names: ['on', 'true', '100%'],
        value: 2
    },
    {
        names: ['extreme', '200%'],
        value: 3
    }]

    
// Style attributes
const cssShowAttribute = 'bmg-data-css-show',
    cssHideAttribute = 'bmg-data-css-hide',
    cssActiveAttribute = 'bmg-data-css-active',
    cssInactiveAttribute = 'bmg-data-css-inactive',
    animationMsTimeAttribute = 'bmg-data-animation-ms-time',
    equalHeightTransitionSpeedMultiplierAttribute = 'bmg-data-equal-height-transition-speed-multiplier',
    errorColorAttribute = 'bmg-data-error-color',
    slideDirectionAttribute = 'bmg-data-slide-direction',
    customNextSlideInAttribute = 'bmg-data-custom-next-slide-in',
    customNextSlideOutAttribute = 'bmg-data-custom-next-slide-out',
    customPrevSlideInAttribute = 'bmg-data-custom-prev-slide-in',
    customPrevSlideOutAttribute = 'bmg-data-custom-prev-slide-out',
    customXMultiplierAttribute = 'bmg-data-custom-x-percentage-multiplier',
    customYMultiplierAttribute = 'bmg-data-custom-y-percentage-multiplier',
    autoResizeTimeMultiplier1Attribute = 'bmg-data-auto-resize-time-multiplier-1',
    autoResizeTimeMultiplier2Attribute = 'bmg-data-auto-resize-time-multiplier-2',
    maxSwipeScreenSizeAttribute = 'bmg-data-max-swipe-screen-size',
    minSwipeScreenSizeAttribute = 'bmg-data-min-swipe-screen-size',
    swipeTypeAnimationAttribute = 'bmg-data-swipe-type-animation'

// Style defaults
const cssShowDefault = { opacity: 1, display: 'flex' },
    cssHideDefault = { opacity: 0, display: 'none' },
    cssActiveDefault = { opacity: 1 },
    cssInactiveDefault = { opacity: .5 },
    animationMsTimeDefault = 500,
    equalHeightTransitionSpeedMultiplierDefault = 0.25,
    errorColorDefault = 'red',
    slideDirectionDefault = 'to left',
    customNextSlideInDefault = { ...cssShowDefault },
    customNextSlideOutDefault = { ...cssHideDefault }, 
    customPrevSlideInDefault = { ...cssShowDefault }, 
    customPrevSlideOutDefault = { ...cssHideDefault },
    customXMultiplierDefault = 0,
    customYMultiplierDefault = 0,
    autoResizeTimeMultiplier1Default = 1,
    autoResizeTimeMultiplier2Default = .5,
    maxSwipeScreenSizeDefault = 767,
    minSwipeScreenSizeDefault = 0

// Styles object
let stylesObject = []






/* --- --- --- Start of: Main --- --- --- */






// + Main function +
function main() { $(formBlockSelctor).each(function( formBlockIndex )
{
    // - - Define base values - -
    
    // Glocal elements
    let $formBlock = $(this),
        $form = returnChildElements( $formBlock, formSelctor, 0 ),
        $steps = returnChildElements( $form, stepSelctor, 'false', `${ dividerSelctor }, ${ quizResultSelector }` )

    // Glocal variables
    let clickRecord = [{step: 0}],
        keyEventsAllowed = true

    // Glocal attributes
    let devMode = returnDevModeIndex( $formBlock ) // attr.(dev mode attribute)

    
    // - Styling -
    
    // Populate styles object
    populateStylesObject( $formBlock )

    // Delete visual dividers
    if ( devMode < 2 ) // If dev mode is on or higher, do not:
    {
        $form.find(dividerSelctor).remove()
        $steps.hide()
        $steps.eq(0).show()
    }
    else
    {
        console.log(`Dev mode ${ devMode }: Visual dividers not removed...`)
    }

    
    // - -  Glocal functions - -

    // Save form block index in the DOM
    $formBlock.attr(formBlockindexAttribute, formBlockIndex)

    
    // - For each step -
    $steps.each(function( stepIndex )
    {
        // Local elments
        let $step = $(this),
            preventDoubleClick = false

        // Local functions

        // Define step types
        let $buttons = defineStepType( $step, stepIndex, $formBlock ) // Returns click elements

        // Init click elements
        markClickElement( $buttons )
        
        // Define click actions
        $buttons.each(function( buttonIndex )
        {
            // Element
            let $button = $(this)

            // Help future code by indexing
            $button.attr(clickElementIdAttribute, buttonIndex)

            // Button click function
            $button.click(() => 
            {
                // Prevent double clicking
                if ( !preventDoubleClick )
                {
                    setTimeout(() => { preventDoubleClick = false }, 10)

                    // Call function
                    markClickElement( $buttons, $button )
                    goToNextStep( stepIndex, buttonIndex )
                }
            
            preventDoubleClick = true
        }) })
    })

    
    // - Create next step object -
    let stepLogicObject = creatNextStepObject( $steps )

    
    // - Go to next step -
    function goToNextStep( stepIndex, buttonIndex )
    {
        // Variable
        let nextStepId = stepLogicObject[stepIndex].buttons[buttonIndex].nextStepId

        // Submit if last step
        if ( stepLogicObject[stepIndex].isLast )
        {
            // Turn off keyboard form navigation
            keyEventsAllowed = false
            
            // Remove all steps that are not part of the click record before submitting
            removeOtherSteps(stepLogicObject, clickRecord, $formBlock)

            // Submit
            performVisualSubmit( $formBlock, $form, devMode )
        }
        else
        {
            // Variables
            let $currentStep = stepLogicObject[stepIndex].$
                $nextStep = stepLogicObject[nextStepId].$

            // Functions

            // Update click record
            clickRecord.push({step: nextStepId})

            // Call transition animation
            animateStepTransition( $currentStep, $nextStep, $form, devMode )
        }

        // Dev mode
        if ( devMode > 0 ) { console.log(`Dev mode ${ devMode }; Click record: `, clickRecord) }
    }

    
    // - Go to prev step -
    function goToPrevStep( triggeredBySwipe = false )
    {
        // Variables
        let currentStepId = clickRecord[clickRecord.length -1].step,
            prevStepId = clickRecord[Math.max( clickRecord.length -2, 0 )].step

        // Prevent swipe gestures when turned off on step
        if ( triggeredBySwipe && stepLogicObject[currentStepId].swipeAllowed.toLowerCase() == 'false' ) { return }

        // Prevent going before first step
        if ( currentStepId != prevStepId )
        {
            // Elements
            let $currentStep = $form.find(`[${ stepIndexAttribute } = "${ currentStepId }"]`),
                $prevStep = $form.find(`[${ stepIndexAttribute } = "${ prevStepId }"]`)

            // Functions
            clickRecord.pop() // Remove last element
            animateStepTransition( $currentStep, $prevStep, $form, devMode )
        }

        // Dev mode
        if ( devMode > 0 ) { console.log(`Dev mode ${ devMode }; Click record: `, clickRecord) }
    }


    // - Find next -
    function findNext( triggeredBySwipe = false )
    {
        // get current click record entry

        // Check if swipe gesture is allowed in stepLogicObject

        // find step with that id

        // find button with got clicked attribute

        // Else If not. Play select button 1 with animation and mark button clicked. Return

        // call goToNextStep( currentStepInxed, markedButtonIndex )
        

        
        // Search last clicked button & click it; If not existent mark first as "clicked" & & check if field is required && mark that first || second time make red error ; visually outline it; when rerurn it  do first action
        
        console.log('Searching for stepIndex & buttonIndex...', triggeredBySwipe)
    }

    
    // - Handle bmg autofocus & keyboard events -

    // Initialize autofocus attribute on 1st form
    if ( formBlockIndex == 0 )
    {
        $formBlock.attr(autoFocusAttribute, true)
    }

    // Allow key board controls only on the recently clicked form
    $formBlock.mouseenter(() => 
    {
        $(formBlockSelctor).attr(autoFocusAttribute, false)
        $formBlock.attr(autoFocusAttribute, true)
    })

    // Keyboard variables
    let escEvent = ( $formBlock.attr(escEventAttribute) || escEventDefault ).split(', ')
        enterEvent = ( $formBlock.attr(enterEventAttribute) || enterEventDefault ).split(', ')

    // Initialize keyboard events
    document.onkeydown = function(evt)
    {
        // Assign event
        evt = evt || window.event
        
        // Check if keyboard is turned off on current step
        let currentStepId = clickRecord[clickRecord.length -1].step,
            $currentStep = $form.find(`[${ stepIndexAttribute } = "${ currentStepId }"]`)

        if ( $currentStep.attr(keyboardEventsOnStepAttribute) == 'false' ) { return }

        if ('key' in evt && keyEventsAllowed && $formBlock.attr(autoFocusAttribute) == 'true')
        {
            // Variables
            let key = evt.key.toLowerCase()

            if ( escEvent.includes(key) )
            {
                goToPrevStep()
            }
            else if ( enterEvent.includes(key) && !evt.shiftKey ) // Only if shift is not pressed
            {
                findNext()
            }

            // Set up left, right keyboard controls
            console.log('Todo: Set up left, right button selection control') // buttonSelectControl( 'left' )
        }
    }


    // - Handle mobile swipe gestures -

    // Init
    defineSwipeType( $formBlock )

    // Variables
    let hammer = Hammer( $formBlock[0] ),
        type = $formBlock.attr(swipeTypeAnimationAttribute)

    // Init all swipe directions
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

    // Variations 
    if ( type == 'false' )
    {
    }
    else if ( type == 'to bottom' )
    {
        hammer.on('swipeup', () => { goToPrevStep(true) })
        hammer.on('swipedown', () => { findNext(true) })
    }
    else if ( type == 'to top' || type == 'vertical' )
    {
        hammer.on('swipeup', () => { findNext(true) })
        hammer.on('swipedown', () => { goToPrevStep(true) })
    }
    else if ( type == 'to left' || type == 'default' || type == 'horizontal' )
    {
        hammer.on('swipeleft', () => { findNext(true) })
        hammer.on('swiperight', () => { goToPrevStep(true) })
    }
    else if ( type == 'to right' )
    {
        hammer.on('swipeleft', () => { goToPrevStep(true) })
        hammer.on('swiperight', () => { findNext(true) })
    }
    else if ( type == '4' || type == '270°' )
    {
        hammer.on('swipeup', () => { goToPrevStep(true) })
        hammer.on('swipeleft', () => { findNext(true) })
        hammer.on('swiperight', () => { findNext(true) })
        hammer.on('swipedown', () => { goToPrevStep(true) })
    }
    else if ( type == '3' || type == '180°' )
    {
        hammer.on('swipeup', () => { goToPrevStep(true) })
        hammer.on('swipeleft', () => { findNext(true) })
        hammer.on('swiperight', () => { findNext(true) })
        hammer.on('swipedown', () => { goToPrevStep(true) })
    }
    else if ( type == '2' || type == '90°' )
    {
        hammer.on('swipeup', () => { goToPrevStep(true) })
        hammer.on('swipeleft', () => { findNext(true) })
        hammer.on('swiperight', () => { findNext(true) })
        hammer.on('swipedown', () => { goToPrevStep(true) })
    }
    else // == 'none' || 1 || 'standard' || 0°
    {
        hammer.on('swipeup', () => { findNext(true) })
        hammer.on('swipeleft', () => { findNext(true) })
        hammer.on('swiperight', () => { goToPrevStep(true) })
        hammer.on('swipedown', () => { goToPrevStep(true) })
    }
}) }






/* --- --- --- End of: Main --- --- --- */






// + Helper functions +

// - - Initialize Mobile Swipe gestures - -
function defineSwipeType( $element )
{
    // Local variables
    let styleObjectIndex = parseInt( $element.attr(formBlockindexAttribute) ),
        type = $element.attr(swipeTypeAnimationAttribute),
        styles = stylesObject[styleObjectIndex],
        slideDirection = styles['slideDirection'].toLowerCase(),
        maxScreenSize = styles['maxSwipeScreenSize'],
        minScreenSize = styles['minSwipeScreenSize'],
        width = $(window).width()

    // slideDirection = 'to top'

    // Logic: Tell DOM the swipe type
    if ( width <= maxScreenSize && width >= minScreenSize)
    {
        if ( type != undefined ) { slideDirection = type }
        $element.attr(swipeTypeAnimationAttribute, slideDirection)
    }
    else
    {
        $element.attr(swipeTypeAnimationAttribute, 'false')
    }
}


// - - Visual appealing submit - -
function performVisualSubmit( $formBlock, $form, devMode = 0 )
{
    // Local variables
    let animationMsTime = 350

    // Dev mode logic
    if ( devMode < 1 ) // If dev mode is half or higher, do not:
    {
        setTimeout( $form.submit(), animationMsTime )
    }
    else
    {
        console.log(`Dev mode ${ devMode }: Perform fake submit...`)
    }

    console.log('Todo: Set up quiz mode funcitonality. Url functionality, nested forms, etc.') // Control quizmode functionality.

    // Animation
    $form.hide()
    $formBlock.find(successSelector).show()
}


// - - Step transit animation - -

// Timeline storage element
let timeLineStorage = false

// Function
function animateStepTransition( $currentStep, $nextStep, $form, devMode = 0 )
{
    // Turn off animations on extreme dev mode
    if ( devMode >= 3 ) { console.log(`Dev mode ${ devMode }: Block the transition animation...`); return }
    
    // - Local variables -
    let $otherElements = $form.find(`[${ stepIndexAttribute }]`).not( $currentStep ).not( $nextStep ),
        styleObjectIndex = parseInt( $form.closest(formBlockSelctor).attr(formBlockindexAttribute) ),
        styles = stylesObject[styleObjectIndex],
        cssShow = styles['cssShow'],
        cssHide = styles['cssHide'],
        cssHideQuick = { ...cssHide, duration: 0 },
        tl = new gsap.timeline(),
        resizeHeight1 = $currentStep.height(),
        resizeHeight2 = $nextStep.height(),
        isEqualHeight = resizeHeight1 == resizeHeight2,
        speedMultiplier = isEqualHeight ? styles['equalHeightTransitionSpeedMultiplier'] : 1
        speedMultiplierString = `<+=${ speedMultiplier * 100 }%`,
        isReverse = parseInt( $currentStep.attr(stepIndexAttribute) ) > parseInt( $nextStep.attr(stepIndexAttribute) ),
        slideDirection = styles['slideDirection'].toLowerCase(),
        autoResizeTime1 = cssShow['duration'],
        autoResizeTime2 = cssHide['duration'],
        autoResizeTimeMultiplier1 = styles['autoResizeTimeMultiplier1'],
        autoResizeTimeMultiplier2 = styles['autoResizeTimeMultiplier2']

    // slideDirection = 'to top'


    // - Depending on slide Direction animate: -
    if ( slideDirection == 'to bottom' ) // Top to bottom
    {
        // Local variables
        let fromTop = { ...cssShow, y: 0 },
            toTop = { ...cssHide, y: -$form.height() },
            toTopQuick = { ...toTop, duration: 0 },
            fromBottom = { ...cssShow, y: 0 },
            toBottom = { ...cssHide, y: $form.height() },
            toBottomQuick = { ...toBottom, duration: 0 }

        // Local logic
        if ( !isReverse )
        {
            // Local functions
            tl.to($currentStep[0], toBottom)
            tl.fromTo($nextStep[0], toTopQuick, fromTop, speedMultiplierString)
        }
        else
        {
            // Local functions
            tl.to($currentStep[0], toTop)
            tl.fromTo($nextStep[0], toBottomQuick, fromBottom, speedMultiplierString)
        }
    }
    else if ( slideDirection == 'to top' ) // Bottom to top
    {
        // Local variables
        let fromTop = { ...cssShow, y: 0 },
            toTop = { ...cssHide, y: -$form.height() },
            toTopQuick = { ...toTop, duration: 0 },
            fromBottom = { ...cssShow, y: 0 },
            toBottom = { ...cssHide, y: $form.height() },
            toBottomQuick = { ...toBottom, duration: 0 }

        // Local logic
        if ( !isReverse )
        {
            // Local functions
            tl.to($currentStep[0], toTop)
            tl.fromTo($nextStep[0], toBottomQuick, fromBottom, speedMultiplierString)
        }
        else
        {
            // Local functions
            tl.to($currentStep[0], toBottom)
            tl.fromTo($nextStep[0], toTopQuick, fromTop, speedMultiplierString)
        }
    }
    else if ( slideDirection == 'to left' || slideDirection == 'default' ) // Right to left
    {
        // Local variables
        let fromLeft = { ...cssShow, x: 0 },
            toLeft = { ...cssHide, x: -$form.width() },
            toLeftQuick = { ...toLeft, duration: 0 },
            fromRigth = { ...cssShow, x: 0 },
            toRigth = { ...cssHide, x: $form.width() },
            toRigthQuick = { ...toRigth, duration: 0 }

        console.log(isEqualHeight + ' - height of slides is euqal ... or not.')

        // Local logic
        if ( !isReverse )
        {
            // Local functions
            tl.to($currentStep[0], toLeft)
            tl.fromTo($nextStep[0], toRigthQuick, fromRigth, speedMultiplierString)
        }
        else
        {
            // Local functions
            tl.to($currentStep[0], toRigth)
            tl.fromTo($nextStep[0], toLeftQuick, fromLeft, speedMultiplierString)
        }
    }
    else if ( slideDirection == 'to right' ) // Left to right
    {
        // Local variables
        let fromLeft = { ...cssShow, x: 0 },
            toLeft = { ...cssHide, x: -$form.width() },
            toLeftQuick = { ...toLeft, duration: 0 },
            fromRigth = { ...cssShow, x: 0 },
            toRigth = { ...cssHide, x: $form.width() },
            toRigthQuick = { ...toRigth, duration: 0 }

        // Local logic
        if ( !isReverse )
        {
            // Local functions
            tl.to($currentStep[0], toRigth)
            tl.fromTo($nextStep[0], toLeftQuick, fromLeft, speedMultiplierString)
        }
        else
        {
            // Local functions
            tl.to($currentStep[0], toLeft)
            tl.fromTo($nextStep[0], toRigthQuick, fromRigth, speedMultiplierString)
        }
    }
    else if ( slideDirection == 'none' ) // None
    {
        // Local functions
        tl.to($currentStep[0], cssHide)
        tl.fromTo($nextStep[0], cssHideQuick, cssShow)
    }
    else // Custom
    {
        // Local variables
        let customNextSlideIn = styles['customNextSlideIn'],
            customNextSlideOut = styles['customNextSlideOut'],
            customPrevSlideIn = styles['customPrevSlideIn'],
            customPrevSlideOut = styles['customPrevSlideOut'],
            xM = styles['customXMultiplier'],
            yM = styles['customYMultiplier']

        // Add possible x
        if (customNextSlideIn['x'] == undefined) { customNextSlideIn['x'] = 0 }
        if (customNextSlideOut['x'] == undefined) { customNextSlideOut['x'] = xM * $form.width() }
        if (customPrevSlideIn['x'] == undefined) { customPrevSlideIn['x'] = 0 }
        if (customPrevSlideOut['x'] == undefined) { customPrevSlideOut['x'] = -xM * $form.width() }

        // Add possible y
        if (customNextSlideIn['y'] == undefined) { customNextSlideIn['y'] = 0 }
        if (customNextSlideOut['y'] == undefined) { customNextSlideOut['y'] = yM * $form.height() }
        if (customPrevSlideIn['y'] == undefined) { customPrevSlideIn['y'] = 0 }
        if (customPrevSlideOut['y'] == undefined) { customPrevSlideOut['y'] = -yM * $form.height() }

        // Quick version
        let customPrevSlideOutQuick = { ...customPrevSlideOut, duration: 0 },
            customNextSlideOutQuick = { ...customNextSlideOut, duration: 0 }

        // Local logic
        if ( !isReverse )
        {
            // Set resize time value
            autoResizeTime1 = customNextSlideIn['duration']
            autoResizeTime2 = customNextSlideOut['duration']

            // Local functions
            tl.to($currentStep[0], customNextSlideOut)
            tl.fromTo($nextStep[0], customPrevSlideOutQuick, customNextSlideIn, speedMultiplierString)
        }
        else
        {
            // Set resize time value
            autoResizeTime1 = customPrevSlideIn['duration']
            autoResizeTime2 = customPrevSlideOut['duration']

            // Local functions
            tl.to($currentStep[0], customPrevSlideOut)
            tl.fromTo($nextStep[0], customNextSlideOutQuick, customPrevSlideIn, speedMultiplierString)
        }
    }

    
    // - Autoresize the form element; Depending on the 2 step sizes -
    if ( resizeHeight2 >= resizeHeight1 )
    {
        gsap.to($form[0], { height: resizeHeight2, duration: autoResizeTime1 * autoResizeTimeMultiplier1 })
    }
    else
    {
        gsap.set($form[0], { height: resizeHeight1 })
        gsap.to($form[0], { height: resizeHeight2, duration: autoResizeTime2 * autoResizeTimeMultiplier2 }).delay(autoResizeTime1)
    }

    
    // - Clear gsap timeline in case the form gets navigated quickly -
    if ( timeLineStorage ) timeLineStorage.clear()
    timeLineStorage = tl
    $otherElements.hide()
}


// - - Remove other steps - -
function removeOtherSteps(stepObject, clickRecord, $element)
{
    // Local variables
    let isAllowed = $element.attr(removeOtherStepsAttribute) || 'true',
        removeArray = []

    if (isAllowed == 'true')
    {
        stepObject.forEach(step => 
        {
            let stepInRecord = false,
                stepIndex = step.step
            
            clickRecord.forEach(record => 
            {
                if ( stepIndex == record.step )
                {
                    stepInRecord = true
                }
            })

            if ( step.isLast )
            {
                stepInRecord = true
            }

            if ( !stepInRecord )
            {
                step.$.remove()
            }
        })
    }
}


// - - Create next steps object - -
function creatNextStepObject( $steps )
{
    // Local variables
    let stepsObject = []

    // Initialize stepsObject
    $steps.each(function( stepIndex )
    {
        // Local elements
        let $step = $(this),
            $buttons = $step.find( `[${ clickElementIdAttribute }]` ),
            buttonsObject = []

        $buttons.each(function()
        {
            // Element
            let $button = $(this)

            // Populate buttons object
            buttonsObject.push(
            {
                id: $button.attr(clickElementIdAttribute),
                conditional: $button.attr(conditionalAttribute)
            })
        })

        // Populate steps object
        stepsObject.push(
        {
            $: $step,
            step: stepIndex,
            swipeAllowed: $step.attr(swipeAllowedAttribute) || 'true',
            conditional: $step.attr(conditionalAttribute),
            conditionalNext: $step.attr(conditionalNextAttribute),
            buttons: buttonsObject
        })
    })

    // Add logic to stepsObject
    let stepsCount = stepsObject.length
        
    stepsObject.forEach(step => 
    {
        // Local val
        let stepIndex = step.step,
            relativeLast = step.$.attr(relativeLastStepAttribute)

        // Conditional last logic
        step.isLast = stepIndex == stepsCount -1 ? true : false
        if ( relativeLast == 'true' ) step.isLast = true

        // Next id logic
        step.buttons.forEach(button => 
        {
            if ( button.conditional != undefined )
            {
                button.nextStepId = (() => 
                {
                    for (step of stepsObject)
                    {
                        if ( step.conditional == button.conditional )
                        {
                            return step.step
                        }
                    }
                })()
            }
            else if ( step.conditionalNext != undefined )
            {
                button.nextStepId = stepIndex +1
            }
            else
            {
                button.nextStepId = (() => 
                {
                    for (step of stepsObject)
                    {
                        if ( step.step > stepIndex && step.conditional == undefined )
                        {
                            return step.step
                        }
                    }
                })()
            }
        })
    })

    return stepsObject
}

function markClickElement( $buttons, $button = false )
{
    $buttons.attr(markClickElementAttribute, false)
    if ($button) { $button.attr(markClickElementAttribute, true) }
}


// - - Populate styles object - -
function populateStylesObject( $element )
{
    // Push initial values
    stylesObject.push(
    {
        animationMsTime: parseFloat( $element.attr(animationMsTimeAttribute) || animationMsTimeDefault ),
        equalHeightTransitionSpeedMultiplier: parseFloat( $element.attr(equalHeightTransitionSpeedMultiplierAttribute) || equalHeightTransitionSpeedMultiplierDefault ),
        cssShow: getJsonAttrVals( $element, cssShowAttribute, cssShowDefault ),
        cssHide: getJsonAttrVals( $element, cssHideAttribute, cssHideDefault ),
        cssActive: getJsonAttrVals( $element, cssActiveAttribute, cssActiveDefault ),
        cssInactive: getJsonAttrVals( $element, cssInactiveAttribute, cssInactiveDefault ),
        errorColor: $element.attr(errorColorAttribute) || errorColorDefault,
        slideDirection: $element.attr(slideDirectionAttribute) || slideDirectionDefault,
        customNextSlideIn: getJsonAttrVals( $element, customNextSlideInAttribute, customNextSlideInDefault ),
        customNextSlideOut: getJsonAttrVals( $element, customNextSlideOutAttribute, customNextSlideOutDefault ), 
        customPrevSlideIn: getJsonAttrVals( $element, customPrevSlideInAttribute, customPrevSlideInDefault ), 
        customPrevSlideOut: getJsonAttrVals( $element, customPrevSlideOutAttribute, customPrevSlideOutDefault ),
        customXMultiplier: parseFloat( $element.attr(customXMultiplierAttribute) || customXMultiplierDefault ),
        customYMultiplier: parseFloat( $element.attr(customYMultiplierAttribute) || customYMultiplierDefault ),
        autoResizeTimeMultiplier1: parseFloat( $element.attr(autoResizeTimeMultiplier1Attribute) || autoResizeTimeMultiplier1Default ),
        autoResizeTimeMultiplier2: parseFloat( $element.attr(autoResizeTimeMultiplier2Attribute) || autoResizeTimeMultiplier2Default ),
        maxSwipeScreenSize: parseInt( $element.attr(maxSwipeScreenSizeAttribute) || maxSwipeScreenSizeDefault ),
        minSwipeScreenSize: parseInt( $element.attr(minSwipeScreenSizeAttribute) || minSwipeScreenSizeDefault )
    })

    // Iterate over created object
    let styles = stylesObject[stylesObject.length -1],
        cssShow = styles['cssShow'],
        cssHide = styles['cssHide'],
        customNextSlideIn = styles['customNextSlideIn'],
        customNextSlideOut = styles['customNextSlideOut'],
        customPrevSlideIn = styles['customPrevSlideIn'],
        customPrevSlideOut = styles['customPrevSlideOut']

    // Format time ms time
    styles['animationSTime'] = styles['animationMsTime'] / 1000

    // Set duration if not declared
    if (cssShow['duration'] == undefined) { cssShow['duration'] = styles['animationSTime'] }
    if (cssHide['duration'] == undefined) { cssHide['duration'] = styles['animationSTime'] }
    if (customNextSlideIn['duration'] == undefined) { customNextSlideIn['duration'] = styles['animationSTime'] }
    if (customNextSlideOut['duration'] == undefined) { customNextSlideOut['duration'] = styles['animationSTime'] }
    if (customPrevSlideIn['duration'] == undefined) { customPrevSlideIn['duration'] = styles['animationSTime'] }
    if (customPrevSlideOut['duration'] == undefined) { customPrevSlideOut['duration'] = styles['animationSTime'] }
}


// - - Initialize click state for input fields - -
function initActiveInactiveClickState( $elements, styleObjectIndex, $parent )
{
    // Local variables
    let cssActive = stylesObject[styleObjectIndex]['cssActive'],
        cssInactive = stylesObject[styleObjectIndex]['cssInactive']
        isRadio = $parent.attr(stepTypeAttribute) == 'radio' ? true : false

    // Functions
    $elements.css( cssInactive ) // Init
    
    if ( isRadio )
    {
        $elements.each(function()
        {
            let $element = $(this)
                
            $element.click(() => 
            {
                $elements.css( cssInactive )
                $element.css( cssActive )
            })
        })
    }
    else // Is checkbox
    {
        $elements.each(function()
        {
            let $element = $(this),
                firstClick = true,
                preventDoubleClick = false
                
            $element.click(() => 
            {
                // Prevent double clicking
                if ( !preventDoubleClick )
                {
                    setTimeout(() => { preventDoubleClick = false }, 10)

                    // Call checkbox click logic
                    if (firstClick)
                    {
                        $element.css( cssActive )
                        firstClick = false // Int 2nd click
                    }
                    else // Reset
                    {
                        $element.css( cssInactive )
                        firstClick = true
                    }
                }
            
                preventDoubleClick = true
            })
        })
    }
}


// - - Define step type - -
function defineStepType( $step, stepIndex, $formBlock )
{
    // Local elements
    let $radios = $step.find(radioSelector),
        $checkboxes = $step.find(checkboxSelector),
        $buttons = $step.find(`a, ${ continueButtonSelector }, ${ submitButtonSelector }, ${ wButtonSelector }`),
        $inputs = $step.find('input'),
        formBlockIndex = parseInt( $formBlock.attr(formBlockindexAttribute) )
    
    // Set step index 
    $step.attr(stepIndexAttribute, stepIndex)

    // Check for radio    
    if ( $radios.length > 0 )
    {
        $step.attr(stepTypeAttribute, 'radio')
        initActiveInactiveClickState( $radios, formBlockIndex, $step )

        return $step.attr( notAutoContinueAttribute ) != undefined ? $buttons : $radios
    }

    // Check for checkbox
    if ( $checkboxes.length > 0 )
    {
        $step.attr(stepTypeAttribute, 'checkbox')
        initActiveInactiveClickState( $checkboxes, formBlockIndex, $step )

        return $buttons
    }

    // Check for checkbox
    if ( $inputs.length > 0 )
    {
        $step.attr(stepTypeAttribute, 'other input')
        initActiveInactiveClickState( $checkboxes, formBlockIndex, $step )

        return $buttons
    }

    // Else return empty
    $step.attr(stepTypeAttribute, 'empty')

    return $buttons
}


// - - Return child elements - -
function returnChildElements( $element, selector, eqValue = 'false', notSelector = 'false' )
{
    let $foundElements = $element.find(selector),
        $childElements = $element.children()
        
    if ( $foundElements.length > 0 )
    {
        return $foundElements
    }

    if ( notSelector != 'false' )
    {
        $childElements = $childElements.not(notSelector)
    }

    if ( eqValue != 'false' )
    {
        $childElements = $childElements.eq(eqValue)
    }

    return $childElements
}


// - - String related functions - -

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

// Removes curly brackets
function trimBothStringSides( string )
{
    return string.substring(1).slice(0, -1)
}


// - - Development mode - -
function returnDevModeIndex( $element )
{
    // Local variables
    let attrString = $element.attr( devModeAttribute ),
        returnValue = 0

    // Local function
    devModeObject.forEach(item => 
    {
        // Loop through
        item.names.forEach(name => 
        {
            if ( name == attrString ) { returnValue = item.value }
        })
    }) 

    return returnValue
}


// - - Loading related scripts - -

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
"undefined" == hammerJsDependency
    ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js", function () {
          loadGsap();
      })
    : loadGsap();
function loadGsap() {
    "undefined" == gsapDependency
        ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js", function () {
              main();
          })
        : main();
}

/* End of: BMG - Universal multistep forms script */
