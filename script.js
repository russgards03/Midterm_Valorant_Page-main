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

const weaponImg = document.getElementById('weapon-img');
const newWeaponImg = document.getElementById('new-weapon-img'); // The second image
let currentSound = new Audio();
const weaponTitle = document.getElementById('weapon-title');
const buttons = document.querySelectorAll('#options-wrapper ul li button');

const weapons = {
    'sidearms-btn': { src: 'img/classic.webp', title: 'CLASSIC', sound: 'audio/classic.mp3' },
    'smgs-btn': { src: 'img/spectre.webp', title: 'SPECTRE', sound: 'sounds/spectre.mp3' },
    'shotguns-btn': { src: 'img/bucky.webp', title: 'BUCKY', sound: 'sounds/bucky.mp3' },
    'rifles-btn': { src: 'img/vandal.webp', title: 'VANDAL', sound: 'sounds/vandal.mp3' },
    'sniper-rifles-btn': { src: 'img/operator.webp', title: 'OPERATOR', sound: 'sounds/operator.mp3' },
    'machine-guns-btn': { src: 'img/odin.webp', title: 'ODIN', sound: 'sounds/odin.mp3' }
};

document.addEventListener('DOMContentLoaded', () => {
    const weaponImg = document.getElementById('weapon-img');
    const newWeaponImg = document.getElementById('new-weapon-img');
    let currentSound = new Audio(); // Create an empty audio object to be updated later
    const weaponTitle = document.getElementById('weapon-title');
    const buttons = document.querySelectorAll('#options-wrapper ul li button');

    currentSound.play();
    let firingInterval;
    
    // Define weapon images, titles, and sounds
    const weapons = {
        'sidearms-btn': { src: 'img/classic.webp', title: 'CLASSIC', sound: 'audio/classic.mp3' },
        'smgs-btn': { src: 'img/spectre.webp', title: 'SPECTRE', sound: 'audio/spectre.mp3' },
        'shotguns-btn': { src: 'img/bucky.webp', title: 'BUCKY', sound: 'audio/bucky.mp3' },
        'rifles-btn': { src: 'img/vandal.webp', title: 'VANDAL', sound: 'audio/vandal.mp3' },
        'sniper-rifles-btn': { src: 'img/operator.webp', title: 'OPERATOR', sound: 'audio/operator.mp3' },
        'machine-guns-btn': { src: 'img/odin.webp', title: 'ODIN', sound: 'audio/odin.mp3' }
    };

    function startFiring() {
        currentSound.play();
        weaponImg.classList.add('firing');
        firingInterval = setInterval(() => {
            currentSound.currentTime = 0; // Reset sound to the beginning
            currentSound.play();
        }, 200); // Adjust the interval for the desired firing rate
    }

    // Function to stop firing sound loop
    function stopFiring() {
        clearInterval(firingInterval);
        currentSound.currentTime = 0; // Reset sound to the beginning
         weaponImg.classList.remove('firing');
    }

    // Add event listeners for mousedown and mouseup
    weaponImg.addEventListener('mousedown', startFiring);
    weaponImg.addEventListener('mouseup', stopFiring);
    weaponImg.addEventListener('mouseleave', stopFiring);

    // Add click event listener to play sound and rotate the image
    weaponImg.addEventListener('click', function () {

        // Check if the 'rotate' class is already applied
        if (!weaponImg.classList.contains('rotate')) {
            // Add the 'rotate' class to initiate the rotation
            weaponImg.classList.add('rotate');

            // Show the new image
            newWeaponImg.style.display = 'block';

            // Remove the class after the rotation is complete
            setTimeout(() => {
                weaponImg.classList.remove('rotate');
                newWeaponImg.style.display = 'none'; // Hide the new image after rotation
            }, 200); // Match the CSS transition duration (1 second)
        }
    });

    // Add click event listeners to weapon buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Update weapon image, title, and sound
            const weapon = weapons[button.id];
            weaponImg.src = weapon.src;
            weaponTitle.textContent = weapon.title;
            currentSound.src = weapon.sound; // Update the current sound to match the weapon
        });
    });

    // Optionally, set a default active button
    document.getElementById('sidearms-btn').click();
});
