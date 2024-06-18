VirtualSelect.init({
  ele: '#categories-select',
})
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('#trueFalseToggle');
  toggle.addEventListener('change', function () {
    toggle.value = toggle.checked ? 'true' : 'false';
  });
});
