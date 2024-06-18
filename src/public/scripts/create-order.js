$(document).ready(function () {
  const orderSubtotal = parseInt($('#order-subtotal').attr('data'));
  const shippingFee = parseInt($('#shipping-fee').attr('data'));
  let orderType = $('#order-type').attr('data');

  function updateOrderDisplay(orderType) {
    if (orderType === 'DELIVERY') {
      $('#deliveryAddressContainer').show();
      $('#storeSelectionContainer').hide();
      $('#shipping-fee').text(formatCurrency(shippingFee));
      $('#orderTotal').text(formatCurrency(orderSubtotal + shippingFee));
    } else if (orderType === 'PICKUP') {
      $('#deliveryAddressContainer').hide();
      $('#storeSelectionContainer').show();
      $('#shipping-fee').text(formatCurrency(0));
      $('#orderTotal').text(formatCurrency(orderSubtotal));
    }
  }

  // Set default order type to DELIVERY if undefined or invalid
  if (typeof orderType === 'undefined' || (orderType !== 'DELIVERY' && orderType !== 'PICKUP')) {
    orderType = 'DELIVERY';
    $('#order-type').attr('data', orderType);
  }

  updateOrderDisplay(orderType);

  // Optionally, update the visibility if the delivery type changes due to user action
  $('input[name="orderType"]').on('change', function () {
    updateOrderDisplay($(this).val());
  });
});

$(document).ready(function() {
  $('.payment-option').on('click', function() {
    $('.payment-option-card').removeClass('active');
    $(this).closest('.payment-option-card').addClass('active');
    $(this).find('input[type="radio"]').prop('checked', true);
  });

  // Ensure the active class is set on the selected payment option on page load
  $('input[name="paymentType"]:checked').closest('.payment-option-card').addClass('active');
});
