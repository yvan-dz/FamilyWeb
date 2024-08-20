$(document).ready(function() {
    // Initialiser AOS
    AOS.init({
        duration: 1000, // Durée des animations
        easing: 'ease-in-out',
        once: false, // Réanimer à chaque défilement
    });

    // Charger les données de l'arbre généalogique à partir du JSON
    $.getJSON('js/familyTree.json', function(familyTree) {
        // Générer l'arbre hiérarchique
        function generateTree(data) {
            if (!data) return '';

            var treeHtml = '<li>';
            treeHtml += '<a href="#" class="family-member" data-name="' + data.name + '" data-birthdate="' + data.birthDate + '" data-birthplace="' + data.birthPlace + '" data-job="' + data.job + '" data-traits="' + data.traits + '">' + data.name + '</a>';

            if (data.children && data.children.length > 0) {
                treeHtml += '<ul>';
                data.children.forEach(function(child) {
                    treeHtml += generateTree(child);
                });
                treeHtml += '</ul>';
            }

            treeHtml += '</li>';
            return treeHtml;
        }

        var treeStructure = '<div class="tree"><ul>' + generateTree(familyTree) + '</ul></div>';
        $('#hierarchical-tree').html(treeStructure);

        // Générer l'accordéon
        function generateAccordion(data) {
            if (!data) return '';

            var accordionHtml = '<div class="accordion">';
            accordionHtml += '<div class="accordion-item">';
            accordionHtml += '<button class="accordion-header">' + data.name + '</button>';
            accordionHtml += '<div class="accordion-body">';
            accordionHtml += '<a href="#" class="family-member hidden-link" data-name="' + data.name + '" data-birthdate="' + data.birthDate + '" data-birthplace="' + data.birthPlace + '" data-job="' + data.job + '" data-traits="' + data.traits + '">' + data.name + '</a>';

            if (data.children && data.children.length > 0) {
                data.children.forEach(function(child) {
                    accordionHtml += generateAccordion(child);
                });
            }

            accordionHtml += '</div></div></div>';
            return accordionHtml;
        }

        var accordionStructure = generateAccordion(familyTree);
        $('#accordion-tree').html(accordionStructure);

        // Fonction pour afficher les détails du membre
        function showMemberDetails(name, birthDate, birthPlace, job, traits) {
            $('#detail-name').text(name);
            $('#detail-birthDate').text(birthDate);
            $('#detail-birthPlace').text(birthPlace);
            $('#detail-job').text(job);
            $('#detail-traits').text(traits);

            $('#member-details').fadeIn().get(0).scrollIntoView({ behavior: 'smooth' });
        }

        // Gestion des clics pour les membres de la famille dans l'arbre hiérarchique et l'accordéon
        $(document).on('click', '.family-member', function(e) {
            e.preventDefault();

            var name = $(this).data('name');
            var birthDate = $(this).data('birthdate');
            var birthPlace = $(this).data('birthplace');
            var job = $(this).data('job');
            var traits = $(this).data('traits');

            showMemberDetails(name, birthDate, birthPlace, job, traits);
        });

        // Gestion des clics pour l'accordéon
        $(document).on('click', '.accordion-header', function(e) {
            e.preventDefault();

            // Récupérer les données à partir de l'élément enfant .family-member
            var memberElement = $(this).next('.accordion-body').find('.family-member').first();

            var name = memberElement.data('name');
            var birthDate = memberElement.data('birthdate');
            var birthPlace = memberElement.data('birthplace');
            var job = memberElement.data('job');
            var traits = memberElement.data('traits');

            // Appeler la fonction pour afficher les détails du membre
            showMemberDetails(name, birthDate, birthPlace, job, traits);

            // Ouvrir/fermer l'accordéon
            $(this).next('.accordion-body').toggleClass('active');
            $(this).toggleClass('active');
        });
    });
});
