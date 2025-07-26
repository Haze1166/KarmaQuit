document.addEventListener('DOMContentLoaded', function() {

    // --- Feature 1: Scroll Reveal Animation ---
    // This is the modern, performant way to detect when an element enters the screen.
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing after it has been revealed
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Find all elements with the class "reveal" and start observing them
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });


    // --- Feature 2: Animated Counter for the Streak ---
    const streakCounter = document.getElementById('streak-counter');
    const targetNumber = 14; // The final number you want to show
    let hasCounterAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        const [entry] = entries; // Get the first entry
        if (entry.isIntersecting && !hasCounterAnimated) {
            hasCounterAnimated = true; // Ensure it only animates once
            let currentNumber = 0;
            const increment = targetNumber / 100; // Animate over ~100 frames

            const updateCounter = () => {
                currentNumber += increment;
                if (currentNumber < targetNumber) {
                    streakCounter.textContent = Math.ceil(currentNumber);
                    requestAnimationFrame(updateCounter); // Smooth animation
                } else {
                    streakCounter.textContent = targetNumber; // Ensure it ends exactly on target
                }
            };
            updateCounter();
            counterObserver.unobserve(streakCounter); // Stop observing
        }
    }, {
        threshold: 0.5 // Trigger when 50% of the counter is visible
    });
    
    // Start observing the counter element
    if (streakCounter) {
        counterObserver.observe(streakCounter);
    }
});