document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const loadPrefsBtn = document.getElementById('loadPrefs');
    const clearPrefsBtn = document.getElementById('clearPrefs');
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    
    // Animation types
    const animations = ['spin', 'bounce'];
    let currentAnimationIndex = 0;
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
    });
    
    // Load preferences from localStorage
    loadPrefsBtn.addEventListener('click', function() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username;
            themeSelect.value = preferences.theme;
            applyTheme(preferences.theme);
            alert('Preferences loaded!');
        } else {
            alert('No preferences found in storage.');
        }
    });
    
    // Clear preferences from localStorage
    clearPrefsBtn.addEventListener('click', function() {
        localStorage.removeItem('userPreferences');
        usernameInput.value = '';
        themeSelect.value = 'light';
        applyTheme('light');
        alert('Preferences cleared!');
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animatedElement.classList.remove(...animations);
        
        // Force reflow to restart animation
        void animatedElement.offsetWidth;
        
        // Add the current animation class
        const animationClass = animations[currentAnimationIndex];
        animatedElement.classList.add(animationClass);
        
        // Cycle to the next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
    });
    
    // Apply theme to the page
    function applyTheme(theme) {
        document.body.className = theme;
    }
    
    // Check for saved preferences on page load
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
        const preferences = JSON.parse(savedPrefs);
        usernameInput.value = preferences.username;
        themeSelect.value = preferences.theme;
        applyTheme(preferences.theme);
    }
    
    // Add hover effect to animate button using transition
    animateBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#4CAF50';
        this.style.color = 'white';
    });
    
    animateBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '';
        this.style.color = '';
    });
    
    // Animation end event
    animatedElement.addEventListener('animationend', function() {
        this.classList.remove(...animations);
    });
});