const city = document.querySelector('.header__city'),
      sky = document.querySelector('.header__sky'),
      people = document.querySelector('.header__people'),
      column = document.querySelector('.header__column');

window.addEventListener('scroll', function() {
    let value = window.scrollY;

    sky.style.top = -value * 0.8 + 'px';
    city.style.top = -value * 0.4 + 'px';
    people.style.top = -value * 0.2 + 'px';
    column.style.top = -value * 0.1 + 'px';

})



//interactive
const selectSingle = document.querySelector('.interactive__select'),
      selectSingle_title = selectSingle.querySelector('.interactive__select__title'),
      selectSingle_labels = selectSingle.querySelectorAll('.interactive__select__label'),

      cards = document.querySelectorAll('.interactive__map-card'),
      dots = document.querySelectorAll('.interactive__map__dot'),
      overlay = document.querySelector('.interactive__map');


//Скрываю карточки
function hideCards() {
  cards.forEach(card => {
    card.style.display = 'none';
  })
}
hideCards();

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    cards.forEach(card => {
      card.style.display = 'none';
    })
  }
})




dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {

    hideCards();

    cards.forEach((card, j) => {
      if (i == j) {
        card.style.display = 'block';

        selectSingle_title.innerHTML = card.firstElementChild.innerHTML;
      }

    });

    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    };

  });

});

//Меняю активность селекта
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');

  } else {
    selectSingle.setAttribute('data-state', 'active');
    hideCards();
  }
});

//Показываю карточки в зависимости от выбранного города
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');

    chooseCity = evt.target.textContent;
    console.log(chooseCity);

    cards.forEach((card, i) => {
      let cardTitle = card.firstElementChild.innerHTML;

      if (chooseCity == cardTitle) {
        card.style.display = 'block';
      }
    })
  });
}

//Плавный скролл
let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;

links.forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();

      let widthTop = document.documentElement.scrollTop,
          hash = this.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
          r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
          document.documentElement.scrollTo(0, r);

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
  });
});


class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
        const path = btn.getAttribute('data-url');
        this.createPlayer(path);
        document.body.style.overflow = 'hidden'; 
        }
      });
    });
  }

  

  bindCloseBtn() {
      this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
      document.body.style.overflow = ''; 
    });
  };

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });

    this.overlay.style.display = 'flex';
  };

  init() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}

const player = new VideoPlayer('.congratulation__content .congratulation__content-play', '.overlay');
player.init();
