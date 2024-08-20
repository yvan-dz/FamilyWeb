$(document).ready(function() {
    // Initialize AOS
    AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out',
        once: false // Reanimate on scroll
    });

    // Load member data from JSON
    $.getJSON('js/members.json', function(data) {
        var members = data;
        var memberName = getUrlParameter('member');
        var member = members.find(m => m.name.toLowerCase() === memberName.toLowerCase());

        if (member) {
            $('#member-photo').attr('src', member.image);
            $('#member-name').text(member.name);
            $('#member-description').text(member.description);
            $('#member-job').text('Job: ' + member.job);
            $('#member-birthdate').text('Birthdate: ' + member.birthdate);
            $('#member-birthplace').text('Birthplace: ' + member.birthplace);
            $('#member-traits').text('Personality Traits: ' + member.traits);
            $('#member-hobbies').text('Hobbies: ' + member.hobbies);
            $('#member-facebook').attr('href', member.social.facebook);
            $('#member-instagram').attr('href', member.social.instagram);
        } else {
            $('#member-name').text('Member not found');
            $('#member-description').text('Please check the member name in the URL.');
        }
    });

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
});
