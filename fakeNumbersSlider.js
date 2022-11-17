(() => { /* Start of: Fake numbers slider */

// Global strings
const numbersWrapperSelector = '[bmg-uwsc="Slide Nav Trigger"]',
    slideNavSelector = '.w-slider-nav',
    sliderSelector = '[bmg-uwsc="Slider Trigger"]'

// Main function
$(sliderSelector).each(function(index_1)
{
    // Glocal elements
    let $numbersWrappers = $(this).find(numbersWrapperSelector)

    // Glocal functions
    $numbersWrappers.each(function()
    {
        // Local elements
        let $numbers = $(this).children()

        // Local functions
        $numbers.each(function(index_2)
        {
            // Find dots on click
            $(this).click(() => 
            {
                let $slideNavDots = $(sliderSelector).eq(index_1).find(slideNavSelector).children() // Prevent DOM loading issues
                
                $slideNavDots.eq(index_2).click()
            })
        })
    })
})

})() /* End of: Fake numbers slider */
