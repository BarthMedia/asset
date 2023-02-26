(() => {
  /* Start of: [BMG.studio] Enhanced Filter Query Info */

  // + Strings +

  // Selectors
  const wrapperSelector = '[bmg-element="Results Wrapper"]',
    numberSelector = '[bmg-element="Results Number"]',
    multiResultsTrueSpanSelector = '[bmg-element="Results Gramma Span"]',
    searchInputTrueSpanSelector =
      '[bmg-element="Results Gramma No Search Span"]',
    searchInputQuerySelector = '[bmg-element="Results Query"]',
    filterListSelector = '[fs-cmsfilter-element="list"]',
    filtersSelector = '[fs-cmsfilter-element="filters"]',
    searchSelector = 'input[type="text"]',
    buttonSelector = '.w-checkbox, .w-radio';

  // Attributes

  // Defaults
  const animationDelayDefault = 201; // ms

  // + Main +
  $(wrapperSelector).each(function () {
    // - Elements -
    const $wrapper = $(this),
      $number = $wrapper.find(numberSelector),
      $multiResultsTrue = $wrapper.find(multiResultsTrueSpanSelector),
      $searchInputTrue = $wrapper.find(searchInputTrueSpanSelector),
      $searchInputQuery = $wrapper.find(searchInputQuerySelector),
      $list = $(filterListSelector),
      $filters = $(filtersSelector),
      $search = $filters.find(searchSelector),
      $buttons = $filters.find(buttonSelector);

    // - Values -

    // - Functions -

    // Generate results
    function generateResults() {
      // - Values -
      let nOfResults = $list.children().length,
        input = $search.val();

      // - Update -

      // Number
      if (nOfResults < 100) $number.text(nOfResults);
      else $number.text('99+');

      // Multi results true
      if (nOfResults != 1) $multiResultsTrue.show();
      else $multiResultsTrue.hide();

      // Search input true
      if (input != '') {
        $searchInputTrue.show();
        $searchInputQuery.show();
      } else {
        $searchInputTrue.hide();
        $searchInputQuery.hide();
      }

      // Search input query
      $searchInputQuery.text(input);
    }

    // - Event listener -

    // Search
    $search.on('input propertychange', () => {
      setTimeout(generateResults, animationDelayDefault);
    });

    // Buttons
    $buttons.click(() => {
      setTimeout(generateResults, animationDelayDefault);
    });

    // - Initialize -
    generateResults();
  });

  // + Helper +

  // + Loader +
})(); /* End of: [BMG.studio] Enhanced Filter Query Info */
