const locale = getCookie('locale');
const updateOrderStatus = (e, id, status) => {
  const data = {
    id,
    orderStatus: status,
  };
  fetch(`/user/order/update`, {
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
      title: locale === 'en'? 'Successfully!' : 'Thành công!',
      text: locale === 'en'? 'Update order status successfully' : 'Cập nhật trạng thái đơn hàng thành công',
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
      title: locale === 'en'? 'Error' : 'Lỗi',
      text: locale === 'en'? 'Failed to update order status' : 'Cập nhật trạng thái đơn hàng thất bại',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  });
}
