$(document).ready(function() {
    $('#orderFilterForm').on('submit', function(event) {
      var orderStatusSelect = $('#orderStatus');
      if (orderStatusSelect.val() === "") {
        orderStatusSelect.removeAttr('name');
      }
      var orderTypeSelect = $('#orderType');
      if (orderTypeSelect.val() === "") {
        orderTypeSelect.removeAttr('name');
      }
      var paymentStatusSelect = $('#paymentStatus');
      if (paymentStatusSelect.val() === "") {
        paymentStatusSelect.removeAttr('name');
      }
    });
  });
