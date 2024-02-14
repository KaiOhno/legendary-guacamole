document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const images = [
    'legendary-guacamole/IMG/IMG1.jpg',
    'legendary-guacamole/.IMG/IMG2.jpg',
    'legendary-guacamole/IMG/IMG3.jpg',
    'legendary-guacamole/IMG/IMG4.jpg',
    'legendary-guacamole/IMG/IMG5.jpg',
    'legendary-guacamole/IMG/IMG6.jpg',
    'legendary-guacamole/IMG/IMG7.jpg',
    'legendary-guacamole/IMG/IMG8.jpg',
    'legendary-guacamole/IMG/IMG9.jpg',
    'legendary-guacamole/IMG/IMG10.jpg',
    'IMG/IMG11.jpg',
    'IMG/IMG12.jpg',
    'IMG/IMG13.jpg',
    'IMG/IMG14.jpg',
    'IMG/IMG15.jpg',
    'IMG/IMG16.jpg',
    'IMG/IMG17.jpg',
    'IMG/IMG18.jpg',
    'IMG/IMG19.jpg',
    'IMG/IMG20.jpg',
    'IMG/IMG21.jpg',
    'IMG/IMG22.jpg',
    'IMG/IMG23.jpg',
    'IMG/IMG24.jpg',
    'IMG/IMG25.jpg',
    'IMG/IMG26.jpg',
    'IMG/IMG27.jpg',
    'IMG/IMG28.jpg',
    'IMG/IMG29.jpg',
    'IMG/IMG30.jpg',
    'IMG/IMG31.jpg',
    'IMG/IMG32.jpg',
    'IMG/IMG33.jpg',
    'IMG/IMG34.jpg',
    'IMG/IMG35.jpg',
    'IMG/IMG36.jpg',
    'IMG/IMG37.jpg',
    'IMG/IMG38.jpg',
    'IMG/IMG39.jpg',
    'IMG/IMG40.jpg',
    'IMG/IMG42.jpg',
    'IMG/IMG43.jpg',
    'IMG/IMG44.jpg',
    'IMG/IMG45.jpg',
    'IMG/IMG46.jpg',
    'IMG/IMG47.jpg',
    'IMG/IMG48.jpg',
    'IMG/IMG49.jpg',
    'IMG/IMG50.jpg',
    'IMG/IMG51.jpg',
  ];

  shuffleArray(images);

  let animationActive = true; // Track if the animation should be active
  let currentIndex = 0;
  let imageElements = []; // Keep track of the images currently being animated

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createFallingImage(src) {
    if (!animationActive) return; // Stop creating new images if animation is paused

    const img = document.createElement('img');
    img.classList.add('image-fall');
    img.style.visibility = 'hidden'; // Ensure the image is initially hidden
    img.onload = () => {
      if (!animationActive) {
        img.remove(); // Remove the image if animation was paused while loading
        return;
      }

      const scale = Math.random() * 0.75 + 1; // Adjust scale as needed
      img.style.transform = `scale(${scale})`;
      img.style.left = `${
        Math.random() * (window.innerWidth - img.width * scale)
      }px`;
      img.style.visibility = 'visible'; // Make the image visible after loading and positioning

      let y = -img.height * scale; // Start the image off-screen

      // Assign a random falling speed between 1.5 and 2.2
      const fallingSpeed = Math.random() * (2.2 - 1.5) + 1.5;

      // Adjust z-index based on falling speed, faster in the front (higher z-index)
      // Example: Convert speed range (1.5 - 2.5) to z-index range (10 - 50)
      const zIndex = Math.round((fallingSpeed - 1.5) * (40 / (2.2 - 1.5)) + 10);
      img.style.zIndex = zIndex;

      function fall() {
        if (!animationActive) {
          img.remove();
          return;
        }
        y += fallingSpeed; // Use the random falling speed for each frame
        if (y > window.innerHeight + img.height) {
          img.remove();
          imageElements = imageElements.filter(element => element !== img);
        } else {
          img.style.transform = `translateY(${y}px) scale(${scale})`;
          requestAnimationFrame(fall);
        }
      }
      requestAnimationFrame(fall);
    };
    img.src = src;
    gallery.appendChild(img);
    imageElements.push(img); // Track the image for possible removal
  }

  function displayNextImage() {
    if (!animationActive) return; // Pause creating new images if animation is inactive

    if (currentIndex >= images.length) {
      shuffleArray(images);
      currentIndex = 0;
    }

    createFallingImage(images[currentIndex++]);
  }

  setInterval(displayNextImage, 1000);

  // Visibility change handling to pause/resume animation
  document.addEventListener('visibilitychange', () => {
    animationActive = !document.hidden;
    if (!animationActive) {
      // Pause animation, consider clearing the interval and tracking it for restart
      imageElements.forEach(img => img.remove()); // Remove all falling images
      imageElements = []; // Reset the tracking array
    } else {
      // Resume animation
      displayNextImage();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const accessToken =
    'BQB-dV6cl-rfWuYqhzZrYO-oTqvpc20ov2oijmBowlqouYFVWM-xn7738EGUsns-3kwF2S4fiPlFfd012cClB9Fot2JG5vkcT0nRyVbnAICbWX09xg3L2Y9OtJXE9NLmSEgWRZQzwSJ2BOjydc2w6-y3CCJSwHNrkrB7rOrD-ItqnuMiVFkAN6UkKQHDdcSyT3zbg__EhCs8yksCnwn-RhcBBgJe';
  const trackId = 'T3xby7fOyqmeON8jsnom0AT?si=e71738ad91ce47ff'; // Replace with the track ID you want to display

  fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById(
        'track-info'
      ).textContent = `${data.artists[0].name} - ${data.name}`;
      document.getElementById('play-link').href = data.external_urls.spotify;
    })
    .catch(error => console.error('Error fetching track information:', error));
});
