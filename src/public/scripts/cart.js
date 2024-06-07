const locale = getCookie('locale');
const addToCart = (e, id) => {
  const token = getCookie('token');
  if(!token){
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text:
        locale === 'en'
          ? 'Please login to continue'
          : 'Vui lòng đăng nhập để tiếp tục',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } else {
    const data = {
      productId: id,
    };
    fetch(`/cart/add`, {
      method: 'POST',
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
      // Assuming the server sends a simple text message upon success
      // You might need to adjust this part depending on the actual response format
      swal.fire({
        title: locale === 'en'? 'Successfully!' : 'Thành công!',
        text: locale === 'en'? 'Product has been added to cart' : 'Bạn đã thêm vào giỏ hàng thành công',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    })
   .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally, show an error message if the fetch fails
      swal.fire({
        title: locale === 'en'? 'Error' : 'Lỗi',
        text: locale === 'en'? 'Failed to add product to cart' : 'Thêm sản phẩm vào giỏ hàng thất bại',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  }
}
