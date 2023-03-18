const gallery = document.querySelector('.gallery-container');
const images = gallery.querySelectorAll('img');
const colorOptions = document.querySelectorAll('.color-option');
const randomColorOption = document.querySelector('#random-color');
const popupBox = document.querySelector('.popup-box');
const increaseTextSizeButton = document.querySelector('#increase-text-size');
const decreaseTextSizeButton = document.querySelector('#decrease-text-size');

const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 15;

const changeFontSize = (delta) => {
  const currentFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
  const newFontSize = currentFontSize + delta;
  if (newFontSize >= MIN_FONT_SIZE && newFontSize <= MAX_FONT_SIZE) {
    document.documentElement.style.fontSize = `${newFontSize}px`;
  }
};

increaseTextSizeButton.addEventListener('click', () => {
  changeFontSize(2);
});

decreaseTextSizeButton.addEventListener('click', () => {
  changeFontSize(-2);
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

colorOptions.forEach(colorOption => {
  colorOption.addEventListener('click', () => {
    const backgroundColor = colorOption.style.backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
  });
});

randomColorOption.addEventListener('click', () => {
  const randomColor = getRandomColor();
  randomColorOption.style.backgroundColor = randomColor;
  document.body.style.backgroundColor = randomColor;
});

let currentImageIndex = 0;

function showImagePopup(image) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const popupBox = document.createElement('div');
  popupBox.classList.add('popup-box');
  popupBox.style.backgroundColor = document.body.style.backgroundColor;
  const img = document.createElement('img');
  img.src = image.src;
  const desc = document.createElement('div');
  desc.classList.add('popup-desc');
  const title = document.createElement('h2');
  title.textContent = image.dataset.name;
  const text = document.createElement('p');
  text.textContent = image.dataset.desc;
  desc.appendChild(title);
  desc.appendChild(text);
  popupBox.appendChild(img);
  popupBox.appendChild(desc);
  popup.appendChild(popupBox);

  const leftArrow = document.createElement('div');
  leftArrow.classList.add('arrow', 'arrow-left');
  leftArrow.addEventListener('click', () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
    popup.remove();
    showImagePopup(images[currentImageIndex]);
  });

  const rightArrow = document.createElement('div');
  rightArrow.classList.add('arrow', 'arrow-right');
  rightArrow.addEventListener('click', () => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    popup.remove();
    showImagePopup(images[currentImageIndex]);
  });

  popup.appendChild(leftArrow);
  popup.appendChild(rightArrow);

  document.body.appendChild(popup);
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });

  setPopupBoxColor(document.body.style.backgroundColor);
}

function setFontSize() {
  const tabWidth = window.innerWidth;
  const fontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, tabWidth / 50));
  document.documentElement.style.fontSize = `${fontSize}px`;
}

setFontSize();

window.addEventListener('resize', setFontSize);

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentImageIndex = index;
    showImagePopup(image);
  });
});
