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
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Reload the page after user clicks "OK"
        }
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

document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('form[data-product-id]');
    
    forms.forEach(form => {
        const decrementButton = form.querySelector('.quantity-decrement');
        const incrementButton = form.querySelector('.quantity-increment');
        const quantityInput = form.querySelector('.quantity-input');
        let previousValue = quantityInput.value;
        
        decrementButton.addEventListener('click', function() {
            event.preventDefault();
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
                form.submit();
            } else {
              swal.fire({
                title: locale === 'en'? 'Error' : 'Lỗi',
                text: locale === 'en'? 'Minimum product quantity is 1' : 'Số lượng tối thiểu của một sản phẩm trong giỏ hàng là 1',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
        });
        
        incrementButton.addEventListener('click', function() {
            event.preventDefault();
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
            if(quantityInput.value >= 51) {
              quantityInput.value = 50;
              swal.fire({
                title: locale === 'en'? 'Error' : 'Lỗi',
                text: locale === 'en'? 'Maximum product quantity is 50' : 'Số lượng tối đa của một món ăn trong giỏ hàng là 50',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              form.submit();
            }
        });

        quantityInput.addEventListener('input', function(event) {
          event.preventDefault();

          let currentQuantity = parseInt(quantityInput.value);

          if (isNaN(currentQuantity) || currentQuantity < 1 || currentQuantity > 50) {
            swal.fire({
              title: locale === 'en' ? 'Error' : 'Lỗi',
              text: locale === 'en' ? 'Minimum product quantity is 1 and maximum is 50' : 'Số lượng của một sản phẩm trong giỏ hàng tối thiểu là 1 và tối đa là 50',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            quantityInput.value = previousValue;
          } else {
            form.submit();
          }
        });
    });
});
