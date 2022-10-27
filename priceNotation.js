(() => { /* Start of: BMG - Price notation code */

// Global strings
const wrapperSelector = '[bmg_price-notation = "wrapper"]',
    price1Selector = '[bmg_price-notation = "price-1"]',
    price2Selector = '[bmg_price-notation = "price-2"]',
    placeholder1Selector = '[bmg_price-notation = "placeholder-1"]',
    placeholder2Selector = '[bmg_price-notation = "placeholder-2"]'

// Main function
$(wrapperSelector).each(function()
{
    // Local elements & variables
    let price1 = $(this).find(price1Selector).text(),
        price2 = $(this).find(price2Selector).text(),
        $placeholder1 = $(this).find(placeholder1Selector),
        $placeholder2 = $(this).find(placeholder2Selector)

    // Local funtction
    $placeholder1
        .text( 
            $placeholder1
                .text()
                .replace(/x.xx/g, price1)
        )
    $placeholder2
        .text( 
            $placeholder2
                .text()
                .replace(/x.xx/g, price2)
        )

    if ( price1 == price2 )
    {
        let text = $placeholder1.text().replace(/x.xx/g, price1)
        $(this).text( text )
    }
})

})() /* End of: BMG - Price notation code */
