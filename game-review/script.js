document.addEventListener('DOMContentLoaded', (event) => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviews');

    // carrega reviews do localStorage
    loadReviews();

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // pega os valores dos inputs
        const title = document.getElementById('gameTitle').value;
        const comment = document.getElementById('gameComment').value;

        if(title && comment) {
            const review = {
                title: title,
                comment: comment,
                likes: 0
            };
            
            addReview(review);
            saveReview(review);
        }
    });

    // adiciona um review na tela
    function addReview(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        //escolhe quais elementos serão exibidos na exibição do review
        reviewElement.innerHTML = `
            <h3>${review.title}</h3>
            <p>${review.comment}</p>
            <button class="like-button">Curtir (${review.likes})</button>
        `;

        const likeButton = reviewElement.querySelector('.like-button');
        likeButton.addEventListener('click', function() {
            review.likes++;
            likeButton.textContent = `Curtir (${review.likes})`;
            updateReviews();
        });

        reviewsContainer.appendChild(reviewElement);
    }

    // salva um review no localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // carrega reviews do localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            addReview(review);
        });
    }

    // atualiza reviews no localStorage
    function updateReviews() {
        const reviews = [];
        reviewsContainer.querySelectorAll('.review').forEach((reviewElement, index) => {
            const title = reviewElement.querySelector('h3').textContent;
            const comment = reviewElement.querySelector('p').textContent;
            const likes = parseInt(reviewElement.querySelector('.like-button').textContent.match(/\d+/)[0]);
            
            //empilha os reviews
            reviews.push({ title, comment, likes });
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
});
