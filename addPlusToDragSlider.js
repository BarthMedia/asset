(() => { /* Start of: [BMG.studio] 1 mil + script */

// + Strings + 

// Selectors 
const stepSelector = '[bmg-element = "Plus Dragger Step"]',
    handleSelctor = '.fs-rangeslider_handle'

// Attributes
const fsBaseAttribute = 'fs-rangeslider-element',
    displayValueAttribute = 'display-value'


// + Main +
$(stepSelector).each(function()
{
    // Elements
    let $step = $(this),
        $handles = $step.find(handleSelctor),
        $displayTexts = []

    // Handles loop
    $handles.each(function(index)
    {
        // Index logic
        let addonString = index > 0 ? `-${ index +1 }` : '',
            searchString = `[${ fsBaseAttribute } = "${ displayValueAttribute + addonString }"]`
        
        // Elements
        let $handle = $(this),
            $displayText = $step.find(searchString)

        // Push
        $displayTexts.push($displayText)
    })

    // Event
    $step.bind('touchmove mousemove', (e) => 
    {
        $displayTexts.forEach($displayText =>
        {
            // Test
            if ( $displayText.text() == '1,000,000' )
            {
                $displayText.text('1,000,000+')
            }
        })
    })
})

})() /* End of: [BMG.studio] 1 mil + script */
