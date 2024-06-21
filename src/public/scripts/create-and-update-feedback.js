document.addEventListener('DOMContentLoaded', function () {
  const starContainers = document.querySelectorAll('.star-rating-display');

  starContainers.forEach(container => {
    const rating = parseInt(container.getAttribute('data-rating'), 10);
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.classList.add('fas', 'fa-star');
      if (i <= rating) {
        star.style.color = '#FFD700'; // Filled star color
      } else {
        star.style.color = '#E1E6F6'; // Empty star color
      }
      container.appendChild(star);
    }
  });
});

const openCreateFeedbackModal = (productId) => {
  const createFeedbackModal = new bootstrap.Modal(document.getElementById('createFeedbackModal'));
  const productIdField = document.getElementById('create-feedback-product-id');
  productIdField.value = productId;
  createFeedbackModal.show();
};

document.getElementById('create-feedback-image-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('create-feedback-image-preview').src = e.target.result;
      document.getElementById('create-feedback-image-preview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('createFeedbackForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('create-feedback-star-error').textContent = '';
  document.getElementById('create-feedback-image-error').textContent = '';
  document.getElementById('create-feedback-content-error').textContent = '';

  const imageFile = document.getElementById('create-feedback-image-input').files[0];

  try {
    if(imageFile){
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadImageResponse = await fetch('/file', {
        method: 'POST',
        body: formData
      });
      const result = await uploadImageResponse.json();

      if (result.url) {
        document.getElementById('create-feedback-image-url').value = result.url;
      } else {
        swal.fire({
          title: locale === 'en' ? 'Error' : 'Lỗi',
          text: locale === 'en' ? 'Error while uploading image. Please try again!' : 'Có lỗi xảy ra trong quá trình upload ảnh, hãy thử lại!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }

    // Get the selected star rating value
    const starRating = document.querySelector('input[name="create-feedback-star"]:checked').value;

    const data = {
      star: parseInt(starRating),
      image: document.getElementById('create-feedback-image-url').value,
      content: document.getElementById('create-feedback-content').value,
      productId: parseInt(document.getElementById('create-feedback-product-id').value),
    };

    const response = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
        for (const [key, value] of Object.entries(errorData.errors)) {
          document.getElementById(`create-feedback-${key}-error`).textContent = value[0];
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const confirmResult = await swal.fire({
        title: locale === 'en' ? 'Create feedback successfully!' : 'Tạo đánh giá mới thành công!',
        icon: 'success',
        confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
      });
      if(confirmResult.isConfirmed) {
        location.reload();
      }
    }
  } catch (error) {
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text: locale === 'en' ? 'An error occurred. Please try again.'
          : 'Có lỗi xảy ra, vui lòng thử lại',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
});

const openUpdateFeedbackModal = (id, star, image, content) => {
  const updateFeedbackModal = new bootstrap.Modal(document.getElementById('updateFeedbackModal'));
  const feedbackIdField = document.getElementById('update-feedback-feedback-id');
  const feedbackImageField = document.getElementById('update-feedback-image-url');
  const imagePreview = document.getElementById('update-feedback-image-preview');
  const feedbackContentField = document.getElementById('update-feedback-content');

  feedbackIdField.value = id;
  feedbackContentField.value = content;
  imagePreview.src = image;
  feedbackImageField.value = image;

  // Clear previously checked star rating
  document.querySelectorAll('input[name="update-feedback-star"]').forEach(input => {
    input.checked = false;
  });

  // Set the selected star rating value
  document.querySelector(`input[name="update-feedback-star"][value="${star}"]`).checked = true;

  updateFeedbackModal.show();
};


document.getElementById('update-feedback-image-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('update-feedback-image-preview').src = e.target.result;
      document.getElementById('update-feedback-image-preview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('updateFeedbackForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('update-feedback-star-error').textContent = '';
  document.getElementById('update-feedback-image-error').textContent = '';
  document.getElementById('update-feedback-content-error').textContent = '';

  const imageFile = document.getElementById('update-feedback-image-input').files[0];

  try {
    if(imageFile){
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadImageResponse = await fetch('/file', {
        method: 'POST',
        body: formData
      });
      const result = await uploadImageResponse.json();

      if (result.url) {
        document.getElementById('update-feedback-image-url').value = result.url;
      } else {
        swal.fire({
          title: locale === 'en' ? 'Error' : 'Lỗi',
          text: locale === 'en' ? 'Error while uploading image. Please try again!' : 'Có lỗi xảy ra trong quá trình upload ảnh, hãy thử lại!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }

    // Get the selected star rating value
    const starRating = document.querySelector('input[name="update-feedback-star"]:checked').value;

    const data = {
      star: parseInt(starRating),
      image: document.getElementById('update-feedback-image-url').value,
      content: document.getElementById('update-feedback-content').value,
      feedbackId: parseInt(document.getElementById('update-feedback-feedback-id').value),
    };

    const response = await fetch(`/feedback`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
        for (const [key, value] of Object.entries(errorData.errors)) {
          document.getElementById(`update-feedback-${key}-error`).textContent = value[0];
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const confirmResult = await swal.fire({
        title: locale === 'en' ? 'Update feedback successfully!' : 'Cập nhật đánh giá thành công!',
        icon: 'success',
        confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
      });
      if(confirmResult.isConfirmed) {
        location.reload();
      }
    }
  } catch (error) {
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text: locale === 'en' ? 'An error occurred. Please try again.'
          : 'Có lỗi xảy ra, vui lòng thử lại',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
});
