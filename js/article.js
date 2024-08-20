$(document).ready(function() {
    $.getJSON('js/articles.json', function(data) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        const post = data.find(p => p.id === id);

        if (post) {
            $('.article-title').text(post.title);
            $('.article-meta').text(`Publié le ${post.date} par ${post.author}`);
            $('.article-text').html(post.content);
        }
    });
});
