(() => { /* Start of: BMG Nav link rememberer */

// Global elements & strings
const $tabLinks = $('[bmg-element = "Navigation tabs menu"]').children(),
    currentPath = document.location.pathname,
    tabPanelAttribute = 'aria-controls'

// Main function
$tabLinks.each(function()
{
    // Local elements
    let $tabLink = $(this),
        $tabPane = $( `#${ $tabLink.attr(tabPanelAttribute) }` ),
        hrefArray = []

    // - Local functions -

    // Fill href array
    $tabPane.find('a').each(function()
    {
        hrefArray.push( $(this).attr('href') )
    })

    // If currentPath equals one of the links, click $tabLink
    for (href of hrefArray)
    {
        if (href == currentPath)
        {
            $tabLink.click()
        }
    }
})

})() /* Start of: BMG Nav link rememberer */
