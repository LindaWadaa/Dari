// Transparent header on scroll
$(document).ready(function () {
    // Set initial state
    if ($(window).scrollTop() > 50) {
        $('#main_nav').addClass('transparent');
    } else {
        $('#main_nav').removeClass('transparent');
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#main_nav').addClass('transparent');
        } else {
            $('#main_nav').removeClass('transparent');
        }
    });
});

// Filter scroll navigation
$(document).ready(function () {
    const filterList = $('#filterList');
    const scrollDistance = 250;

    $('#scrollMore').click(function (e) {
        e.preventDefault();
        filterList.animate({
            scrollLeft: filterList.scrollLeft() + scrollDistance
        }, 500);
    });
});

// IntersectionObserver to reveal Recent Work heading on scroll
$(document).ready(function () {
    const headerEl = document.querySelector('.recent-work-header');
    if (!headerEl) return;

    const io = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                headerEl.classList.add('in-view');
                io.unobserve(headerEl);
            }
        });
    }, { threshold: 0.18 });

    io.observe(headerEl);
});

// Counter Animation Logic
$(document).ready(function () {
    const counters = document.querySelectorAll('.counter-number');
    const section = document.querySelector('.counter-section');

    if (!section || counters.length === 0) return;

    // Fetch dynamic counts
    const updateDynamicCounts = () => {
        // Partners count from partnersData (global from data.js)
        if (typeof partnersData !== 'undefined') {
            const partnersCounter = document.getElementById('partners-counter');
            if (partnersCounter) {
                partnersCounter.setAttribute('data-target', partnersData.length);
            }
        }

        // Projects count from .recent-work elements
        const projectCards = document.querySelectorAll('.recent-work.card');
        const projectsCounter = document.getElementById('projects-counter');
        if (projectsCounter) {
            projectsCounter.setAttribute('data-target', projectCards.length);
        }
    };

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // Lower is faster
                const inc = Math.max(1, Math.floor(target / speed));

                if (count < target) {
                    counter.innerText = Math.min(target, count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target === 20 || target === partnersData.length ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Delay to ensure data.js and Isotope cards are loaded/counted
    setTimeout(() => {
        updateDynamicCounts();

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                counterObserver.unobserve(section);
            }
        }, { threshold: 0.5 });

        counterObserver.observe(section);
    }, 500);
});

// Marketplace filtering and rendering - Manual Dropdown Control
$(document).ready(function() {
    const productGrid = $('#marketplace-cards-container');
    const searchForm = $('#products-search-form');
    let selectedCategory = 'all';
    let selectedPrice = 'all';

    if (productGrid.length === 0 || typeof marketplaceData === 'undefined') {
        return;
    }

    function renderProducts(products) {
        productGrid.empty();
        if (products.length === 0) {
            productGrid.html('<div class="col-12 text-center"><p class="fs-5">Aucun article ne correspond à votre recherche.</p></div>');
            return;
        }
        products.forEach(product => {
            const availabilityClass = product.availability.toLowerCase() === 'disponible' ? 'status-available' : 'status-unavailable';
            const availabilityIcon = product.availability.toLowerCase() === 'disponible' ? "<i class='bx bx-check-circle'></i>" : "<i class='bx bx-x-circle'></i>";
            const priceText = typeof product.price === 'number' ? product.price.toFixed(2) + ' DT' : product.price;
            const cardHtml = `
                <div class="col-xl-3 col-md-4 col-sm-6 project ${product.category}">
                    <div class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0">
                        <img class="service card-img" src="${product.image}" alt="${product.name}">
                        <div class="service-work-vertical card-img-overlay d-flex flex-column justify-content-end">
                            <div class="service-work-content text-left text-light w-100">
                                <span class="btn btn-outline-light rounded-pill mb-2 px-4 light-300" style="font-weight: 600;">${product.name}</span>
                                <p class="card-text mb-1 small">${priceText}</p>
                                <div class="status-badge ${availabilityClass}">${availabilityIcon} ${product.availability}</div>
                            </div>
                            <div class="mt-3 text-center">
                                <a href="#" class="animated-button" data-product-name="${product.name}">
                                    <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                                    <span class="text"> Réserver </span>
                                    <span class="circle"></span>
                                    <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
            productGrid.append(cardHtml);
        });
    }

    renderProducts(marketplaceData);

    // ===== Gestionnaire pour les boutons Réserver =====
    function setupReservationButtons() {
        const reservationModalEl = document.getElementById('reservationModal');
        const reservationModal = reservationModalEl ? new bootstrap.Modal(reservationModalEl) : null;

        document.addEventListener('click', function(e) {
            const animatedButton = e.target.closest('.animated-button');
            if (animatedButton && animatedButton.hasAttribute('data-product-name')) {
                e.preventDefault();
                const productName = animatedButton.getAttribute('data-product-name');
                
                if (productName) {
                    document.getElementById('reservationProductName').value = productName;
                    document.getElementById('reservationProductLabel').value = productName;
                    document.getElementById('reservationQuantity').value = 1;
                    if (reservationModal) {
                        reservationModal.show();
                    }
                }
            }
        });
    }

    // Initialiser les boutons au chargement
    setupReservationButtons();

    // Réinitialiser les boutons après chaque filtre
    const originalRenderProducts = renderProducts;
    renderProducts = function(products) {
        originalRenderProducts(products);
        // Les gestionnaires d'événements persistent, pas besoin de réinitialiser
    };

    // ===== Fin Gestionnaire pour les boutons Réserver =====
    const dropdowns = $('.products-search-dropdown');

    // Handle clicking the dropdown button
    dropdowns.find('.dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        const currentDropdown = $(this).closest('.products-search-dropdown');
        // Close other dropdowns
        dropdowns.not(currentDropdown).removeClass('show');
        // Toggle current dropdown
        currentDropdown.toggleClass('show');
    });

    // Handle selecting an item
    dropdowns.find('.dropdown-item').on('click', function(e) {
        e.preventDefault();
        const value = $(this).data('value');
        const text = $(this).text();
        const currentDropdown = $(this).closest('.products-search-dropdown');
        const button = currentDropdown.find('.dropdown-toggle');

        button.text(text); // Update button text

        const dropdownId = button.attr('id');
        if (dropdownId === 'dropdownCategory') {
            selectedCategory = value;
        } else if (dropdownId === 'dropdownPrice') {
            selectedPrice = value;
        }

        currentDropdown.removeClass('show'); // Close dropdown after selection
    });

    // Close dropdowns if clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.products-search-dropdown').length) {
            dropdowns.removeClass('show');
        }
    });
    
    // --- End Manual Dropdown Logic ---

    searchForm.on('submit', function(e) {
        e.preventDefault();
        let filteredData = marketplaceData;

        // Filter by category if selected
        if (selectedCategory !== 'all') {
            filteredData = filteredData.filter(product => product.category === selectedCategory);
        }

        // Filter by price if selected (independent of category)
        if (selectedPrice !== 'all') {
            if (selectedPrice.includes('+')) {
                // Handle "5000+" case
                const minPrice = parseFloat(selectedPrice.replace('+', ''));
                filteredData = filteredData.filter(product => product.price >= minPrice);
            } else if (selectedPrice.includes('-')) {
                // Handle "0-500", "500-1000" etc.
                const [minPriceStr, maxPriceStr] = selectedPrice.split('-');
                const minPrice = parseFloat(minPriceStr);
                const maxPrice = parseFloat(maxPriceStr);
                filteredData = filteredData.filter(product => product.price >= minPrice && product.price <= maxPrice);
            }
        }
        
        renderProducts(filteredData);
    });

    // ===== Gestionnaire pour envoyer le formulaire de réservation =====
    emailjs.init('Ej_e9xjp3DuqP-CoJ');

    console.log('✓ EmailJS initialisé');

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        const reservationSubmitStatus = document.getElementById('reservationSubmitStatus');

        const setReservationStatus = (message, type) => {
            if (!reservationSubmitStatus) {
                return;
            }

            reservationSubmitStatus.textContent = message;
            reservationSubmitStatus.classList.remove('is-success', 'is-error');
            if (type) {
                reservationSubmitStatus.classList.add(type);
            }
        };

        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            setReservationStatus('', null);

            const firstName = document.getElementById('reservationFirstName').value.trim();
            const lastName = document.getElementById('reservationLastName').value.trim();
            const email = document.getElementById('reservationEmail').value.trim();
            const phone = document.getElementById('reservationPhone').value.trim();
            const address = document.getElementById('reservationAddress').value.trim();
            const quantity = document.getElementById('reservationQuantity').value.trim();
            const productName = document.getElementById('reservationProductName').value.trim();
            const message = document.getElementById('reservationMessage').value.trim();

            console.log('🔘 Formulaire soumis');
            console.log('📋 Données du formulaire:', { firstName, lastName, email, phone, address, quantity, productName, message });

            // Validation des champs obligatoires
            if (!firstName || !lastName || !email || !phone || !address || !quantity) {
                console.warn('⚠️ Champs manquants');
                setReservationStatus('Veuillez remplir tous les champs obligatoires.', 'is-error');
                return;
            }

            // Validation du prénom (lettres et espaces seulement)
            if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(firstName)) {
                console.warn('⚠️ Prénom invalide');
                setReservationStatus('Le prénom doit contenir que des lettres et des espaces.', 'is-error');
                return;
            }

            // Validation du nom (lettres et espaces seulement)
            if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(lastName)) {
                console.warn('⚠️ Nom invalide');
                setReservationStatus('Le nom doit contenir que des lettres et des espaces.', 'is-error');
                return;
            }

            // Validation du téléphone (+216 + 8 chiffres)
            if (!/^\+216[0-9]{8}$/.test(phone)) {
                console.warn('⚠️ Téléphone invalide');
                setReservationStatus('Le numéro doit être +216 suivi de 8 chiffres.', 'is-error');
                return;
            }

            // Validation du message (optionnel mais 50+ caractères si rempli)
            if (message && message.length < 50) {
                console.warn('⚠️ Message trop court');
                setReservationStatus('Le message doit contenir au moins 50 caractères.', 'is-error');
                return;
            }

            const templateParams = {
                to_email: 'dari4communication@gmail.com',
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                quantity: quantity,
                product_name: productName,
                message: message || 'Aucun message'
            };

            console.log('📤 Envoi avec EmailJS...', templateParams);

            emailjs.send('service_hustknf', 'template_qbjzujz', templateParams)
                .then(function(response) {
                    console.log('✅ Email envoyé avec succès!', response);
                    setReservationStatus('Email envoyé avec succès.', 'is-success');
                    reservationForm.reset();
                }, function(error) {
                    console.error('❌ Erreur EmailJS:', error);
                    setReservationStatus('Erreur lors de l\'envoi.', 'is-error');
                });
        });
    }

    console.log('✓ Gestionnaire de formulaire de réservation initialisé');
    // ===== Fin Gestionnaire pour envoyer le formulaire de réservation =====
});
