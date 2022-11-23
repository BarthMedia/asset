(() => { /* Start of: BMG show loader once per day */

// Global strings & elements
const cookieName = 'bmg-show-once-loader',
    pageLoader = document.querySelector( '[bmg-element = "Page loader"]' ),
    cookieExpirytime = parseFloat( pageLoader.getAttribute( 'bmg-data' ) || .75 ) // n in Days

if ( Cookies.get(cookieName) != 'Visited.' )
{
    Cookies.set(cookieName, 'Visited.', { expires: cookieExpirytime })
}
else
{
    pageLoader.style.setProperty('display', 'none', 'important')
}

})() /* End of: BMG show loader once per day */
