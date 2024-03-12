(function () {
  // * Define calculation boiler plate *

  // Variables
  let windowWidth = window.innerWidth;
  let resizeTimeout;
  let is1280Desktop;
  let isDesktop;
  let isMobile;
  let appIconOffsetDeduction;

  // Calculate viewports
  function calcViewports() {
    is1280Desktop = windowWidth > 1279;
    isDesktop = windowWidth > 991;
    isMobile = windowWidth < 768;
    appIconOffsetDeduction = document.querySelector(
      '[gsap="webflow-icon"]'
    ).offsetLeft;
  }
  calcViewports();

  // Resize event
  window.addEventListener('resize', function () {
    // Logic
    if (window.innerWidth != windowWidth) {
      // Gsap
      pause();

      // Overwrite & calculate
      windowWidth = window.innerWidth;
      calcViewports();

      // Play
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        reset();
        play();
      }, 100);
    }
  });

  /* Define gsap boilerplate */

  // Variables
  let gsapTimelines = [];
  const gsapTimelineCreators = [createFlashTimeline, createMainTimeline];

  // Pause gsap timelines
  function pause() {
    // Pause
    gsapTimelines.forEach(tl => {
      tl.pause();
    });
  }

  // Reset gsap timelines
  function reset() {
    // Destroy
    gsapTimelines.forEach(tl => {
      tl.progress(1);
      tl.kill();
    });

    // Overwrite
    gsapTimelines = [];

    // Add
    gsapTimelineCreators.forEach(creator => {
      creator();
    });
  }

  // Play gsap timelines
  function play() {
    // Play
    gsapTimelines.forEach(tl => {
      tl.play();
    });
  }

  /* Define gsap timelines */

  // GSAP Flash animation
  function createFlashTimeline(pause = true) {
    // Elements
    const topFlashes = document.querySelectorAll('[gsap="top-flash"]');
    const bottomFlashes = document.querySelectorAll('[gsap="bottom-flash"]');

    // Variables
    const tl = gsap.timeline({ repeat: -1 });

    // - Define -

    // Set
    tl.set([topFlashes, bottomFlashes], {
      top: 0,
      left: 0,
    });

    // Top flashes timeline
    tl.fromTo(
      topFlashes,
      {
        x: isDesktop ? 0 : '-100%',
        y: !isDesktop ? 0 : '100%',
      },
      {
        x: isDesktop ? 0 : '100%',
        y: !isDesktop ? 0 : '-100%',
        duration: 2.5,
        ease: 'none',
      }
    );

    // Bottom flashes timeline
    tl.fromTo(
      bottomFlashes,
      {
        x: isDesktop ? 0 : '100%',
        y: !isDesktop ? 0 : '-100%',
      },
      {
        x: isDesktop ? 0 : '-100%',
        y: !isDesktop ? 0 : '100%',
        duration: 2.5,
        ease: 'none',
      },
      '<'
    );

    // Play / pause logic
    if (pause) tl.pause();
    if (!pause) tl.progress(isDesktop ? 0.75 : 0.25);

    // Add variable
    gsapTimelines.push(tl);
  }
  createFlashTimeline(false);

  // Trigger webflow lottie animations
  function trigger(elements) {
    // Loop
    (elements instanceof NodeList ? elements : [elements]).forEach(element =>
      element.click()
    );
  }

  // Add / remove class
  function alterClass(element, className, mode = 'remove') {
    // Values
    const elements = element instanceof NodeList ? element : [element];

    // Loop
    elements.forEach(element => element.classList[mode](className));
  }

  // Add / remove class for icon
  const appIconsWrapper = document.querySelector('[gsap="app-icons-wrapper"]');
  function activateAppIcon(element, activate = true) {
    // Alter class
    alterClass(element, 'is-inactive', activate ? 'remove' : 'add');

    // If mobile, scroll to icon
    if (isMobile && activate) {
      // Values
      const iconOffset = element.offsetLeft - appIconOffsetDeduction;

      // Scroll to
      appIconsWrapper.scrollTo({
        left: iconOffset,
        behavior: 'smooth',
      });
    }
  }

  // GSAP Main animation
  function createMainTimeline(pause = true) {
    // - Elements -

    // App icon tool bar
    const wfIcon = document.querySelector('[gsap="webflow-icon"]');
    const wizedIcon = document.querySelector('[gsap="wized-icon"]');
    const xanoIcon = document.querySelector('[gsap="xano-icon"]');
    const supabaseIcon = document.querySelector('[gsap="supabase-icon"]');

    // Center
    const centerComponent = document.querySelector('[gsap="center-component"]');
    const centerComponentAnchor = document.querySelector(
      '[gsap-anchor="properties"]'
    );
    const centerElements = document.querySelectorAll('[gsap="center"]');
    const centerPopup = document.querySelectorAll('[gsap="popup"]');
    const centerPopupBackground =
      document.querySelectorAll('[gsap="popup-bg"]');
    const centerPopupBlur = document.querySelectorAll('[gsap="popup-blur"]');
    const centerPopupContent = document.querySelectorAll(
      '[gsap="popup-content"]'
    );
    const centerLoadStart = document.querySelectorAll(
      '[gsap="center-load-start"]'
    );
    const centerLoadAwait = document.querySelectorAll(
      '[gsap="center-load-await"]'
    );
    const centerLoadResult = document.querySelectorAll(
      '[gsap="center-load-result"]'
    );
    const centerLoginButton = document.querySelector(
      '[gsap-center="login-button"]'
    );

    // Center trigger
    const centerTrigger1 = document.querySelector('[gsap="center-trigger-1"]');
    const centerTrigger2 = document.querySelector('[gsap="center-trigger-2"]');
    const centerTrigger3 = document.querySelector('[gsap="center-trigger-3"]');

    // Lotties
    const wfLotties = document.querySelectorAll('[gsap="webflow-lottie"]');
    const wizedLotties = document.querySelectorAll('[gsap="wized-lottie"]');
    const xanoLotties = document.querySelectorAll('[gsap="xano-lottie"]');
    const supabaseLotties = document.querySelectorAll(
      '[gsap="supabase-lottie"]'
    );

    // Other
    const leftIconBarWrapper = document.querySelectorAll(
      '[gsap="left-icon-bar-wrapper"]'
    );
    const leftContentWrapper = document.querySelectorAll(
      '[gsap="left-content-wrapper"]'
    );
    const leftComponentGhost = document.querySelectorAll(
      '[gsap="left-component-ghost"]'
    );
    const rightComponent = document.querySelectorAll(
      '[gsap="right-component"]'
    );
    const webflowLottieWrappers = document.querySelectorAll(
      '[gsap="webflow-lottie-wrapper"]'
    );
    const wizedLottieWrappers = document.querySelectorAll(
      '[gsap="wized-lottie-wrapper"]'
    );
    const xanoLottieWrappers = document.querySelectorAll(
      '[gsap="xano-lottie-wrapper"]'
    );
    const supabaseLottieWrappers = document.querySelectorAll(
      '[gsap="supabase-lottie-wrapper"]'
    );
    const endBackgrounds = document.querySelectorAll('[gsap="end-bg"]');

    // Variables
    const tl = gsap.timeline({ repeat: -1 });

    // - Define -

    // Start delay
    if (!isMobile) tl.to({}, { duration: 1.25 });

    // Activate webflow icon
    tl.call(activateAppIcon, [wfIcon]);

    // Start wf lotties & delay
    if (!isMobile) {
      tl.call(trigger, [wfLotties]).to({}, { duration: 1.95 });
    }

    // Trickle in center elements
    centerElements.forEach(element => {
      tl.call(alterClass, [element, 'is-start']).to({}, { duration: 0.1 });
    });

    // Deactivate webflow icon
    tl.call(activateAppIcon, [wfIcon, false]);

    // Reverse wf lotties & delay
    if (!isMobile) {
      // 2nd trigger wf lotties
      tl.call(trigger, [wfLotties]);

      // Play out delay
      tl.to({}, { duration: 1.95 });

      // Hide left side webflow component
      tl.set(webflowLottieWrappers, { display: 'none' });

      // Show lef side wized component
      tl.set(wizedLottieWrappers, { display: 'flex' });

      // Expand left
      tl.to(leftContentWrapper, { width: '33.375rem', duration: 1.25 });
      if (!is1280Desktop)
        tl.to(leftComponentGhost, { width: '19rem', duration: 1.25 }, '<');

      // 1st trigger wized lotties
      tl.call(trigger, [wizedLotties], '<');

      // Activate wized icon
      tl.call(activateAppIcon, [wizedIcon], '<');

      // Shrink right side pannel
      if (is1280Desktop)
        tl.to(
          rightComponent,
          { marginLeft: '0rem', width: '0rem', opacity: 0, duration: 1.25 },
          '<'
        );

      // Await wized animations
      tl.to({}, { duration: 2.3 - 1.25 });
    }

    // Mobile delay
    if (isMobile) tl.to({}, { duration: 0.75 });

    // Activate wized icon
    if (isMobile) tl.call(activateAppIcon, [wizedIcon]);

    // Animate login button
    tl.to(centerLoginButton, { scale: 0.65, duration: 0.125 });
    tl.to(centerLoginButton, { scale: 1, duration: 0.125 });
    tl.to({}, { duration: 0.25 });

    // - Open popup -

    // Wrapper
    tl.set(centerPopup, { display: 'flex' });

    // Background & content
    tl.fromTo(
      [centerPopupBackground, centerPopupContent],
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Blur
    tl.fromTo(
      centerPopupBlur,
      { backdropFilter: 'blur(0px)' },
      { backdropFilter: 'blur(15px)', duration: 0.5 },
      '<'
    );

    // Play center lottie
    tl.call(trigger, [centerTrigger1]).to({}, { duration: 1.8 });

    // Deactivate wized icon
    tl.call(activateAppIcon, [wizedIcon, false]);

    // Reverse wized lotties & delay
    if (!isMobile) {
      // 2nd trigger wized lotties
      tl.call(trigger, [wizedLotties]).to({}, { duration: 2.3 });

      // Contrapt left
      tl.to(
        leftContentWrapper,
        { width: '28.1875rem', duration: 1.25 },
        '-=1.25'
      );

      // Hide left side wized component
      tl.set(wizedLottieWrappers, { display: 'none' });

      // Show lef side xano component
      tl.set(xanoLottieWrappers, { display: 'flex' });

      // Activate xano icon
      tl.call(activateAppIcon, [xanoIcon]);

      // 1st trigger xano lotties
      tl.call(trigger, [xanoLotties]);

      // Await xano animations
      tl.to({}, { duration: 1.7 });
    }

    // Mobile delay
    if (isMobile) tl.to({}, { duration: 0.75 });

    // Activate xano icon
    if (isMobile) tl.call(activateAppIcon, [xanoIcon]);

    // Trigger Wized to Xano popup lottie action
    tl.call(trigger, [centerTrigger2]).to({}, { duration: 2.1 });

    // Deactivate xano icon
    tl.call(activateAppIcon, [xanoIcon, false]);

    // Reverse xano lotties & delay
    if (!isMobile) {
      // 2nd trigger xano lotties
      tl.call(trigger, [xanoLotties]).to({}, { duration: 1.7 });

      // Hide left side xano component
      tl.set(xanoLottieWrappers, { display: 'none' });

      // Show lef side supabase component
      tl.set(supabaseLottieWrappers, { display: 'flex' });

      // Activate supabase icon
      tl.call(activateAppIcon, [supabaseIcon]);

      // 1st trigger supabase lotties
      tl.call(trigger, [supabaseLotties]).to({}, { duration: 1.4 });
    }

    // Mobile delay
    if (isMobile) tl.to({}, { duration: 0.75 });

    // Activate supabase icon
    if (isMobile) tl.call(activateAppIcon, [supabaseIcon]);

    // - Set awaiting state for "rendered data" -
    tl.call(alterClass, [centerLoadStart, 'hide', 'add']);
    tl.call(alterClass, [centerLoadAwait, 'hide']);

    // Play center lottie (1.2)
    tl.call(trigger, [centerTrigger3]).to(
      {},
      { duration: isMobile ? 1.2 : 0.75 }
    );

    // Reverse supabase lotties & delay
    if (!isMobile) {
      // 2nd trigger supabase lotties
      tl.call(trigger, [supabaseLotties]).to({}, { duration: 1.4 });

      // Hide left side supabase component
      tl.set(supabaseLottieWrappers, { display: 'none' });

      // Contrapt left
      tl.to(leftContentWrapper, { width: '0rem', duration: 1.25 });
      if (!is1280Desktop)
        tl.to(leftComponentGhost, { width: '3.375rem', duration: 1.25 }, '<');

      // Fade out leftIconBarWrapper
      tl.to(leftIconBarWrapper, { opacity: 0, duration: 1.25 }, '<');

      // Show end bg
      tl.fromTo(
        endBackgrounds,
        { opacity: 0, display: 'none' },
        { opacity: 1, display: 'block', duration: 1.25 },
        '<'
      );
    }

    // - Close popup -

    // Blur
    tl.to(centerPopupBlur, { backdropFilter: 'blur(0px)', duration: 0.5 });

    // Background & content
    tl.to(
      [centerPopupBackground, centerPopupContent],
      { opacity: 0, duration: 0.5 },
      '<'
    );

    // Wrapper
    tl.set(centerPopup, { display: 'none' });

    // Deactivate supabase icon
    tl.call(activateAppIcon, [supabaseIcon, false]);

    // Await - as animation is nearly done -
    tl.to({}, { delay: 0.25 });

    // - Render "data" -
    tl.call(alterClass, [centerLoadAwait, 'hide', 'add']);
    tl.call(alterClass, [centerLoadResult, 'hide']);

    // Await - as animation is nearly done -
    tl.to({}, { delay: 0.1 });

    // - Scroll down -
    tl.call(() => {
      centerComponent.scrollTo({
        top: centerComponentAnchor.offsetTop - 48,
        behavior: 'smooth',
      });
    });

    // Await - as animation is now done -
    tl.to({}, { delay: 2.5 });

    // Remove trickle out center elements
    Array.from(centerElements)
      .reverse()
      .forEach(element => {
        tl.call(alterClass, [element, 'is-start', 'add']).to(
          {},
          { duration: 0.1 }
        );
      });

    // Reverse width to start width
    if (!isMobile) {
      // Expand left
      tl.to(leftContentWrapper, { width: '13.96875rem', duration: 1.25 });
      if (!is1280Desktop)
        tl.to(
          leftComponentGhost,
          { width: '17.34375rem', duration: 1.25 },
          '<'
        );

      // Fade in leftIconBarWrapper
      tl.to(leftIconBarWrapper, { opacity: 1, duration: 1.25 }, '<');

      // Grow right side pannel
      if (is1280Desktop)
        tl.to(
          rightComponent,
          {
            marginLeft: '0.625rem',
            width: '17.21875rem',
            opacity: 1,
            duration: 1.25,
          },
          '<'
        );

      // Hide end bg
      tl.to(
        endBackgrounds,
        { opacity: 0, display: 'none', duration: 1.25 },
        '<'
      );

      // Show lef side webflow component
      tl.set(webflowLottieWrappers, { display: 'flex' });
    } else {
      // Await - as animation is now done -
      tl.to({}, { delay: 0.5 });
    }

    // - Reset "rendered data"
    tl.call(alterClass, [centerLoadResult, 'hide', 'add']);
    tl.call(alterClass, [centerLoadStart, 'hide']);

    // - Reset scroll -
    tl.call(() => {
      centerComponent.scrollTo({
        top: 0,
      });
    });

    // Add variable
    gsapTimelines.push(tl);
  }

  // Smart loading trigger mechanism
  window.Webflow = window.Webflow || [];
  window.Webflow.push(() => {
    createMainTimeline(false);
  });
})();
