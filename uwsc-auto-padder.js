(() => { /* Start of: [BMG.studio] Get correct mask padding */

// Attributes
const modelContainerSelectorAttribute = 'bmg-data-model-container-selector',
    modelPaddingSelectorAttribute = 'bmg-data-model-container-selector'

// Defaults
const modelContainerSelectorDefault = '.container-large',
    modelPaddingSelector = '.padding-global'

// Selectors
const maskSelector = '[bmg-uwsc="Mask"]',
    notThisMaskSelector = '[bmg-data-not-this-mask]',
    containerSelector = $('body').attr(modelContainerSelectorAttribute) || modelContainerSelectorDefault,
    paddingSelector = $('body').attr(modelPaddingSelectorAttribute) || modelPaddingSelector

// Elements
const $masks = $(maskSelector).not(notThisMaskSelector),
    $container = $(containerSelector).eq(0),
    $padding = $(paddingSelector).eq(0)

// Functions
function padder()
{
    // Values
    let padding = ( $padding.outerWidth( true ) - $container.outerWidth() ) / 2
    
    // Action
    $masks.css({ 'padding-left': padding, 'padding-right': padding })
}

// Initzialize
padder()
$( window ).resize( padder )

})() /* End of: [BMG.studio] Get correct mask padding */
