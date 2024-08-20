$(document).ready(function() {
    // Animation des lettres du loader
    const loaderTitle = document.querySelector('.loader-title');
    loaderTitle.innerHTML = loaderTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.loader-title .letter',
            translateY: [-100, 0],
            opacity: [0, 1],
            easing: "easeOutBounce",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i
        })
        .add({
            targets: '.loader-title .letter',
            translateY: [0, 100],
            opacity: [1, 0],
            easing: "easeInExpo",
            duration: 1000,
            delay: (el, i) => 100 + 30 * i
        })
        .add({
            targets: '.loader',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            complete: function() {
                document.querySelector('.loader').style.display = 'none';
                document.getElementById("content").style.display = "block";
                anime({
                    targets: '#content',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 1500
                });
            }
        });

    // Animation d'apparition des cartes
    $('.card').hover(
        function() {
            $(this).addClass('shadow-lg').css('cursor', 'pointer'); 
        }, function() {
            $(this).removeClass('shadow-lg');
        }
    );

    // Smooth scrolling pour les liens de navigation
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Apparition des éléments au chargement de la page
    $(window).on('load', function() {
        $('html').css('opacity', '1');
        $('.card, section, .photo').each(function(index) {
            $(this).delay(200 * index).queue(function(next) {
                $(this).addClass('is-visible');
                next();
            });
        });
    });

    // Apparition douce des éléments au défilement
    function checkVisibility() {
        $('.card, section, .photo').each(function() {
            var elementTop = $(this).offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < viewportBottom - 50) {
                $(this).addClass('is-visible');
            }
        });
    }

    $(window).on('scroll resize', checkVisibility);
    checkVisibility();
});

$(document).ready(function() {
    $('.navbar-toggler').on('click', function() {
        $('#navbarNav').toggleClass('show');
    });
});

