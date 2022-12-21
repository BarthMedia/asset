(() => { /* Start of: [BMG.studio] Qantity Selector Code */

// + Strings +

// Selectotrs
const wrapperSelector = '[bmg-element = "Quantity Wrapper"]',
    leftSelector = '[bmg-element = "Left"]',
    rightSelector = '[bmg-element = "Right"]',
    numberSelector = '[bmg-element = "Number"]',
    inputSelector = '[bmg-element = "Input"]'

// Attrbutes
const maxAttribute = 'bmg-data-max',
    minAttribute = 'bmg-data-min'


// + Main +
$(wrapperSelector).each(function()
{
    // Elements
    let $wrapper = $(this),
        $left = $wrapper.find(leftSelector),
        $right = $wrapper.find(rightSelector),
        $number = $wrapper.find(numberSelector),
        $input = $wrapper.find(inputSelector)

    // Auto find input
    $input = $input.length < 1 ? $wrapper.find('input') : $input

    // Attributes
    let max = parseFloat( $right.attr(maxAttribute) ),
        min = parseFloat( $left.attr(minAttribute) || 0 )

    // Values
    let currentNumber = parseFloat( $number.text() )


    // - - - Functions - - -

    // Left
    $left.click(() => 
    {
        if ( currentNumber > min ) { currentNumber-- }

        updateQuantity( $number, $input, currentNumber )
    })

    // Left
    $right.click(() => 
    {
        if ( isNaN(max) || currentNumber < max ) { currentNumber++ }
        
        updateQuantity( $number, $input, currentNumber )
    })
})


// + Helpers +

// Update quantity
function updateQuantity( $text, $value, value )
{
    $text.text(value)
    $value.val(value)
    $value.attr('value', value)
}

})() /* End of: [BMG.studio] Qantity Selector Code */
