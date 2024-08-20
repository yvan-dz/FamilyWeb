$(document).ready(function() {
    // Initialiser AOS
    AOS.init({
        duration: 1000, // durée des animations
        easing: 'ease-in-out',
        once: false, // Réanimer à chaque défilement
    });

    // Apparition des éléments au chargement de la page
    $(window).on('load', function() {
        $('html').css('opacity', '1');
        $('.blog-post').each(function(index) {
            $(this).delay(300 * index).queue(function(next) {
                $(this).addClass('is-visible');
                next();
            });
        });
    });
});
