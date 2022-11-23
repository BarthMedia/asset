(() => { /* Start of: BMG show loader once per day */

// Global strings & elements
const cookieName = 'bmg-show-once-loader',
    pageLoaderSelector = '[bmg-element = "Page loader"]'
    pageLoader = document.querySelector( pageLoaderSelector ),
    cookieExpirytime = parseFloat( pageLoader.getAttribute( 'bmg-data' ) || .75 ) // n in Days

if ( Cookies.get(cookieName) != 'Visited.' )
{
    Cookies.set(cookieName, 'Visited.', { expires: cookieExpirytime })
}
else
{
    // Create CSS
    document.querySelector('head').innerHTML += `
<!-- [BMG] Show loader once per day styles --> 
<style>
    ${ pageLoaderSelector } {
        display: none !important
    }
</style>`
}

})() /* End of: BMG show loader once per day */
