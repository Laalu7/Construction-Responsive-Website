$(document).ready(function () {
  // 1. Initialize Lenis (Smooth Scroll)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Initialize AOS
  AOS.init({
    once: true,
    offset: 50,
    duration: 1000,
  });

  // 3. Navbar & Hamburger Logic
  const $navbar = $('#navbar');
  const $hamburger = $('#hamburger-btn');
  const $mobileMenu = $('#mobile-menu');
  const $mobileLinks = $('.mobile-link');

  // Resize Handler: Reset Mobile Menu on Desktop Width
  $(window).resize(function () {
    if ($(window).width() >= 1024) {
      // lg breakpoint
      $mobileMenu
        .removeClass('is-open pointer-events-auto')
        .addClass('pointer-events-none');
      $hamburger.removeClass('is-active');
      $('body').removeClass('overflow-hidden');
      updateNavbar(); // Reset navbar style
    }
  });

  // Update Navbar Background Logic
  function updateNavbar() {
    const isMenuOpen = $mobileMenu.hasClass('is-open');

    // If menu is open, make navbar transparent to blend with menu overlay
    if (isMenuOpen) {
      $navbar
        .removeClass(
          'bg-brand-dark/95 backdrop-blur-md shadow-lg py-4 bg-gradient-to-b from-black/80 to-transparent'
        )
        .addClass('bg-transparent py-6 border-none');
    }
    // If menu is closed, apply scroll-based styles
    else {
      if ($(window).scrollTop() > 50) {
        $navbar
          .removeClass(
            'py-6 bg-gradient-to-b from-black/80 to-transparent bg-transparent border-none'
          )
          .addClass(
            'bg-brand-dark/95 backdrop-blur-md shadow-lg py-4 border-b border-transparent'
          );
      } else {
        $navbar
          .removeClass(
            'bg-brand-dark/95 backdrop-blur-md shadow-lg py-4 border-none bg-transparent'
          )
          .addClass(
            'py-6 bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
          );
      }
    }
  }

  // Scroll Listener
  $(window).scroll(updateNavbar);

  // Toggle Mobile Menu
  $hamburger.click(function () {
    $(this).toggleClass('is-active');

    if ($mobileMenu.hasClass('is-open')) {
      // Close
      $mobileMenu.removeClass('is-open');
      setTimeout(() => {
        $mobileMenu
          .removeClass('pointer-events-auto')
          .addClass('pointer-events-none');
      }, 500);
      $('body').removeClass('overflow-hidden');
    } else {
      // Open
      $mobileMenu
        .removeClass('pointer-events-none')
        .addClass('pointer-events-auto');
      setTimeout(() => {
        $mobileMenu.addClass('is-open');
      }, 10);
      $('body').addClass('overflow-hidden');
    }

    setTimeout(updateNavbar, 50);
  });

  // Close mobile menu on link click
  $mobileLinks.click(function () {
    $hamburger.removeClass('is-active');
    $mobileMenu.removeClass('is-open');
    setTimeout(() => {
      $mobileMenu
        .removeClass('pointer-events-auto')
        .addClass('pointer-events-none');
    }, 500);
    $('body').removeClass('overflow-hidden');
    setTimeout(updateNavbar, 50);
  });

  // Ensure mobile menu starts hidden interaction-wise
  $mobileMenu.addClass('pointer-events-none');
  updateNavbar(); // Init

  // 4. Swiper Initialization
  const serviceSwiper = new Swiper('.serviceSwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 1,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });

  const testimonialSwiper = new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonial-pagination',
      clickable: true,
    },
  });

  // 5. Fancybox Initialization
  Fancybox.bind('[data-fancybox]', {
    // Custom options
    Thumbs: {
      type: 'modern',
    },
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [],
        right: ['slideshow', 'thumbs', 'close'],
      },
    },
  });

  // 6. Counter Animation
  let counterStarted = false;
  $(window).scroll(function () {
    if ($('.counter').length) {
      const hT = $('.counter').offset().top,
        hH = $('.counter').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();

      if (wS > hT + hH - wH && !counterStarted) {
        $('.counter').each(function () {
          $(this)
            .prop('Counter', 0)
            .animate(
              {
                Counter: $(this).data('target'),
              },
              {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                  $(this).text(Math.ceil(now));
                },
              }
            );
        });
        counterStarted = true;
      }
    }
  });

  // 7. Contact Form SweetAlert
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Proposal Sent!',
      text: 'We will review your project details and get back to you shortly.',
      icon: 'success',
      background: '#1a1a1a',
      color: '#ffffff',
      confirmButtonColor: '#C5A059',
    });
    this.reset();
  });

  // 8. Video Reel Modal (Mockup)
  $('#play-reel').click(function () {
    Swal.fire({
      html: '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
      showConfirmButton: false,
      background: '#000',
      width: '80%',
      showCloseButton: true,
    });
  });

  // 9. Cookies Popup Logic
  const cookiePopup = document.getElementById('cookie-popup');
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
      cookiePopup.classList.remove('hidden', 'translate-y-[150%]');
    }, 3000);
  }

  window.acceptCookies = function () {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.add('translate-y-[150%]');
    setTimeout(() => cookiePopup.classList.add('hidden'), 500);
  };

  window.closeCookies = function () {
    cookiePopup.classList.add('translate-y-[150%]');
    setTimeout(() => cookiePopup.classList.add('hidden'), 500);
  };

  // 10. Scroll to Top Logic
  const scrollTopBtn = $('#scroll-top');
  const progressCircle = document.getElementById('scroll-progress-circle');
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  // Lenis scroll event
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // Show/Hide
    if (scroll > 500) {
      scrollTopBtn.removeClass('opacity-0 translate-y-10 pointer-events-none');
    } else {
      scrollTopBtn.addClass('opacity-0 translate-y-10 pointer-events-none');
    }

    // Lenis provides 'progress' (0 to 1) directly!
    const offset = circumference - progress * circumference;
    if (progressCircle) {
      progressCircle.style.strokeDashoffset = offset;
    }
  });

  scrollTopBtn.click(function () {
    lenis.scrollTo(0);
  });
});