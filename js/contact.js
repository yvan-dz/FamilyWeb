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
        $('.contact-form-section, .contact-info-section, .business-contacts-section').each(function(index) {
            $(this).delay(300 * index).queue(function(next) {
                $(this).addClass('is-visible');
                next();
            });
        });
    });

    // Gérer la soumission du formulaire de contact
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Extraire les valeurs du formulaire
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

        // Afficher une alerte de succès
        alert('Merci ' + name + '! Votre message a été envoyé avec succès.');

        // Réinitialiser le formulaire
        $(this)[0].reset();
    });
});
