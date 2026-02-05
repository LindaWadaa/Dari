document.addEventListener('DOMContentLoaded', function () {
    // Containers
    const partnersContainer = document.getElementById('dynamic-partners');
    const projectsContainer = document.getElementById('dynamic-projects');

    // Filter Buttons
    const partnerFilters = document.querySelectorAll('.partner-filter');
    const projectFilters = document.querySelectorAll('.project-filter');

    // --- Render Functions ---

    function renderPartners(filter = 'all') {
        if (!partnersContainer) return;

        partnersContainer.innerHTML = '';
        const filtered = filter === 'all'
            ? dariData.partners
            : dariData.partners.filter(p => p.category === filter);

        filtered.forEach(partner => {
            const card = `
                <div class="col-md-4 mb-4 animate__animated animate__fadeIn">
                    <div class="card partner-card border-0 shadow-sm h-100">
                        <div class="card-img-top-wrapper">
                            <img src="${partner.image}" class="card-img-top" alt="${partner.name}">
                            <div class="partner-overlay">
                                <span class="badge bg-primary rounded-pill">${partner.job}</span>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title semi-bold-600 mb-1">${partner.name}</h5>
                            <p class="text-muted small mb-3"><i class='bx bx-map'></i> ${partner.city}</p>
                            <p class="card-text small mb-4">${partner.description}</p>
                            <a href="tel:${partner.phone.replace(/\s/g, '')}" class="btn btn-outline-primary btn-sm rounded-pill px-4">
                                <i class='bx bx-phone'></i> Contacter
                            </a>
                        </div>
                    </div>
                </div>
            `;
            partnersContainer.innerHTML += card;
        });
    }

    function renderProjects(filter = 'all') {
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';
        const filtered = filter === 'all'
            ? dariData.projects
            : dariData.projects.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = `
                <div class="col-xl-3 col-md-4 col-sm-6 mb-4 animate__animated animate__fadeIn">
                    <div class="service-work card border-0 text-white shadow-sm overflow-hidden">
                        <img class="card-img" src="${project.image}" alt="${project.title}">
                        <div class="service-work-vertical card-img-overlay d-flex align-items-end">
                            <div class="service-work-content text-left text-light">
                                <span class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300">${project.tag}</span>
                                <h5 class="h6">${project.title}</h5>
                                <p class="card-text small">${project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += card;
        });
    }

    // --- Filter Handlers ---

    partnerFilters.forEach(btn => {
        btn.addEventListener('click', function () {
            partnerFilters.forEach(b => b.classList.remove('active', 'btn-primary'));
            partnerFilters.forEach(b => b.classList.add('btn-outline-primary'));
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            renderPartners(this.dataset.filter);
        });
    });

    projectFilters.forEach(btn => {
        btn.addEventListener('click', function () {
            projectFilters.forEach(b => b.classList.remove('active', 'btn-primary'));
            projectFilters.forEach(b => b.classList.add('btn-outline-primary'));
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            renderProjects(this.dataset.filter);
        });
    });

    // --- Initial Render ---
    renderPartners();
    renderProjects();
});
