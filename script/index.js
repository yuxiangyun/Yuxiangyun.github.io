(function($){
  $('.article').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Change ol\ul list style
  $('.article ul, .article ol').each(function (i, elem) {
    $(elem).find('li').each(function(index, li) {
      var $li = $(li);

      if (!$li.children().hasClass('li-inner')) {
        $li.wrapInner('<span class="li-inner"></span>');
      }
    });
  });

  $('.article input[type="checkbox"]').each(function (i, elem) {
    var $elem = $(elem);
    var checked = elem.checked;
    var dom = '<span class="checkbox-wrap ' + (checked ? 'checked' : '') + '"></span>';

    if (!$elem.parent().hasClass('checkbox-wrap')) {
      var $parent = $elem.parent().parent();
      var text = $parent.text();

      $parent.html(dom + '<span class="check-content ' + (checked ? 'checked' : '') + '">' + text + '</span>');
    }
  });

  // Align Chinese opening brackets with the text block when Markdown headings
  // begin with 《. Titles rendered by templates receive the class server-side.
  $('.content h1, .content h2, .content h3, .content h4, .content h5, .content h6').each(function () {
    if ($(this).text().trim().charAt(0) === '《') {
      $(this).addClass('title--cjk-opening');
    }
  });

  // Avatar
  var $mask = $('.about-me-mask');
  $('.avatar').on('click', function () {
    if (!$mask.hasClass('open')) {
      $mask.addClass('open');
    }
  });

  $mask.on('click', function (e) {
    if (e.target.classList.contains('about-me-mask')) {
      $mask.removeClass('open');
    }
  });

  // Back to top
  var $backToTop = $('#backToTop');
  $(document).on('scroll', function () {
    var sX = $(document).scrollTop();
    if (sX > 100) {
      $backToTop.addClass('show');
    }

    if (sX <= 100) {
      $backToTop.removeClass('show');
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 300);
});

  // Theme toggle
  var $html = $('html');
  var $themeToggle = $('.theme-toggle');
  var themeStorageKey = 'grillme-theme';

  function getSavedTheme() {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // Private browsing modes may disallow localStorage.
    }
  }

  function updateThemeToggle(theme) {
    var isDark = theme === 'dark';
    var action = isDark ? '浅色' : '暗色';

    $themeToggle.attr('aria-pressed', isDark ? 'true' : 'false');
    $themeToggle.attr('aria-label', '切换' + action + '模式');
    $themeToggle.attr('title', '切换' + action + '模式');
  }

  function applyTheme(theme, persist) {
    var normalizedTheme = theme === 'dark' ? 'dark' : 'light';

    $html.attr('data-theme', normalizedTheme);
    updateThemeToggle(normalizedTheme);

    if (persist) saveTheme(normalizedTheme);
  }

  if ($themeToggle.length) {
    applyTheme($html.attr('data-theme') || getSavedTheme() || 'dark', false);

    $themeToggle.on('click', function () {
      applyTheme($html.attr('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

})(jQuery);
