document.addEventListener("DOMContentLoaded", function () {
  // Carousel de imagenes
  const images = [
    "../images/tech-learn.jpg",
    "../images/eco-harvest.jpg",
    "../images/hero-bg.jpg",
    "../images/kids-code.jpg",
    "../images/sound-lab.jpg"
  ];
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  function changeImage(currentIdx) {
    const projectImage = document.getElementById('project-image');
    const currentImage = images[currentIdx];
    projectImage.setAttribute('src', currentImage);
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex === 0) {
      return
    }
    currentIndex -= 1;
    changeImage(currentIndex);
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex === images.length - 1) {
      return
    }
    currentIndex += 1;
    changeImage(currentIndex);
  });
})