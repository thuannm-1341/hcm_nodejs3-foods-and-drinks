const locale = getCookie('locale');
let orderIdToUpdate; // Variable to store the order ID

const openRejectModal = (id) => {
  orderIdToUpdate = id;
  const rejectReasonModal = new bootstrap.Modal(document.getElementById('rejectReasonModal'));
  rejectReasonModal.show();
}

const openStoreModal = (id) => {
  orderIdToUpdate = id;
  const chooseStoreModal = new bootstrap.Modal(document.getElementById('chooseStoreModal'));
  chooseStoreModal.show();
}

const updateOrderStatus = (e, id, status, rejectReason = '') => {
  const data = {
    id,
    orderStatus: status,
    rejectReason // Include the reject reason if provided
  };

  fetch(`/admin/order/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Assuming the server returns a simple text message upon success
  })
  .then(message => {
    swal.fire({
      title: locale === 'en' ? 'Successfully!' : 'Thành công!',
      text: locale === 'en' ? 'Update order status successfully' : 'Cập nhật trạng thái đơn hàng thành công',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      location.reload(); // Reload the page after the alert is closed
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    // Optionally, show an error message if the fetch fails
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text: locale === 'en' ? 'Failed to update order status' : 'Cập nhật trạng thái đơn hàng thất bại',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  });
}

document.getElementById('confirmRejectBtn').addEventListener('click', () => {
  const rejectReason = document.getElementById('rejectReason').value;
  if (rejectReason) {
    updateOrderStatus(null, orderIdToUpdate, 'REJECTED', rejectReason);
    $('#rejectReasonModal').modal('hide'); // Close the modal after confirming
  } else {
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text: locale === 'en' ? 'Please provide a rejection reason' : 'Vui lòng cung cấp lý do từ chối',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
});

document.getElementById('confirmStoreBtn').addEventListener('click', () => {
  const orderId = parseInt($('#order-id').attr('data'));
  const storeId = $('#storeSelect').val();
  updateOrderStore(orderId, storeId);
});

const updateOrderStore = (orderId, storeId) => {
  const data = {
    orderId,
    storeId,
  };

  fetch(`/admin/order/update-store`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Assuming the server returns a simple text message upon success
  })
  .then(message => {
    swal.fire({
      title: locale === 'en' ? 'Successfully!' : 'Thành công!',
      text: locale === 'en' ? 'Update order store successfully' : 'Cập nhật trạng cửa hàng nhận đơn thành công',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      location.reload(); // Reload the page after the alert is closed
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    // Optionally, show an error message if the fetch fails
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text: locale === 'en' ? 'Failed to update order store' : 'Cập nhật cửa hàng nhận đơn thành công',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  });
}
