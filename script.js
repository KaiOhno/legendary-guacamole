// DOMContentLoaded event listener to ensure the document is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  initializeAccordion();
  initializeTypingEffect();
  initializeImageFadeIn();
  initializeStepNavigation();
  initializeTimeUpdate();
  initializeScrollToTop();
  initializeSmoothScroll();
  initializeSwipeNavigation();
});

// Function to manage accordion behavior for service listings
function initializeAccordion() {
  const accordions = document.getElementsByClassName('accordion');
  Array.from(accordions).forEach(accordion => {
    accordion.addEventListener('click', function () {
      const panel = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      // Close all panels
      closeAllAccordions(accordions);
      // Open or close the clicked panel
      if (!isActive) {
        this.classList.add('active');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

// Close all accordions except the active one
function closeAllAccordions(accordions) {
  Array.from(accordions).forEach((accordion, index) => {
    accordion.classList.remove('active');
    accordion.nextElementSibling.style.maxHeight = null;
  });
}

// Typing effect for the 'What I Do' section titles
function initializeTypingEffect() {
  const titles = [
    'Web Developer',
    'Graphic Designer',
    'Front-End Developer',
    'Video Editor',
    'Photographer',
    'Freelancer',
    'UX/UI Designer',
    'SEO Specialist',
    'Social Media Manager',
    'Brand Strategist',
    'Digital Marketer',
    'Spline Animation Creator',
  ];
  const titleElement = document.querySelector('.title');
  typeTitle(titles, titleElement, 250, 150, 300);
}

function typeTitle(
  titles,
  titleElement,
  typingSpeed,
  deletingSpeed,
  endPauseDuration
) {
  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentTitle = titles[currentTitleIndex];
    if (isDeleting) {
      currentCharIndex--;
    } else {
      currentCharIndex++;
    }
    titleElement.textContent = currentTitle.substring(0, currentCharIndex);

    if (!isDeleting && currentCharIndex === currentTitle.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, endPauseDuration);
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      type();
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  };
  type();
}

// Image fade-in effect as they enter the viewport
function initializeImageFadeIn() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll('.skill-image')
    .forEach(img => observer.observe(img));
}

// Step navigation for the 'Website Creation' section
function initializeStepNavigation() {
  const steps = document.querySelectorAll('.step-details');
  const dots = document.querySelectorAll('.nav-dot');
  setupStepDots(dots, steps);
}

function setupStepDots(dots, steps) {
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const targetIndex = parseInt(this.getAttribute('data-target'));
      updateStepVisibility(steps, dots, targetIndex);
    });
  });
}

function updateStepVisibility(steps, dots, activeIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === activeIndex);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

// Update and display the local time in Toronto
function initializeTimeUpdate() {
  const updateTime = () => {
    const torontoTimezone = 'America/Toronto';
    const time = new Date().toLocaleString('en-US', {
      timeZone: torontoTimezone,
    });
    document.getElementById('torontoTime').textContent = formatTime(time);
  };

  updateTime();
  setInterval(updateTime, 1000);
}

function formatTime(time) {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Scroll to top button functionality
function initializeScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  scrollToTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Step navigation for the 'Website Creation' section, with the first step shown by default
function initializeStepNavigation() {
  const steps = document.querySelectorAll('.step-details');
  const dots = document.querySelectorAll('.nav-dot');
  setupStepDots(dots, steps);
  // Set the first step as visible by default
  updateStepVisibility(steps, dots, 0);
}

function setupStepDots(dots, steps) {
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const targetIndex = parseInt(this.getAttribute('data-target'));
      updateStepVisibility(steps, dots, targetIndex);
    });
  });
}

function updateStepVisibility(steps, dots, activeIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === activeIndex);
    // Apply a transition effect or make it visible directly
    step.style.display = index === activeIndex ? 'block' : 'none';
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}
