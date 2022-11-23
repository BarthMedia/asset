(() => { /* Start of: BMG Nav link rememberer */

// Global elements & strings
const $tabLinks = $('[bmg-element = "Navigation tabs menu"]').children(),
    currentPath = document.location.pathname,
    tabPanelAttribute = 'aria-controls',
    loadLoopTime = 10 // ms

// Main function
function main() { $tabLinks.each(function()
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
}) }

// Loader
function loader()
{
    let testAttribute = $tabLinks.attr(tabPanelAttribute) // || undefined

    if (testAttribute)
    {
        setTimeout( main, loadLoopTime )
    }
    else
    {
        setTimeout( loader, loadLoopTime )
    }
}
loader()

})() /* Start of: BMG Nav link rememberer */
