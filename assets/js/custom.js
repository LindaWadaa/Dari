// Transparent header on scroll
$(document).ready(function() {
    // Set initial state
    if ($(window).scrollTop() > 50) {
        $('#main_nav').addClass('transparent');
    } else {
        $('#main_nav').removeClass('transparent');
    }
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#main_nav').addClass('transparent');
        } else {
            $('#main_nav').removeClass('transparent');
        }
    });
});

// Filter scroll navigation
$(document).ready(function() {
    const filterList = $('#filterList');
    const scrollDistance = 250;
    
    $('#scrollMore').click(function(e) {
        e.preventDefault();
        filterList.animate({
            scrollLeft: filterList.scrollLeft() + scrollDistance
        }, 500);
    });
});

// IntersectionObserver to reveal Recent Work heading on scroll
$(document).ready(function() {
    const headerEl = document.querySelector('.recent-work-header');
    if (!headerEl) return;

    const io = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                headerEl.classList.add('in-view');
                io.unobserve(headerEl);
            }
        });
    }, { threshold: 0.18 });

    io.observe(headerEl);
});
