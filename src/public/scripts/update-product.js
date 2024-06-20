const locale = getCookie('locale');

document.getElementById('image-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('image-preview').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('product-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  const result = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update product' : 'Xác nhận cập nhật sản phẩm?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });
  
  if (result.isConfirmed) {
    const imageInput = document.getElementById('image-input');
    const imageFile = imageInput.files[0];
    
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch('/file', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.url) {
          document.getElementById('image-url').value = result.url;
          event.target.submit(); // Proceed with the form submission
        } else {
          swal.fire({
            title: locale === 'en' ? 'Error' : 'Lỗi',
            text: locale === 'en' ? 'Error while uploading image. Please try again!' : 'Có lỗi xảy ra trong quá trình upload ảnh, hãy thử lại!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        swal.fire({
          title: locale === 'en' ? 'Error' : 'Lỗi',
          text: locale === 'en' ? 'Error while uploading image. Please try again!' : 'Có lỗi xảy ra trong quá trình upload ảnh, hãy thử lại!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      event.target.submit(); // Submit the form if no image file is provided
    }
  }
});
