(() => { /* Start of: Fake numbers slider */

// Global strings
const numbersWrapperSelector = '[bmg-uwsc="Slide Nav Trigger"]',
    slideNavSelector = '.w-slider-nav',
    sliderSelector = '[bmg-uwsc="Slider Trigger"]'

// Main function
$(sliderSelector).each(function()
{
    // Glocal elements
    let $numbersWrappers = $(this).find(numbersWrapperSelector),
        $slideNavDots = $(this).find(slideNavSelector).children()

    // Glocal functions
    $numbersWrappers.each(function()
    {
        // Local elements
        let $numbers = $(this).children()

        // Local functions
        $numbers.each(function(index)
        {
            $(this).click(() => 
            {
                $slideNavDots.eq(index).click()
            })
        })
    })
})

})() /* End of: Fake numbers slider */
