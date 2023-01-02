(() => { /* Start of: [BMG.studio] Luca casa address checker script */

// + Strings +

// Selectors
const stepSelctor = '[bmg-element = "Address Step"]',
    charactersOnlyInputSelectors = '[data-name="City"], [data-name="State/ Province"], [data-name="Country"]'


// + Main +
$(stepSelctor).each(function()
{
    // Elements
    let $step = $(this),
        $characterOnlyInputs = $step.find(charactersOnlyInputSelectors)

    // Loop
    $characterOnlyInputs.each(function()
    {
        // Element
        let $input = $(this)

        // Input event
        $input.on('input', () => 
        {
            let val = $input.val()

            $input.val( val.replace(/[0-9]/g, '') )
        })
    })
})

})() /* End of: [BMG.studio] Luca casa address checker script */
