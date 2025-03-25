document.addEventListener('DOMContentLoaded', function() {
    // Navigation tabs
    const tabs = document.querySelectorAll('#nav-tabs li');
    const sections = document.querySelectorAll('main section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show relevant section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target) {
                    section.classList.add('active');
                }
            });
            
            // Smooth scroll to top of the section
            window.scrollTo({
                top: document.querySelector('main').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length < 2) return;
        
        // Remove previous highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('highlight');
        });
        
        // Find matches in all tables and text
        let matchFound = false;
        const textElements = document.querySelectorAll('.card p, .card li, .card td, .card th');
        
        textElements.forEach(el => {
            if (el.textContent.toLowerCase().includes(searchTerm)) {
                // Find the parent card and highlight it
                const parentCard = el.closest('.card');
                if (parentCard) {
                    parentCard.classList.add('highlight');
                    
                    // Show the section containing this card
                    const parentSection = parentCard.closest('section');
                    if (parentSection) {
                        sections.forEach(s => s.classList.remove('active'));
                        parentSection.classList.add('active');
                        
                        // Update the active tab
                        const sectionId = parentSection.id;
                        tabs.forEach(t => {
                            t.classList.remove('active');
                            if (t.getAttribute('data-target') === sectionId) {
                                t.classList.add('active');
                            }
                        });
                    }
                    
                    // Scroll to the first match
                    if (!matchFound) {
                        parentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        matchFound = true;
                    }
                }
            }
        });
        
        if (!matchFound) {
            alert("Aucun résultat trouvé pour : " + searchTerm);
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation to formulas on hover
    const formulas = document.querySelectorAll('.math-formulas p');
    formulas.forEach(formula => {
        formula.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        formula.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
        });
    });
    
    // Initialize: Make the first tab active
    if (tabs.length > 0 && sections.length > 0) {
        tabs[0].classList.add('active');
        sections[0].classList.add('active');
    }
    
    // Dynamic color themes for different sections
    const sectionGradients = {
        'propagation': 'var(--gradient-1)',
        'interference': 'var(--gradient-2)',
        'lumiere': 'var(--gradient-3)',
        'photoelectrique': 'var(--gradient-4)'
    };
    
    function updateSectionTheme(sectionId) {
        const gradient = sectionGradients[sectionId] || 'var(--gradient-1)';
        document.documentElement.style.setProperty('--current-gradient', gradient);
        
        // Update section heading styles
        document.querySelectorAll('h2::after').forEach(el => {
            el.style.background = gradient;
        });
    }
    
    // Update theme when changing sections
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.getAttribute('data-target');
            updateSectionTheme(targetSection);
        });
    });
    
    // Initialize with first section theme
    if (tabs.length > 0) {
        const initialSection = tabs[0].getAttribute('data-target');
        updateSectionTheme(initialSection);
    }
});
