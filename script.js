var swiper = new Swiper('.swiper-container', {
    loop: true, 
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3, 
    centeredSlides: true, 
    spaceBetween: 500,
    autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const weaponImg = document.getElementById('weapon-img');
    const newWeaponImg = document.getElementById('new-weapon-img');
    let currentSound = new Audio(); 
    const weaponTitle = document.getElementById('weapon-title');
    const buttons = document.querySelectorAll('#options-wrapper ul li button');
    const range = document.querySelector('#weapons #damage-wrapper');

    document.querySelector('#sidearms-btn').addEventListener('click', () => updateWeapon('sidearms-btn'));
    document.querySelector('#smgs-btn').addEventListener('click', () => updateWeapon('smgs-btn'));
    document.querySelector('#shotguns-btn').addEventListener('click', () => updateWeapon('shotguns-btn'));
    document.querySelector('#rifles-btn').addEventListener('click', () => updateWeapon('rifles-btn'));
    document.querySelector('#sniper-rifles-btn').addEventListener('click', () => updateWeapon('sniper-rifles-btn'));
    document.querySelector('#machine-guns-btn').addEventListener('click', () => updateWeapon('machine-guns-btn'));

    currentSound.play();
    let firingInterval;
    let isFiring = false;  // Flag to control firing state
    
    const weapons = {
        'sidearms-btn': { 
            src: 'img/Sheriff_Kingdom2.png', 
            title: 'SHERIFF', 
            sound: 'audio/sheriff.mp3',
            damage: {
                range1: { head: 159, body: 55, legs: 46 },
                range2: { head: 145, body: 50, legs: 42 }
            } 
        },
        'smgs-btn': { 
            src: 'img/Spectre_URF_v2.png', 
            title: 'SPECTRE', 
            sound: 'audio/spectre.mp3',
            damage: {
                range1: { head: 66, body: 22, legs: 18 },
                range2: { head: 60, body: 20, legs: 17 }
            } 
         },
        'shotguns-btn': { 
            src: 'img/Bucky_Oni.png', 
            title: 'BUCKY', 
            sound: 'audio/bucky.mp3',
            damage: {
                range1: { head: 26, body: 13, legs: 11 },
                range2: { head: 18, body: 9, legs: 7 }
            }  },
        'rifles-btn': { 
            src: 'img/Vandal_Dragon.png', 
            title: 'VANDAL', 
            sound: 'audio/vandal.mp3',
            damage: {
                range1: { head: 160, body: 40, legs: 34 },
                range2: { head: 160, body: 40, legs: 34 }
            }  },
        'sniper-rifles-btn': { 
            src: 'img/Operator_Cyberpunk2.png', 
            title: 'OPERATOR', 
            sound: 'audio/operator.mp3',
            damage: {
                range1: { head: 255, body: 255, legs: 120 },
                range2: { head: 255, body: 255, legs: 120 }
            }  },
        'machine-guns-btn': { 
            src: 'img/Odin_HypeBeast2.png', 
            title: 'ODIN', 
            sound: 'audio/odin.mp3',
            damage: {
                range1: { head: 95, body: 38, legs: 32 },
                range2: { head: 77, body: 31, legs: 26 }
            }  }
    };

    function updateWeapon(weaponKey) {
        const weapon = weapons[weaponKey];
        
        if (weapon) {
            // Update weapon image
            const weaponImg = document.querySelector('#weapon-img');
            weaponImg.src = weapon.src;
    
            // Update weapon title
            const weaponTitle = document.querySelector('#weapon-title');
            weaponTitle.textContent = weapon.title;
    
            // Update damage details
            const damageWrapper = document.querySelector('#damage-wrapper');
            damageWrapper.querySelector('#first-range-wrapper h4:nth-child(2)').textContent = weapon.damage.range1.head;
            damageWrapper.querySelector('#first-range-wrapper h4:nth-child(3)').textContent = weapon.damage.range1.body;
            damageWrapper.querySelector('#first-range-wrapper h4:nth-child(4)').textContent = weapon.damage.range1.legs;
    
            damageWrapper.querySelector('#second-range-wrapper h4:nth-child(2)').textContent = weapon.damage.range2.head;
            damageWrapper.querySelector('#second-range-wrapper h4:nth-child(3)').textContent = weapon.damage.range2.body;
            damageWrapper.querySelector('#second-range-wrapper h4:nth-child(4)').textContent = weapon.damage.range2.legs;
    
            // Dynamic margin and padding based on the weapon
            const swiperContainer = document.querySelector('.swiper-container');
            switch (weaponKey) {
                case 'sidearms-btn':
                    swiperContainer.style.margin = '20px';
                    swiperContainer.style.padding = '10px';
                    break;
                case 'smgs-btn':
                    swiperContainer.style.marginTop = '30px';
                    swiperContainer.style.padding = '15px';
                    break;
                case 'shotguns-btn':
                    swiperContainer.style.margin = '40px';
                    swiperContainer.style.padding = '20px';
                    break;
                case 'rifles-btn':
                    swiperContainer.style.margin = '50px';
                    swiperContainer.style.padding = '25px';
                    break;
                case 'sniper-rifles-btn':
                    swiperContainer.style.margin = '60px';
                    swiperContainer.style.padding = '30px';
                    break;
                case 'machine-guns-btn':
                    swiperContainer.style.margin = '70px';
                    swiperContainer.style.padding = '35px';
                    break;
                default:
                    swiperContainer.style.margin = '0px';
                    swiperContainer.style.padding = '0px';
                    break;
            }
        }
    }

    function startFiring() {
        isFiring = true;
        currentSound.play();
        weaponImg.classList.add('firing'); // Add firing class for animation
        firingInterval = setInterval(() => {
            if (isFiring) {  // Only play if still firing
                currentSound.currentTime = 0;
                currentSound.play();
            }
        }, 200); 
    }

    function stopFiring() {
        isFiring = false; // Prevent new sounds from being played
        clearInterval(firingInterval);
        weaponImg.classList.remove('firing'); // Remove firing class to stop animation
    }

    weaponImg.addEventListener('mousedown', startFiring);
    
    // Listen globally for 'mouseup' to ensure firing stops even if mouse is released outside the image
    window.addEventListener('mouseup', stopFiring);
    weaponImg.addEventListener('mouseleave', stopFiring);

    weaponImg.addEventListener('click', function () {
        if (!weaponImg.classList.contains('rotate')) {
            weaponImg.classList.add('rotate');
            newWeaponImg.style.display = 'block';
            setTimeout(() => {
                weaponImg.classList.remove('rotate');
                newWeaponImg.style.display = 'none'; 
            }, 200);
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const weapon = weapons[button.id];
            weaponImg.src = weapon.src;
            weaponTitle.textContent = weapon.title;
            currentSound.src = weapon.sound; 
        });
    });

    // Simulate a click on one of the weapon buttons to initialize the first weapon
    document.getElementById('sidearms-btn').click();
});