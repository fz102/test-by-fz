
// intro logo 
document.addEventListener('DOMContentLoaded', () => {
  // Select all h1, h3, and h4 elements with the class 'animate-on-scroll'
  const headings = document.querySelectorAll('h1.animate-on-scroll, h3.animate-on-scroll, h4.animate-on-scroll');

  // Loop through each element
  headings.forEach((heading) => {
    // Create a new container div with overflow hidden
    const container = document.createElement('div');
    container.style.overflow = 'hidden'; // Ensures content is clipped
    container.style.display = 'inline-block'; // Keeps container size relative to content

    // Insert the new container before the heading
    heading.parentNode.insertBefore(container, heading);

    // Move the heading into the new container
    container.appendChild(heading);
  });
});

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);



    

 ScrollTrigger.create({
  trigger: '.mask-section',
  start: 'top bottom', // Trigger when the top of .mask-section is at the bottom of the viewport
  onEnter: () => {
    // Start the scaling animation with a 1-second delay
    gsap.to('.mask-svg', {
      scale: 30,
      duration: 2, // Adjust duration as needed
      ease: 'power1.out', // Easing function for smooth animation
      delay: 1.5, // 1 second delay after entering the section
    });
  },
  onEnterBack: () => {
    // Restart the animation when scrolling back to the previous section (start of the page)
    gsap.to('.mask-svg', {
      scale: 30,
      duration: 0, // Adjust duration as needed
      ease: 'power1.out', // Easing function for smooth animation
      delay: 0, // 1 second delay after entering the section
    });
  },
  onLeave: () => {
    // Maintain the max scale when moving to the next section
    gsap.set('.mask-svg', {
      scale: 30,
        duration: 0,
    });
  },
  onLeaveBack: () => {
    // Reset the animation to its initial state when going back to the start of the page
    gsap.set('.mask-svg', {
      scale: 1, // Reset scale to initial value
    });
  },
  markers: false // Set to true for debugging purposes to see trigger points
});   
    



//////////// all page JS ( class att using ) ///////




 
    


// Call the function to apply animations to elements
applyAnimationToElements();
    
    


// Wrap each word or text in spans for animation

    


    initializeScrollTriggers();
}
// Start loding // 

document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const loadingPercentage = document.getElementById('loading-percentage');

    let totalAssets = document.images.length; // Total number of images to load
    let assetsLoaded = 0; // Counter for loaded assets

    // Function to update the percentage
    function updatePercentage() {
        assetsLoaded++;
        let percentComplete = Math.floor((assetsLoaded / totalAssets) * 100);
        loadingPercentage.textContent = `${percentComplete}%`;

        // When all assets are loaded, hide the preloader
        if (assetsLoaded === totalAssets) {
            setTimeout(() => {
                preloader.style.transition = 'opacity 0.5s ease';
                preloader.style.opacity = '0';

                setTimeout(() => {
                    preloader.style.display = 'none';
                    mainContent.style.display = 'block';
                    initAnimations(); // Initialize GSAP animations after content is visible
                }, 500); // Match with transition duration
            }, 300); // Slight delay to ensure a smooth transition to 100%
        }
    }

    // Loop through all images and attach an event listener for load completion
    Array.from(document.images).forEach((img) => {
        if (img.complete) {
            updatePercentage();
        } else {
            img.addEventListener('load', updatePercentage);
            img.addEventListener('error', updatePercentage); // Handle errors to still count towards total
        }
    });
});

// End loding //

document.addEventListener('DOMContentLoaded', () => {
    
   // Show 'en' content initially
  const enElements = document.querySelectorAll('.en');
  enElements.forEach(el => el.style.display = 'block'); // Show 'en' elements   
    
  // Initially hide all 'ar' content
  const arElements = document.querySelectorAll('.ar');
  arElements.forEach(el => el.style.display = 'none'); // Hide 'ar' elements

  const toggleButton = document.getElementById('toggle-language');

  // Set the initial button text
  toggleButton.textContent = 'AR';

  // Toggle language function
  toggleButton.addEventListener('click', () => {
    const enElements = document.querySelectorAll('.en');
    const arElements = document.querySelectorAll('.ar');
    const isEnVisible = enElements[0].style.display !== 'none'; // Check if 'en' content is visible

    if (isEnVisible) {
      // Animate 'en' elements out to the left
      enElements.forEach(el => slideOutLeft(el, () => el.style.display = 'none'));

      // After the 'en' elements are out, slide 'ar' elements in from the right
      setTimeout(() => {
        arElements.forEach(el => {
          el.style.display = 'block';
          slideInRight(el);
        });
      }, 500); // Adjust delay to match the slide-out duration

      toggleButton.textContent = 'EN'; // Change button text to 'EN'
    } else {
      // Animate 'ar' elements out to the right
      arElements.forEach(el => slideOutRight(el, () => el.style.display = 'none'));

      // After the 'ar' elements are out, slide 'en' elements in from the left
      setTimeout(() => {
        enElements.forEach(el => {
          el.style.display = 'block';
          slideInLeft(el);
        });
      }, 500); // Adjust delay to match the slide-out duration

      toggleButton.textContent = 'AR'; // Change button text to 'AR'
    }
  });

  // Slide animations
  function slideInRight(element) {
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
    }, 10);
  }

  function slideOutLeft(element, callback) {
    element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    element.style.transform = 'translateX(-100%)';
    element.style.opacity = '0';
    setTimeout(callback, 500); // Match the duration of the transition
  }

  function slideInLeft(element) {
    element.style.transform = 'translateX(-100%)';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
    }, 10);
  }

  function slideOutRight(element, callback) {
    element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';
    setTimeout(callback, 500); // Match the duration of the transition
  }
    
  const sections = document.querySelectorAll('.section'); // Select all sections
  let currentSectionIndex = 0; // Track the current section index
  const totalSections = sections.length; // Total number of sections
  let isThrottled = false; // Throttle flag to control the scrolling speed
  const throttleDuration = 2000; // Throttle duration in milliseconds (2 seconds)

  const btnUp = document.getElementById('btn-up');
  const btnDown = document.getElementById('btn-down');
  const scrollButtons = document.querySelectorAll('.btn.explore'); // Select all buttons with the class 'explore'

  let startY = 0; // Variable to store the starting Y position for touch
  let endY = 0; // Variable to store the ending Y position for touch

  // Function to animate elements within the section
  function animateElementsInSection(section, direction) {
    const elements = section.querySelectorAll('.animate-on-scroll');

    elements.forEach((element) => {
      const fromX = parseFloat(element.getAttribute('data-from-x')) || 0;
      const fromY = parseFloat(element.getAttribute('data-from-y')) || 100;
      const duration = parseFloat(element.getAttribute('data-duration')) || 1;
      const delay = parseFloat(element.getAttribute('data-delay')) || 0; // Get delay from attribute, default to 0

      if (direction === 'out') {
        gsap.to(element, {
          x: fromX,
          y: fromY,
          opacity: 0,
          duration: duration / 0.5,
          delay: delay, // Apply delay
          ease: 'power2.in'
        });
      } else if (direction === 'in') {
        gsap.fromTo(
          element,
          {
            x: -fromX,
            y: -fromY,
            opacity: 0
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: duration,
            delay: delay, // Apply delay
            ease: 'power2.out'
          }
        );
      }
    });

    const animateImages = section.querySelectorAll('.animate-image');
    animateImages.forEach((element) => {
      const xValue = element.getAttribute('data-i-x') || '0';
      const yValue = element.getAttribute('data-i-y') || '0';
      const durationValue = parseFloat(element.getAttribute('data-i-d')) || '1';
      const delayValue = parseFloat(element.getAttribute('data-delay')) || 0; // Get delay from attribute, default to 0

      gsap.to(element, {
        x: xValue,
        y: yValue,
        duration: durationValue,
        repeat: -1,
        yoyo: true,
        delay: delayValue, // Apply delay
        ease: 'power1.inOut',
      });
    });
  }

  function navigateToSection(index) {
    animateElementsInSection(sections[currentSectionIndex], 'out');
    currentSectionIndex = index;
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      animateElementsInSection(sections[currentSectionIndex], 'in');
      updateNavigationButtons(); // Update buttons visibility after navigation
    }, 500);
  }

  function handleNavigation(direction) {
    if (!isThrottled) {
      if (direction === 'down' && currentSectionIndex < totalSections - 1) {
        navigateToSection(currentSectionIndex + 1);
      } else if (direction === 'up' && currentSectionIndex > 0) {
        navigateToSection(currentSectionIndex - 1);
      }

      isThrottled = true;
      setTimeout(() => (isThrottled = false), throttleDuration);
    }
  }

  // Event listeners for button clicks
  btnUp.addEventListener('click', () => {
    if (currentSectionIndex === 0) {
      navigateToSection(totalSections - 1); // Go to the last section from the first section
    } else if (currentSectionIndex === totalSections - 1) {
      navigateToSection(0); // Go to the first section from the last section
    } else {
      handleNavigation('up');
    }
  });

  btnDown.addEventListener('click', () => {
    handleNavigation('down');
  });

  // Event listener for each scroll button to go to the next section
  scrollButtons.forEach((scrollButton) => {
    scrollButton.addEventListener('click', () => {
      if (currentSectionIndex < totalSections - 1) {
        navigateToSection(currentSectionIndex + 1);
      }
    });
  });

  // Function to update the visibility of navigation buttons
  function updateNavigationButtons() {
    if (currentSectionIndex <= 1) {
      // Hide both buttons on the first and second sections
      btnUp.style.display = 'none';
      btnDown.style.display = 'none';
    } else if (currentSectionIndex === totalSections - 1) {
      // Show only the "Up" button on the last section
      btnUp.style.display = 'block';
      btnDown.style.display = 'none';
    } else {
      // Show both buttons on other sections
      btnUp.style.display = 'block';
      btnDown.style.display = 'block';
    }
  }

  // Initialize animations and scrolling for sections
  animateElementsInSection(sections[currentSectionIndex], 'in');
  updateNavigationButtons(); // Initialize button visibility

  // Event listeners for navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      handleNavigation('down');
    } else if (e.key === 'ArrowUp') {
      handleNavigation('up');
    }
  });

  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      handleNavigation('down');
    } else if (e.deltaY < 0) {
      handleNavigation('up');
    }
  });

  window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener('touchend', (e) => {
    endY = e.changedTouches[0].clientY;

    if (startY > endY + 30) {
      handleNavigation('down');
    } else if (startY < endY - 30) {
      handleNavigation('up');
    }
  });

  // Function to handle vertical scrolling
  function verticalScroll() {
    const rows = document.querySelectorAll('.navbar-text'); // Select all elements with class 'clients-row-vertical'

    rows.forEach((row) => {
      // Clone the content to create a seamless looping effect
      row.innerHTML += row.innerHTML; // Duplicate the row content to ensure continuous scrolling

      // Initialize variables for scrolling
      let scrollAmount = 0;
      const scrollSpeed = parseFloat(row.getAttribute('data-speed')) || 1; // Speed controlled by data attribute (default is 1)
      const startFromBottom = row.getAttribute('data-direction') === 'bottom'; // Determine direction based on data attribute

      // Set the initial scroll direction
      scrollAmount = startFromBottom ? -row.clientHeight / 2 : 0;

      // Function to scroll continuously
      function scrollRow() {
        scrollAmount += startFromBottom ? scrollSpeed : -scrollSpeed; // Adjust scroll direction

        row.style.transform = `translateY(${scrollAmount}px)`;

        // Check if the scroll has reached the end and reset seamlessly
        if (!startFromBottom && Math.abs(scrollAmount) >= row.clientHeight / 2) {
          scrollAmount = 0; // Reset for scrolling upwards
        } else if (startFromBottom && scrollAmount >= 0) {
          scrollAmount = -row.clientHeight / 2; // Reset for scrolling downwards
        }

        requestAnimationFrame(scrollRow); // Continuously call scroll function
      }

      scrollRow(); // Start scrolling
    });
  }

  // Function to handle horizontal scrolling
  function horizontalScroll() {
    const rows = document.querySelectorAll('.clients-row'); // Select all elements with class 'clients-row-horizontal'

    rows.forEach((row) => {
      // Clone the content to create a seamless looping effect
      row.innerHTML += row.innerHTML; // Duplicate the row content to ensure continuous scrolling

      // Initialize variables for scrolling
      let scrollAmount = 0;
      const scrollSpeed = parseFloat(row.getAttribute('data-speed')) || 1; // Speed controlled by data attribute (default is 1)
      const startFromRight = row.getAttribute('data-direction') === 'right'; // Determine direction based on data attribute

      // Set the initial scroll direction
      scrollAmount = startFromRight ? -row.clientWidth / 2 : 0;

      // Function to scroll continuously
      function scrollRow() {
        scrollAmount += startFromRight ? scrollSpeed : -scrollSpeed; // Adjust scroll direction

        row.style.transform = `translateX(${scrollAmount}px)`;

        // Check if the scroll has reached the end and reset seamlessly
        if (!startFromRight && Math.abs(scrollAmount) >= row.clientWidth / 2) {
          scrollAmount = 0; // Reset for left scrolling
        } else if (startFromRight && scrollAmount >= 0) {
          scrollAmount = -row.clientWidth / 2; // Reset for right scrolling
        }

        requestAnimationFrame(scrollRow); // Continuously call scroll function
      }

      scrollRow(); // Start scrolling
    });
  }

  // Call both functions to initialize scrolling
  verticalScroll();
  horizontalScroll();
});

   