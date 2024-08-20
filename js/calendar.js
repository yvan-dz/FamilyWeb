$(document).ready(function() {
    $.getJSON('js/events.json', function(data) {
        var events = data.events;
        var memorableDates = data.memorableDates;

        // Create a temporary popup element
        $('body').append('<div class="event-popup"></div>');

        // Initialize datepicker with events
        $("#datepicker").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            beforeShowDay: function(date) {
                var result = [true, '', ''];
                var eventDate = $.datepicker.formatDate('yy-mm-dd', date);
                events.forEach(function(event) {
                    if (event.date === eventDate || (event.end && eventDate >= event.date && eventDate <= event.end)) {
                        result = [true, 'event-day', event.title];
                    }
                });
                return result;
            },
            onSelect: function(dateText, inst) {
                var selectedDate = $.datepicker.formatDate('yy-mm-dd', new Date(dateText));
                var event = events.find(function(event) {
                    return event.date === selectedDate || (event.end && selectedDate >= event.date && selectedDate <= event.end);
                });
                if (event) {
                    $('#event-title').text(event.title);
                    $('#event-date').text('Date: ' + event.date);
                    $('#event-description').text(event.description);
                    $('#event-details').fadeIn();

                    // Position and display the popup
                    var popup = $('.event-popup');
                    popup.text(event.title)
                        .css({
                            top: inst.dpDiv.offset().top - 10,
                            left: inst.dpDiv.offset().left + (inst.dpDiv.width() / 2) - (popup.width() / 2)
                        })
                        .fadeIn();

                    // Hide the popup after 3 seconds
                    setTimeout(function() {
                        popup.fadeOut();
                    }, 3000);
                }
            }
        });

        // Populate event list
        var eventList = $('#event-list');
        events.forEach(function(event) {
            var eventItem = $('<li class="list-group-item"></li>');
            eventItem.html('<h5>' + event.title + '</h5><p>Date: ' + event.date + '</p><p>' + event.description + '</p>');
            eventList.append(eventItem);
        });

        // Populate memorable dates list
        var memorableDatesList = $('#memorable-dates-list');
        memorableDates.forEach(function(date) {
            var dateItem = $('<li class="list-group-item"></li>');
            dateItem.html('<h5>' + date.title + '</h5><p>Date: ' + date.date + '</p><p>' + date.description + '</p>');
            memorableDatesList.append(dateItem);
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false
        });

        // Show elements on page load
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
});
