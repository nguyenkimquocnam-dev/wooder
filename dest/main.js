
const showHidePassword = () => {
  const eyeShows = document.querySelectorAll(".form-group .icon img[alt = 'icon-eye-show']");
  const eyeHides = document.querySelectorAll(".form-group .icon img[alt = 'icon-eye-hide']");

  const getParentElement = (input, selector) => {
    while (input.parentElement) {
      if (input.parentElement.matches(selector)) {
        return input.parentElement;
      }
      input = input.parentElement;
    }
  }

  eyeShows.forEach(eyeShow => {
    eyeShow.addEventListener("click", () => {
      let parentElement = getParentElement(eyeShow, ".form-group");
      if (eyeShow.classList.contains("--hide")) {
        eyeShow.classList.remove("--hide");
        eyeShow.parentElement.querySelector("img[alt = 'icon-eye-hide']").classList.add('--hide');
      } else {
        eyeShow.classList.add("--hide");
        eyeShow.parentElement.querySelector("img[alt = 'icon-eye-hide']").classList.remove("--hide");
        parentElement.querySelector("input").setAttribute("type", "text");  
      }
    });
  })

  eyeHides.forEach(eyeHide => {
    eyeHide.addEventListener("click", () => {
      let parentElement = getParentElement(eyeHide, ".form-group");
      if (eyeHide.classList.contains("--hide")) {
        eyeHide.classList.remove("--hide");
        eyeHide.parentElement.querySelector("img[alt = 'icon-eye-show']").classList.add("--hide");

      } else {
        eyeHide.classList.add("--hide");
        eyeHide.parentElement.querySelector("img[alt = 'icon-eye-show']").classList.remove("--hide");
        parentElement.querySelector("input").setAttribute("type", "password");
      }
    });
  })
}

// HANDLE DISPLAY SIGNUP FORM
const displaySignupForm = () => {
  const btnSignup = document.querySelector('.header__right .btn.--cta');
  const popupSignup = document.querySelector('.popupsignup');
  const btnClose = document.querySelector('.popupsignup__close');
  const popupSignupInner = document.querySelector('.popupsignup__inner');
  const btnSignupMobile = document.querySelector('.nav .btn.--cta');
  
  btnSignup.addEventListener('click', () => {
    popupSignup.classList.add('--visible');
  })

  btnSignupMobile.addEventListener('click', () => {
    popupSignup.classList.add("--visible");
  })

  popupSignup.addEventListener('click', () => {
    removeVisible();
  })

  popupSignupInner.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  btnClose.addEventListener('click', () => {
    removeVisible();
  })

  // Remove Class Visible
  function removeVisible() {
    popupSignup.classList.remove('--visible');
  }
}

// SLIDER
const handleSlider = () => {
  const sliderList = document.querySelector(".slider .slider__list");

  let flkty = new Flickity(sliderList, {
    fade: true,
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    wrapAround: true,
    prevNextButtons: false,
    on: {
      ready: function () {
        console.log("ready");
      },
      change: function (index) {
        handlePaging(index);
        handleActiveDot(index);
      },
    },
  });

  // Handle Click Buttons Control
  function clickButtonsControl() {
    const btnNext = document.querySelector(
      ".slider__bottom-controls .btn.--next"
    );

    const btnPrev = document.querySelector(
      ".slider__bottom-controls .btn.--prev"
    );

    btnNext.addEventListener("click", () => {
      flkty.next(true);
    });

    btnPrev.addEventListener("click", () => {
      flkty.previous(true);
    });
  }
  clickButtonsControl();

  // Handle Click Dots
  const clickDots = () => {
    const dots = document.querySelectorAll(
      ".slider__bottom-paging .dotted ol li"
    );

    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        dots.forEach((dotActive) => {
          dotActive.classList.remove("--active");
        });
        flkty.select(index);
        e.target.classList.add("--active");
      });
    });
  };

  clickDots();

  // Handle Update Number Paging
  function handlePaging(index) {
    const numberCurrentElement = document.querySelector(
      ".slider__bottom-paging .number .number__current"
    );
    let numberCurrent = (index + 1).toString().padStart(2, "0");
    numberCurrentElement.innerHTML = numberCurrent;
  }

  // Assign Total Page Number
  const assignTotalPageNumber = () => {
    const numberTotal = document.querySelector(
      ".slider__bottom-paging .number .number__total"
    );
    const quantitySlider = document.querySelectorAll(
      ".slider .slider__list .slider__list-item"
    ).length;

    numberTotal.innerHTML = quantitySlider.toString().padStart(2, "0");
  };

  assignTotalPageNumber();

  // Handle Active Dots By When Not Click
  function handleActiveDot(indexSlider) {
    const dots = document.querySelectorAll(
      ".slider__bottom-paging .dotted ol li"
    );
    dots.forEach((item, indexDot) => {
      if (indexSlider === indexDot) {
        item.classList.add("--active");
      } else {
        item.classList.remove("--active");
      }
    });
  }
};

// GALLERY
const handleGallery = () => {
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
    infinite: true,
  });
};

// CAROUSELS
const handleCarousel = () => {
  const carouselImgs = document.querySelector(".carousel .carousel__imgs");

  let flkty = new Flickity(carouselImgs, {
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    lazyLoad: 3,
  });

  const handleProgressBarCarousel = () => {
    const progressBar = document.querySelector(
      ".carousel .carousel__progress .carousel__progress-inner"
    );

    flkty.on("scroll", (percent) => {
      percent = Math.max(0, Math.min(1, percent));
      progressBar.style.width = `${percent * 100}%`;
    });
  };

  handleProgressBarCarousel();
};

// LANGUAGE
const handleSelectLanguage = () => {
  const optionBlock = document.querySelector(".header__right-language .option");
  const languageSelect = document.querySelector(
    ".header__right-language .select .select__current"
  );
  const languageBlock = document.querySelector(".header__right-language");

  const selectLanguage = () => {
    // Get Language Dropdown
    const languageOption = document.querySelectorAll(
      ".header__right-language .option li"
    );

    languageOption.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        // Get current value
        let valueCurrent = languageSelect.textContent;

        // Get value option
        let value = e.target.textContent;
        e.target.textContent = valueCurrent;
        languageSelect.textContent = value;
        optionBlock.classList.add("--hidden");
        languageBlock.classList.remove("--active");
      });
    });
  };

  selectLanguage();

  const showLanguage = () => {
    const selectBlock = document.querySelector(
      ".header__right-language .select"
    );

    languageBlock.addEventListener("click", (e) => {
      e.stopPropagation();
      optionBlock.classList.toggle("--hidden");
      e.target.classList.toggle("--active");
    });

    selectBlock.addEventListener("click", () => {
      languageBlock.classList.toggle("--active");
    });

    document.body.addEventListener("click", () => {
      optionBlock.classList.add("--hidden");
      languageBlock.classList.remove("--active");
    });
  };

  showLanguage();
};

// MENU
const header = document.querySelector(".header");


// TABS
const handleTabs = () => {
  const tabs = document.querySelectorAll(".news__tabs li");
  const newsList = document.querySelectorAll(".news__wrap-list");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((tab) => {
        tab.classList.remove("--active");
      });

      e.target.classList.add("--active");

      newsList.forEach((list) => {
        list.classList.remove("--active");
      });

      newsList[index].classList.add("--active");
    });
  });
};

// ACCORDION
const handleAccordion = () => {
  const accordions = document.querySelectorAll(
    ".question__list-accordion .content"
  );
  const answers = document.querySelectorAll(
    ".question__list-accordion .content .content__answer"
  );

  accordions.forEach((item, index) => {
    item.addEventListener("click", () => {
      item.classList.toggle("--active");

      // Check if has "--active"
      if (item.classList.contains("--active")) {
        answers[index].style.height = answers[index].scrollHeight + "px";
      } else {
        answers[index].style.height = "0px";
      }

      // Remove active if different index
      accordions.forEach((itemPrev, index2) => {
        if (index !== index2) {
          itemPrev.classList.remove("--active");
          answers[index2].style.height = "0px";
        }
      });
    });
  });
};

// MODAL VIDEO
const showPopupVideo = () => {
  const popupVideo = document.querySelector(".popupvideo");
  const thumbs = document.querySelectorAll(
    ".videos .videos__list .videos__list-item .thumb"
  );
  // const playBtns = document.querySelectorAll(".videos .videos__list .videos__list-item .thumb .thumb__play");
  const closeBtn = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .close"
  );
  const iframePopup = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe"
  );
  const iframeVideo = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"
  );
  const watchBtn = document.querySelector(".banner .textbox .btn");

  // Show Popup Video when click video circle thumbnail & playbtn
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      popupVideo.classList.add("--active");

      // Get Id Video
      let idVideo = thumb.getAttribute("data-video-src");

      // Set id for src iframe
      iframeVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/${idVideo}?autoplay=1`
      );
    });
  });

  // Show Popup Video when click Watch Video Button
  watchBtn.addEventListener("click", () => {
    popupVideo.classList.add("--active");

    // Get Id Video
    let idVideo = watchBtn.getAttribute("data-video-src");

    // Set Id For Iframe
    iframeVideo.setAttribute(
      "src",
      `https://www.youtube.com/embed/${idVideo}?autoplay=1`
    );
  });

  // Hide Popup Video
  const hidePopupVideo = () => {
    popupVideo.classList.remove("--active");
    iframeVideo.setAttribute("src", "");
  };

  // Hide when click Popup Video
  popupVideo.addEventListener("click", hidePopupVideo);

  // Hide when click close button
  closeBtn.addEventListener("click", hidePopupVideo);

  // Hide when press escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hidePopupVideo();
    }
  });

  // When click iframe not allow hide popup video
  iframePopup.addEventListener("click", (e) => {
    e.stopPropagation();
  });
};

// PROGRESSBAR ON SCROLL
const scrollProgress = (scroll) => {
  const progressbar = document.querySelector(".progressbar");

    scroll.on("scroll", (args) => {
    let heightWindow = window.innerHeight;
    let heightBody = document.body.offsetHeight;
    let scrollY = args.scroll.y;
    let percent = ((scrollY / (heightBody - heightWindow)) * 100).toFixed();

    progressbar.style.width = `${percent}%`;
  });
};

// MOUSE MOVE
const mouseCircle = document.querySelector(".mouse-circle");
const moveMouse = () => {
  document.addEventListener("mousemove", (e) => {
    let x = e.clientX - mouseCircle.clientWidth / 2;
    let y = e.clientY - mouseCircle.clientHeight / 2;

    mouseCircle.style.transform = `translate(${x}px, ${y}px)`;
  });
};

// MOUSE HOVER
const handleMouseHover = () => {
  const elements = document.querySelectorAll(".--hover");

  // When Hover
  elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      mouseCircle.classList.add("--active");
    });
    element.addEventListener("mouseout", () => {
      mouseCircle.classList.remove("--active");
    });
  });

  // When OutHover
  // mouseCircle.classList.remove("--active");
};

// LOCOMOTIVE SCROLL
const scrollSmooth = () => {
  // LOCOMOTIVE SCROLL
  const btnMain = document.querySelector(
    ".slider__list-item .content .btn.--main"
  );
  const btnBackToTop = document.querySelector(".btn.--backtotop");

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    tablet: {
      smooth: true,
    },
    smartphone: {
      smooth: true,
    },
    reloadOnContextChange: true,
    resetNativeScroll: false,
    lerp: 0.15
  });

  scroll.update();

  const scrollChange = () => {
    scroll.on("scroll", (args) => {
      let topBtnMain = btnMain.offsetTop;
      let heightBtnMain = btnMain.offsetHeight;
      let conditionChange = args.scroll.y > topBtnMain + heightBtnMain;
      // Change Background Header & Show Button Back To Top
      if (conditionChange) {
        header.classList.add("--bg-black");
        btnBackToTop.classList.add("--show");
      } else {
        header.classList.remove("--bg-black");
        btnBackToTop.classList.remove("--show");
      }
    });
  };
  scrollChange();
  scrollProgress(scroll);

  const handleMenu = () => {
    const menus = document.querySelectorAll(".header__menu li a");
    const menusMobile = document.querySelectorAll(".nav .nav__mobile li a");

    // Get elemnts of menu mobile
    const humburger = document.querySelector(".header__right-humburger");
    const nav = document.querySelector(".nav");
    const logo = document.querySelector(".header__logo");
    const language = document.querySelector(".header__right-language");

    // Remove active menu
    const removeMenuActive = () => {
      menus.forEach((item) => {
        item.classList.remove("--active");
      });
    };

    const removeMenuActiveMobile = () => {
      menusMobile.forEach((menu) => {
        menu.classList.remove("--active");
      });
    };

    const hideMenuMobile = () => {
      humburger.classList.remove("--close");
      nav.classList.remove("--active");
      logo.classList.remove("--hide");
      language.classList.remove("--hide");
    };

    // Click menu link scroll to section
    const handleActiveOnClick = () => {
      menus.forEach((menu) => {
        menu.addEventListener("click", (e) => {
          e.preventDefault();

          // Remove active
          removeMenuActive();

          // Add active
          menu.classList.add("--active");

          // Get id menu
          let idMenuItem = menu.getAttribute("href");
          let heightHeader = header.offsetHeight;

          // Go to section corresponding
          scroll.scrollTo(
            document.querySelector("section" + idMenuItem).offsetTop -
              heightHeader
          );
        });
      });

      menusMobile.forEach((menu) => {
        menu.addEventListener("click", (e) => {
          e.preventDefault();

          removeMenuActiveMobile();

          menu.classList.add("--active");

          let id = menu.getAttribute("href");

          let heightHeader = header.clientHeight;

          // window.scrollTo({
          //   top: document.querySelector("section" + id).offsetTop - heightHeader,
          //   behavior: "smooth",
          // });
          scroll.scrollTo(
            document.querySelector("section" + id).offsetTop - heightHeader
          );

          hideMenuMobile();
        });
      });
    };
    handleActiveOnClick();

    // Scroll To Section
    const scrollToSection = () => {
      // Active menu on scroll to section
      const sections = document.querySelectorAll("section");

      scroll.on("scroll", (args) => {
        sections.forEach((section, index) => {
          let topSection = section.offsetTop;
          let heigthSection = section.offsetHeight;
          let heightHeader = header.offsetHeight;
          let scrollY = args.scroll.y + 1;

          if (
            scrollY > topSection - heightHeader &&
            scrollY < topSection + heigthSection
          ) {
            let idSection = section.getAttribute("id");

            // Remove active menu
            removeMenuActive();
            removeMenuActiveMobile();

            if (idSection !== null) {
              menus[index].classList.add("--active");
              menusMobile[index].classList.add("--active");
            }
          }
        });
      });
    };
    scrollToSection();

    // Display menu mobile
    const displayMenuMobile = () => {
      // Show/Hide Menu
      humburger.addEventListener("click", () => {
        humburger.classList.toggle("--close");
        nav.classList.toggle("--active");
        logo.classList.toggle("--hide");
        language.classList.toggle("--hide");

        // Hide Menu On Resize
        window.addEventListener("resize", () => {
          if (window.innerWidth > 992) {
            hideMenuMobile();
          }
        });
      });
    };

    displayMenuMobile();
  };
  handleMenu();

  // Handle Button Back To Top On Click
  const backToTop = () => {
    btnBackToTop.addEventListener("click", () => {
      scroll.scrollTo("top");
    });
  };
  backToTop();
}

// HANDLE VALIDATE FORM
function validateForm() {
  const formSignup = document.querySelector('#signup-form');
  const fullname = document.querySelector('#fullname');
  const email = document.querySelector('#email');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirm-password');
  const policy = document.querySelector('#policy');

  // isEmail
  const isEmail = (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  // isUsername
  const isUsername = (value) => {
    const regex = /^[a-z0-9_.]+$/;
    return regex.test(value);
  }

  // isPassword
  const isPassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return regex.test(value);
  }

  const getParentElement = (input, selector) => {
    while (input.parentElement) {
      if (input.parentElement.matches(selector)) {
        return input.parentElement;
      }
      input = input.parentElement;
    }
  }

  const handleError = (input, errorMessage = '') => {
    const parentElement = getParentElement(input, '.form-group');
    const errorElement = parentElement.querySelector(".form-message");
    if (errorMessage !== '') {
      // Show Error
      parentElement.classList.add("--invalid");
      errorElement.innerText = errorMessage;
    } else {
      // Hide Error
      parentElement.classList.remove("--invalid");
      errorElement.innerText = '';
    }
  }

  const validateInput = () => {
    let data = [];
    // Fullname
    const valueFullname = fullname.value.trim();
    if (valueFullname === '') {
      handleError(fullname, "Pleased fill in this field");
      return false;
    } else {
      data.push(valueFullname);
      handleError(fullname)
    }

    // Email
    const valueEmail = email.value.trim();
    if (valueEmail === "") {
      handleError(email, "Pleased fill in this field");
      return false;
    } else if (!isEmail(valueEmail)) {
      handleError(email, "Invalid email");
      return false;
    } else {
      data.push(valueEmail);
      handleError(email);
    }

    // Username
    const valueUsername = username.value.trim();
    if (valueUsername === "") {
      handleError(username, "Pleased fill in this field");
      return false;
    } else if (!isUsername(valueUsername)) {
      handleError(username, "Username is contained only letters, numbers, underscores, and periods");
      return false;
    } else {
      data.push(valueUsername);
      handleError(username);
    }

    // Password
    const valuePassword = password.value.trim();
     if (valuePassword === "") {
       handleError(password, "Pleased fill in this field");
      return false;
     } else if (!isPassword(valuePassword)) {
       handleError(
         password,
         "Password contains 6 to 20 characters numbers, uppercase and lowercase letters"
       );
      return false;
     } else {
      data.push(valuePassword);
      handleError(password);
     }

    //  Confirm Password
    const valueConfirmPassword = confirmPassword.value.trim();
    if (valueConfirmPassword === "") {
      handleError(confirmPassword, "Pleased fill in this field");
      return false;
    } else if (valueConfirmPassword !== valuePassword) {
      handleError(confirmPassword, "Passwords do not match");
      return false;
    } else {
      data.push(valueConfirmPassword);
      handleError(confirmPassword);
    }

    // Policy
    if (!policy.checked) {
      handleError(policy, "Pleased check in this field");
      return false;
    } else {
      handleError(policy);
    }

    return data;
  }

  formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = validateInput();
    if (data) {
      // Call API
      console.log(data);
    } else {
      console.log("error");
    }
  })
}

// LOADING PAGE
const initLoading = () => {
  // Assign percent for loading progress
  const assignPercentLoading = (percent) => {
    const progressBar = document.querySelector(
      ".loading .loading__inner .loading__inner-progress .bar"
    );
    const textPercent = document.querySelector(
      ".loading .loading__inner .loading__inner-percent"
    );

    progressBar.style.width = `${percent}%`;
    textPercent.textContent = `${percent}%`;
  };

  // Hide Loading When Page Loaded
  const body = document.querySelector("body");

  const hideLoading = () => {
    const loading = document.querySelector(".loading");

    body.classList.remove("--disable-scroll");
    loading.classList.add("--hide");
  };

  let count = 0;
  const lengthImgs = document.querySelectorAll("img").length;
  let imgsLoaded = new imagesLoaded(body);

  imgsLoaded
    .on("progress", (instance) => {
      count++;
      let percent = Math.floor((count / lengthImgs) * 100);
      assignPercentLoading(percent);
    })
    .on("always", (instance) => {
      console.log("always");
      scrollSmooth();
    })
    .on("fail", (instance) => {
      console.log("fail");
    })
    .on("done", (instance) => {
      console.log("done");
      hideLoading();
    });
};

window.addEventListener("load", () => {
  initLoading();
  handleSlider();
  handleCarousel();
  handleMouseHover();
  moveMouse();
  handleTabs();
  handleAccordion();
  handleGallery();
  handleSelectLanguage();
  showPopupVideo();
  displaySignupForm();
  showHidePassword();
  validateForm();
});