$(document).ready(function() {
  function updateLocaleLinks() {
    var currentUrl = new URL(window.location.href);
    $('.locale-link').each(function() {
      var locale = $(this).data('locale');
      currentUrl.searchParams.set('locale', locale);
      $(this).attr('href', currentUrl.toString());
    });
  }
  updateLocaleLinks();
});
