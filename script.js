var swiper = new Swiper('.swiper-container', {
    loop: true, // Enables continuous loop mode
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3, // Show 3 slides at a time
    centeredSlides: true, // Center the active slide
    spaceBetween: 30,
    autoplay: {
        delay: 3000, // Auto-slide every 3 seconds
        disableOnInteraction: false,
    },

});

function changeImage() {
    var img = document.getElementById('image');
    img.src = 'img/Reyna.png'; 
}

function prevImage() {
    console.log("Previous button clicked");
}

function nextImage() {
    console.log("Next button clicked");
}

