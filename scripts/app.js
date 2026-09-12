/**
 * PORTFOLIO APPLICATION LOGIC: ANNA MELNIKOVA (PSYCHOTHERAPIST)
 * High-performance Vanilla ES6+ Interactive Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initQuiz();
  initPricingSwitcher();
  initLightbox();
  initFaqAccordion();
  initBookingModal();
  initScrollAnimations();
});

/* ==========================================================================
   1. Floating Header & Mobile Navigation
   ========================================================================== */
function initHeader() {
  const headerIsland = document.querySelector('.header-island');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-drawer .btn');

  // Sticky header scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      headerIsland.classList.add('scrolled');
    } else {
      headerIsland.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle mobile menu
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileMenuOverlay.classList.contains('open');
    if (isOpen) {
      hamburgerBtn.classList.add('active');
      mobileMenuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    } else {
      hamburgerBtn.classList.remove('active');
      mobileMenuOverlay.classList.remove('open');
      document.body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburgerBtn && mobileMenuOverlay) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) toggleMobileMenu(true);
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });
  }
}

/* ==========================================================================
   2. Interactive Query Quiz / Filter
   ========================================================================== */
function initQuiz() {
  const options = document.querySelectorAll('.quiz-option');
  const resultPanel = document.getElementById('quizResultPanel');
  const resultCategory = document.getElementById('quizResultCategory');
  const resultText = document.getElementById('quizResultText');
  const suggestedFormat = document.getElementById('quizSuggestedFormat');
  const quizBookBtn = document.getElementById('quizBookBtn');

  const quizData = {
    anxiety: {
      category: 'Тревожные состояния и контроль',
      text: 'В гештальт- и соматическом подходе мы не «боремся» с тревогой, а учимся слышать сигналы тела, возвращать ощущение твердой почвы под ногами и бережно исследовать, какие подавленные переживания скрываются за контролем.',
      format: 'Рекомендуемый темп: цикл из 6–8 еженедельных встреч',
      topic: 'Работа с тревогой и паническими состояниями'
    },
    burnout: {
      category: 'Выгорание и истощение ресурса',
      text: 'Хроническая усталость — сигнал о том, что прежняя система адаптации исчерпала себя. Мы разберем скрытые внутренние требования «быть идеальным», снизим самокритику и бережно восстановим баланс восстановления сил.',
      format: 'Рекомендуемый темп: 4–6 сессий для стабилизации',
      topic: 'Преодоление выгорания и потеря сил'
    },
    relationships: {
      category: 'Сложности в отношениях и границы',
      text: 'Исследуем ваши привычные сценарии близости: почему сложно отказывать без чувства вины, как заявлять о своих желаниях и выстраивать доверительные отношения, сохраняя свою автономию.',
      format: 'Рекомендуемый темп: среднесрочная терапия (от 8 встреч)',
      topic: 'Отношения, созависимость и личные границы'
    },
    identity: {
      category: 'Кризис смыслов и самооценка',
      text: 'Периоды жизненных развилок требуют безопасного зеркала. Мы исследуем вопросы «Чего я хочу на самом деле?» и «Кто я без чужих ожиданий?», помогая опереться на собственную аутентичность и ценности.',
      format: 'Рекомендуемый темп: регулярный формат (онлайн или очно в Алматы)',
      topic: 'Поиск опор, кризис идентичности и самооценка'
    },
    self_esteem: {
      category: 'Самооценка и самокритика',
      text: 'Внутренний строгий критик заставляет обесценивать успехи и бояться ошибок. В безопасном пространстве мы учимся отделять навязанный стыд от реального потенциала, формируя добрый, поддерживающий внутренний голос.',
      format: 'Рекомендуемый темп: 6–8 сессий для устойчивого сдвига',
      topic: 'Самооценка, синдром самозванца и самокритика'
    },
    life_crisis: {
      category: 'Кризисы и перемены в жизни',
      text: 'Переезд, смена профессии, развод или потеря ориентиров выбивают почву из-под ног. Мы разберем этапы проживания перемен, найдем опоры в новой реальности и поможем бережно пересобрать жизненный сценарий.',
      format: 'Рекомендуемый темп: краткосрочная поддержка или курс',
      topic: 'Жизненные кризисы, переезд и адаптация'
    }
  };

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      const queryType = option.getAttribute('data-query');
      const data = quizData[queryType];

      if (data && resultPanel) {
        // Subtle animate
        resultPanel.style.opacity = '0.5';
        resultPanel.style.transform = 'translateY(4px)';

        setTimeout(() => {
          resultCategory.textContent = data.category;
          resultText.textContent = data.text;
          suggestedFormat.textContent = data.format;
          if (quizBookBtn) {
            quizBookBtn.setAttribute('data-topic', data.topic);
          }
          resultPanel.style.opacity = '1';
          resultPanel.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   3. Pricing Calculator & Tab Switcher
   ========================================================================== */
function initPricingSwitcher() {
  const tabs = document.querySelectorAll('.pricing-tab');
  const cards = document.querySelectorAll('.pricing-card-outer');

  const pricingData = {
    single: [
      {
        title: 'Индивидуальная онлайн-сессия',
        format: 'Видеосвязь (Zoom, Google Meet, Telegram)',
        price: '25 000 ₸',
        period: '/ 50 минут',
        oldPrice: '',
        discountBadge: '',
        features: [
          'Удобно из любой точки мира без дороги',
          'Конфиденциальный защищенный канал связи',
          'Краткие материалы и практики после встречи',
          'Поддержка по организационным вопросам'
        ],
        ctaText: 'Записаться онлайн',
        type: 'online-single'
      },
      {
        title: 'Очная сессия в кабинете',
        format: 'Алматы • Медеуский район / Достык',
        price: '30 000 ₸',
        period: '/ 50 минут',
        oldPrice: '',
        discountBadge: '',
        features: [
          'Уютное приватное пространство в тихом центре Алматы',
          'Глубокий соматический и телесный контакт',
          'Чай, вода, безопасная заземляющая обстановка',
          'Возможность чередования с онлайн-форматом'
        ],
        ctaText: 'Записаться очно',
        type: 'offline-single'
      },
      {
        title: 'Ознакомительная встреча',
        format: 'Первая установочная сессия (онлайн)',
        price: '18 000 ₸',
        period: '/ 40 минут',
        oldPrice: '',
        discountBadge: '',
        features: [
          'Знакомство с терапевтом и стилем работы',
          'Формулирование первичного запроса',
          'Определение целей и комфортного плана работы',
          'Ответы на все ваши вопросы без обязательств'
        ],
        ctaText: 'Выбрать первую встречу',
        type: 'intro-single'
      }
    ],
    pack: [
      {
        title: 'Курс «Стабилизация» (4 сессии)',
        format: 'Онлайн-формат • 4 встречи по 50 минут',
        price: '90 000 ₸',
        period: '/ курс (4 сессии)',
        oldPrice: '100 000 ₸',
        discountBadge: '−10% (10 000 ₸)',
        features: [
          'Фиксация удобного постоянного слота в неделю',
          'Глубокая проработка острой кризисной темы',
          'Аудио-практики заземления между встречами',
          'Срок действия курса — 6 недель'
        ],
        ctaText: 'Оформить курс онлайн',
        type: 'online-pack'
      },
      {
        title: 'Курс «Опора» (4 очные сессии)',
        format: 'Очный формат в Алматы • 4 встречи по 50 минут',
        price: '108 000 ₸',
        period: '/ курс (4 сессии)',
        oldPrice: '120 000 ₸',
        discountBadge: '−10% (12 000 ₸)',
        features: [
          'Закрепление постоянного времени в кабинете Алматы',
          'Последовательная работа с телесными зажимами',
          'Бережный терапевтический контракт',
          'Срок действия курса — 6 недель'
        ],
        ctaText: 'Оформить курс очно',
        type: 'offline-pack'
      },
      {
        title: 'Длительный контракт (8 сессий)',
        format: 'Онлайн или Очно в Алматы • 8 встреч',
        price: '168 000 ₸',
        period: '/ курс (8 сессий)',
        oldPrice: '200 000 ₸',
        discountBadge: '−16% (32 000 ₸)',
        features: [
          'Глубинная трансформация паттернов поведения',
          'Поддержка в мессенджере в экстренных ситуациях',
          'Промежуточные итоги и сверка целей каждые 4 встречи',
          'Возможность заморозки на период отпуска'
        ],
        ctaText: 'Выбрать длительный контракт',
        type: 'deep-pack'
      }
    ]
  };

  function updateCards(mode) {
    const list = pricingData[mode];
    if (!list) return;

    cards.forEach((card, index) => {
      const item = list[index];
      if (!item) return;

      const titleEl = card.querySelector('.pricing-type-title');
      const formatEl = card.querySelector('.pricing-format-tag');
      const priceEl = card.querySelector('.pricing-price');
      const periodEl = card.querySelector('.pricing-period');
      const oldPriceRow = card.querySelector('.pricing-old-price-row');
      const oldPriceEl = card.querySelector('.pricing-old-price');
      const discountBadgeEl = card.querySelector('.pricing-discount-badge');
      const featuresEl = card.querySelector('.pricing-features');
      const btnEl = card.querySelector('.pricing-card-inner .btn');

      if (titleEl) titleEl.textContent = item.title;
      if (formatEl) formatEl.textContent = item.format;
      if (priceEl) priceEl.textContent = item.price;
      if (periodEl) periodEl.textContent = item.period;

      if (oldPriceRow) {
        if (item.oldPrice) {
          oldPriceRow.style.visibility = 'visible';
          oldPriceRow.style.display = 'flex';
          if (oldPriceEl) oldPriceEl.textContent = item.oldPrice;
          if (discountBadgeEl) discountBadgeEl.textContent = item.discountBadge;
        } else {
          oldPriceRow.style.visibility = 'hidden';
          oldPriceRow.style.display = 'flex';
        }
      }

      if (featuresEl) {
        featuresEl.innerHTML = item.features.map(f => `
          <div class="pricing-feature-item">
            <svg class="pricing-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${f}</span>
          </div>
        `).join('');
      }

      if (btnEl) {
        const spanText = btnEl.querySelector('span');
        if (spanText) spanText.textContent = item.ctaText;
        btnEl.setAttribute('data-plan', item.title);
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.getAttribute('data-mode');
      updateCards(mode);
    });
  });
}

/* ==========================================================================
   4. Diplomas & Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const cards = document.querySelectorAll('.diploma-card');
  const lightbox = document.getElementById('diplomaLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!lightbox) return;

  function openLightbox(card) {
    const src = card.getAttribute('data-img-src');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      // Close other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        const trig = otherItem.querySelector('.faq-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   6. Interactive Booking Modal Dialog
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('.open-booking-btn');
  const closeBtn = document.getElementById('bookingModalCloseBtn');
  const bookingForm = document.getElementById('bookingForm');
  const successView = document.getElementById('bookingSuccessView');
  const formatButtons = document.querySelectorAll('.segmented-btn');
  const messengerButtons = document.querySelectorAll('.messenger-radio');
  const queryInput = document.getElementById('bookingQuery');
  const clientNameInput = document.getElementById('clientName');

  if (!modal) return;

  function openModal(prefilledTopic = '') {
    if (queryInput && prefilledTopic) {
      queryInput.value = prefilledTopic;
    }
    if (successView) successView.style.display = 'none';
    if (bookingForm) {
      bookingForm.style.display = 'flex';
      bookingForm.reset();
      if (queryInput && prefilledTopic) queryInput.value = prefilledTopic;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (clientNameInput) setTimeout(() => clientNameInput.focus(), 150);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.getAttribute('data-topic') || btn.getAttribute('data-plan') || '';
      openModal(topic);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Segmented controls (Format)
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const input = document.getElementById('selectedFormat');
      if (input) input.value = btn.getAttribute('data-format');
    });
  });

  // Messenger radio buttons
  messengerButtons.forEach(radio => {
    radio.addEventListener('click', () => {
      messengerButtons.forEach(r => r.classList.remove('active'));
      radio.classList.add('active');
      const input = document.getElementById('selectedMessenger');
      if (input) input.value = radio.getAttribute('data-messenger');
    });
  });

  // Submit flow
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>Отправка заявки...</span>
      `;

      setTimeout(() => {
        bookingForm.style.display = 'none';
        if (successView) {
          const userName = clientNameInput ? clientNameInput.value.trim() : '';
          const messenger = document.getElementById('selectedMessenger')?.value || 'Telegram';
          const successDesc = document.getElementById('successDesc');
          if (successDesc) {
            successDesc.textContent = `${userName ? userName + ', спасибо' : 'Спасибо'} за обращение! Я свяжусь с вами в ${messenger} в течение 2-3 часов для согласования комфортного времени консультации.`;
          }
          successView.style.display = 'flex';
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 700);
    });
  }
}

/* ==========================================================================
   7. IntersectionObserver Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('is-revealed'));
  }
}
