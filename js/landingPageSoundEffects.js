//this file to check if the page is loaded 
$(document).ready(function() {


    $('.GoToGameBoard').on('click', function(e) {
        e.preventDefault();
        var goTo = this.getAttribute('href');
        const soundEffect = new Audio('../sound effects/Game click.wav');
        var sound = $("#audio");
        soundEffect.play();
        setTimeout(function() {
            window.location = goTo;
        }, 200);
    });
});