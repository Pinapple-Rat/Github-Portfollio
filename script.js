// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page load
    setTimeout(() => {
        document.querySelector('.loader-container').style.opacity = 0;
        document.querySelector('.loader-container').style.visibility = 'hidden';
    }, 2000);

    // Navigation
    const navLinks = document.querySelectorAll('.menu .link');
    const sections = document.querySelectorAll('section');

    // Set active link based on URL hash or default to home
    const setActiveLink = () => {
        const hash = window.location.hash || '#home';
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        const activeLink = document.querySelector(`.menu .link[href="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current section
        const currentSection = document.querySelector(hash);
        if (currentSection) {
            currentSection.classList.add('active');
        } else {
            document.querySelector('#home').classList.add('active');
        }
    };

    // Initial setup
    setActiveLink();

    // Listen for hash changes
    window.addEventListener('hashchange', setActiveLink);

    // Add smooth scrolling to top when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // First scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Smooth scroll for back-to-top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add download functionality to the resume button
    const resumeButton = document.querySelector('a[href$="Kevin_resume_1.67.docx"]');
    if (resumeButton) {
        resumeButton.addEventListener('click', (e) => {
            // Add analytics tracking or other functionality here if needed
            console.log('Resume download started');
            // The download will happen automatically because of the download attribute
        });
    }

    // Form submission
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = "Sending...";
                submitButton.disabled = true;
            }
            
            // Submit the form in the background
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Google Forms requires no-cors mode
            })
            .then(() => {
                // Hide the form and show success message
                contactForm.style.display = 'none';
                document.getElementById('formSubmitMessage').style.display = 'block';
                
                // Reset the form
                contactForm.reset();
                if (submitButton) {
                    submitButton.textContent = "Send Message";
                    submitButton.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (submitButton) {
                    submitButton.textContent = "Error! Try Again";
                    submitButton.disabled = false;
                }
            });
        });
    }

    // Update navigation menu function needs to be fixed
    const updateMenu = () => {
        const menu = document.querySelector('.menu');
        
        // Check if Education section link exists
        if (!document.querySelector('.menu .link[href="#education"]')) {
            const skillsLink = document.querySelector('.menu .link[href="#skills"]');
            const contactLink = document.querySelector('.menu .link[href="#contact"]');
            
            // Create Education link after Skills
            const educationLink = document.createElement('a');
            educationLink.href = '#education';
            educationLink.className = 'link';
            educationLink.innerHTML = `
                <span class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M32,64V192H224V64Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                        <path d="M72,192V64L96,88l24-24,24,24,24-24,24,24,24-24V192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                    </svg>
                </span>
                <span class="link-title">Education</span>
            `;
            
            // Create Experience link after Education
            const experienceLink = document.createElement('a');
            experienceLink.href = '#experience';
            experienceLink.className = 'link';
            experienceLink.innerHTML = `
                <span class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M80,48H40a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H80a8,8,0,0,0,8-8V56A8,8,0,0,0,80,48Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                        <rect x="120" y="128" width="88" height="88" rx="8" stroke-width="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
                        <rect x="120" y="40" width="88" height="56" rx="8" stroke-width="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
                    </svg>
                </span>
                <span class="link-title">Experience</span>
            `;
            
            // Insert links at the right position (before Contact)
            menu.insertBefore(experienceLink, contactLink);
            menu.insertBefore(educationLink, experienceLink);
            
            // Add these new links to the navLinks NodeList
            const allLinks = document.querySelectorAll('.menu .link');
            
            // Reset event listeners for all links to ensure consistent behavior
            allLinks.forEach(link => {
                // Remove any existing click listeners
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Add new click listener
                newLink.addEventListener('click', (e) => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Manually update active state
                    allLinks.forEach(l => l.classList.remove('active'));
                    newLink.classList.add('active');
                });
            });
        }
    };

    // Call updateMenu once at the beginning
    updateMenu();

    // Ensure hash changes still work after the menu update
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#home';
        
        // Update active link based on hash
        const navLinks = document.querySelectorAll('.menu .link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update active section
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });

    // Additional fix for dynamically added links to ensure consistent highlighting
    document.addEventListener('click', (e) => {
        const clickedLink = e.target.closest('.link');
        if (clickedLink) {
            const allLinks = document.querySelectorAll('.menu .link');
            allLinks.forEach(link => {
                link.classList.remove('active');
            });
            clickedLink.classList.add('active');
        }
    });

    // Fix for added navigation links to ensure they get highlighted properly
    document.addEventListener('click', (e) => {
        if (e.target.closest('.link')) {
            setTimeout(setActiveLink, 100); // Small delay to ensure hash change is processed
        }
    });
});
