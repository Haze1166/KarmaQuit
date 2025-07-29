document.addEventListener("DOMContentLoaded", function () {
  // --- Feature 1: Scroll Reveal Animation ---
  // This is the modern, performant way to detect when an element enters the screen.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optional: Stop observing after it has been revealed
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Find all elements with the class "reveal" and start observing them
  const elementsToReveal = document.querySelectorAll(".reveal");
  elementsToReveal.forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Feature 2: Animated Counter for the Streak ---
  const streakCounter = document.getElementById("streak-counter");
  const targetNumber = 14; // The final number you want to show
  let hasCounterAnimated = false;

  const counterObserver = new IntersectionObserver(
    (entries) => {
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
    },
    {
      threshold: 0.5, // Trigger when 50% of the counter is visible
    }
  );

  // ... (your existing JS code for reveal and counter)

  const healingSlider = document.getElementById("healing-slider");
  const healthyLungLayer = document.getElementById("healthy-lung-layer");

  // This check is important! It prevents errors if elements aren't found.
  if (healingSlider && healthyLungLayer) {
    const updateLungHealing = (percentage) => {
      const clipPercentage = 100 - percentage;
      healthyLungLayer.style.setProperty(
        "--healing-progress",
        `${clipPercentage}%`
      );
    };

    // Set initial state from the slider's value
    updateLungHealing(healingSlider.value);

    // Listen for changes when the user drags the slider
    healingSlider.addEventListener("input", (event) => {
      updateLungHealing(event.target.value);
    });
  } else {
    // If this message appears, there's a typo in your HTML IDs!
    console.error(
      "Could not find the slider or lung layer elements. Check your HTML for typos in the IDs."
    );
  }
});
