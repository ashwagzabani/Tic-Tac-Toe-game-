$(window).bind('beforeunload', function() {

    //press cancel
    if (localStorage.currentPlayers === 'one player')
        return localStorage.cXp_reload = 'false';

    else if (localStorage.currentPlayers === 'two players')
        return localStorage.pXp_reload = 'false';

});

window.onunload = unloadPage;

function unloadPage() {

    if (localStorage.currentPlayers === 'one player')
        return localStorage.cXp_reload = 'true';

    else if (localStorage.currentPlayers === 'two players')
        return localStorage.pXp_reload = 'true';

}