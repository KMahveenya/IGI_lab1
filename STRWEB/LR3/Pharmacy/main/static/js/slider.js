/*const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.pag div');
const pagination = document.querySelector('.pag');
let currentSlide = 0;
let slideInterval;
let allowCycle = true;
let autoScroll = true;
let hoverPause = true;
let intervalTime = 5000;

const intervalInput = document.getElementById('autoScrollTime');
const allowCycleInput = document.getElementById('allowCycle');
const showArrowsInput = document.getElementById('showArrows');
const showPaginationInput = document.getElementById('showPagination');
const allowAutoScrollInput = document.getElementById('allowAutoScroll');
const allowHoverPauseInput = document.getElementById('allowHoverPause');

class Slider

function showSlide(index)
{
  if (index < 0)
  {
      currentSlide = allowCycle ? slides.length - 1 : 0;
  }
  else if (index >= slides.length)
  {
      currentSlide = allowCycle ? 0 : slides.length - 1;
  }
  else
  {
      currentSlide = index;
  }

  const offset = -currentSlide * 100;
  document.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
  slides[currentSlide].querySelector('.counter').innerHTML = currentSlide + 1 + "/" + slides.length;
  updateDots();
}

function autoSlide() {
  if (autoScroll)
  {
    showSlide(currentSlide + 1);
  }
}

function startInterval()
{
  clearInterval(slideInterval);
  if (autoScroll)
  {
    slideInterval = setInterval(autoSlide, intervalTime);
  }
}

function updateDots()
{
  dots.forEach((dot, idx) => {
    if (idx === currentSlide) {
      dot.classList.add('active-dot');
    }
    else
    {
      dot.classList.remove('active-dot');
    }
  });
}

function resetInterval()
{
  clearInterval(slideInterval);
  startInterval();
}

function mouseHoverPause()
{
  if (hoverPause)
  {
    document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(slideInterval), { once: true });
    document.querySelector('.slider').addEventListener('mouseleave', () => startInterval(), { once: true });
  }
  else
  {
    document.querySelector('.slider').removeEventListener('mouseenter', () => clearInterval(slideInterval), { once: true });
    document.querySelector('.slider').removeEventListener('mouseleave', () => startInterval(), { once: true });
  }
}

prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetInterval()
});

nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetInterval()
});

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    showSlide(idx);
    resetInterval();
  });
});

document.getElementById('applySettings').addEventListener('click', () => {
  allowCycle = allowCycleInput.checked;
  autoScroll = allowAutoScrollInput.checked;
  hoverPause = allowHoverPauseInput.checked;
  intervalTime = intervalInput.value * 1000;

  prevButton.style.display = showArrowsInput.checked ? 'block' : 'none';
  nextButton.style.display = showArrowsInput.checked ? 'block' : 'none';

  pagination.style.display = showPaginationInput.checked ? 'block' : 'none';
  
  mouseHoverPause();
  resetInterval();
});

showSlide(currentSlide);
mouseHoverPause();
startInterval();
*/
class Slider
{
  constructor(selector, config = {})
  {
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll('.slide');
    this.prevButton = this.slider.querySelector('.prev');
    this.nextButton = this.slider.querySelector('.next');
    this.dots = this.slider.querySelectorAll('.pag div');
    this.pagination = this.slider.querySelector('.pag');
    this.currentSlide = 0;

    this.config = {
      allowCycle: true,
      autoScroll: true,
      hoverPause: true,
      intervalTime: 5000,
      showArrows: true,
      showPagination: true,
      ...config
    };

    this.slideInterval = null;

    this.init();
  }

  init()
  {
    this.showSlide(this.currentSlide);
    this.startInterval();

    if (this.prevButton)
    {
      this.prevButton.addEventListener('click', this.prevSlide.bind(this));
    }
    if (this.nextButton)
    {
      this.nextButton.addEventListener('click', this.nextSlide.bind(this));
    }

    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => this.goToSlide(idx));
    });

    this.mouseHoverPause();
  }

  mouseHoverPause()
  {
    if (this.config.hoverPause)
    {
      this.slider.addEventListener('mouseenter', () => clearInterval(this.slideInterval), { once: true });
      this.slider.addEventListener('mouseleave', () => this.startInterval(), { once: true });
    }
    else
    {
      this.slider.removeEventListener('mouseenter', () => clearInterval(this.slideInterval), { once: true });
      this.slider.removeEventListener('mouseleave', () => this.startInterval(), { once: true });
    }
  }

  showSlide(index)
  {
    if (index < 0)
    {
      this.currentSlide = this.config.allowCycle ? this.slides.length - 1 : 0;
    }
    else if (index >= this.slides.length)
    {
      this.currentSlide = this.config.allowCycle ? 0 : this.slides.length - 1;
    }
    else
    {
      this.currentSlide = index;
    }

    const offset = -this.currentSlide * 100;
    this.slider.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
    this.updateDots();
    this.slides[this.currentSlide].querySelector('.counter').innerHTML = this.currentSlide + 1 + "/" + this.slides.length;
  }

  /*updateDots()
  {
    alert(dots.length);
    this.dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active-dot');
      }
      else
      {
        dot.classList.remove('active-dot');
      }
    });
  }*/

  updateDots()
  {
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active-dot', idx === this.currentSlide);
    });
  }

  prevSlide()
  {
    this.showSlide(this.currentSlide - 1);
    this.resetInterval();
  }

  nextSlide()
  {
    this.showSlide(this.currentSlide + 1);
    this.resetInterval();
  }

  goToSlide(index)
  {
    this.showSlide(index);
    this.resetInterval();
  }

  autoSlide()
  {
    this.showSlide(this.currentSlide + 1);
  }

  startInterval()
  {
    if (this.config.autoScroll)
    {
      this.slideInterval = setInterval(this.autoSlide.bind(this), this.config.intervalTime);
    }
  }

  stopInterval()
  {
    clearInterval(this.slideInterval);
  }

  resetInterval()
  {
    this.stopInterval();
    this.startInterval();
  }

  pause()
  {
    this.stopInterval();
  }

  resume()
  {
    this.startInterval();
  }

  applySettings(config)
  {
    this.config = { ...this.config, ...config };

    this.prevButton.style.display = this.config.showArrows ? 'block' : 'none';
    this.nextButton.style.display = this.config.showArrows ? 'block' : 'none';

    this.pagination.style.display = this.config.showPagination ? 'block' : 'none';

    this.mouseHoverPause();
    this.resetInterval();
  }
}

const mySlider = new Slider('.slider');

document.getElementById('applySettings').addEventListener('click', () => {
  const newConfig = {
    allowCycle: document.getElementById('allowCycle').checked,
    showArrows: document.getElementById('showArrows').checked,
    showPagination: document.getElementById('showPagination').checked,
    autoScroll: document.getElementById('allowAutoScroll').checked,
    hoverPause: document.getElementById('allowHoverPause').checked,
    intervalTime: document.getElementById('autoScrollTime').value * 1000
  };

  mySlider.applySettings(newConfig);
});
