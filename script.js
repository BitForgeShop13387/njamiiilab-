// Gallery - Store images in localStorage
const upload = document.getElementById('upload');
const imagesDiv = document.getElementById('images');
if(localStorage.getItem('galleryImgs')) {
    imagesDiv.innerHTML = localStorage.getItem('galleryImgs');
}
upload?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const img = document.createElement('img');
        img.src = evt.target.result;
        imagesDiv.appendChild(img);
        localStorage.setItem('galleryImgs', imagesDiv.innerHTML);
    };
    reader.readAsDataURL(file);
});

// Reviews - Store in localStorage
const form = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');
function renderReviews() {
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviewList.innerHTML = '';
    reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `<b>${r.name}</b> (${r.stars}★)<br>${r.text}`;
        reviewList.appendChild(div);
    });
}
form?.addEventListener('submit', e => {
    e.preventDefault();
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.unshift({
        name: form.name.value,
        text: form['review-text'].value,
        stars: form.stars.value
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
    form.reset();
});
renderReviews();

