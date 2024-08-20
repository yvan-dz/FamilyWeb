$(document).ready(function() {
    // Initialize AOS
    AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out',
        once: false, // Animate every scroll
    });

    // Function to add a message to the list
    function addMessage(name, message, isTopComment) {
        var date = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        var messageItem = $('<li class="list-group-item"></li>');
        messageItem.html('<h5 class="message-name">' + name + '</h5><p class="message-date">' + date + '</p><p class="message-text">' + message + '</p>');

        if (isTopComment) {
            $('#top-comments').prepend(messageItem);
        } else {
            $('#guestbook-entries').prepend(messageItem);
        }
    }

    // Submit the guestbook form
    $('#guestbook-form').on('submit', function(e) {
        e.preventDefault();

        var name = $('#name').val().trim();
        var message = $('#message').val().trim();

        if (name && message) {
            addMessage(name, message, false);

            // Clear the form fields
            $('#name').val('');
            $('#message').val('');
        }
    });

    // Example of existing messages
    var exampleMessages = [
        { name: "Alice Dupont", date: "August 7, 2024", message: "I had a wonderful time with the family at the reunion. Thank you all!" },
        { name: "Jean Martin", date: "August 5, 2024", message: "The beach vacation was amazing! Can't wait to go back!" }
    ];

    // Example of top comments
    var topComments = [
        { name: "Paul Lefèvre", date: "August 2, 2024", message: "Haha, remember the time we all ended up in the pool fully dressed? What a day!" },
        { name: "Marie Dubois", date: "July 10, 2024", message: "Grandpa's jokes are always the best. 'Why do divers always fall backwards off the boat? Because if they fell forward, they'd still be in the boat!'" }
    ];

    // Add the example messages to the list
    exampleMessages.forEach(function(msg) {
        var messageItem = $('<li class="list-group-item"></li>');
        messageItem.html('<h5 class="message-name">' + msg.name + '</h5><p class="message-date">' + msg.date + '</p><p class="message-text">' + msg.message + '</p>');
        $('#guestbook-entries').append(messageItem);
    });

    // Add the top comments to the list
    topComments.forEach(function(comment) {
        var commentItem = $('<li class="list-group-item"></li>');
        commentItem.html('<h5 class="message-name">' + comment.name + '</h5><p class="message-date">' + comment.date + '</p><p class="message-text">' + comment.message + '</p>');
        $('#top-comments').append(commentItem);
    });
});
