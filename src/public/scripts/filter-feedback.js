function renderRating() {
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
}

document.addEventListener('DOMContentLoaded', function () {
  renderRating()
});

function renderFeedback(feedbacks) {
  const feedbackContainer = document.getElementById('product-feedback');
  feedbackContainer.innerHTML = '';
  feedbacks.forEach(feedback => {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-item';
    feedbackElement.innerHTML = `
      <div class="mt-2 border-bottom">
        <div class="row g-8 mb-2"> 
          <div class="col-md-8 d-flex align-items-center">
            <img src="${feedback.user.avatar ? feedback.user.avatar : '/images/sample-avatar.png'}"
              class="img-fluid rounded-circle" style="width: 50px; margin-right: 10px;" alt="User avatar">
            <div>
              <h5 class="card-title mb-0">
                ${feedback.user.fullName}
              </h5>
              <span class="star-rating-display" data-rating="${feedback.star}"></span>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <p class="card-text"><small class="text-muted">
                ${new Date(feedback.updatedAt).toLocaleString()}
              </small></p>
          </div>
        </div>
        <div class="row g-0 mb-2">
          <p class="card-text">${feedback.content ? feedback.content : ''}</p>
        </div>
        ${feedback.image ? `<img src="${feedback.image}"
          class="img-fluid rounded mb-2" style="width: 100px; margin-right: 10px;" alt="Feedback Image">` : ''}
      </div>
    `;
    feedbackContainer.appendChild(feedbackElement);
  });
}

function renderPagination(meta) {
  const paginationContainer = document.getElementById('pagination-controls');
  let paginationHTML = `
    <nav aria-label="Page navigation">
      <ul class="pagination">
  `;

  if (meta.hasPreviousPage) {
    paginationHTML += `
      <li class="page-item">
        <button type="button" class="page-link" data-page="${parseInt(meta.page) - 1}">
          ${locale === 'en' ? 'Previous' : 'Trang trước'}
        </button>
      </li>
    `;
  }

  for (let i = 1; i <= meta.pageCount; i++) {
    paginationHTML += `
      <li class="page-item ${parseInt(meta.page) === i ? 'active' : ''}">
        <button type="button" class="page-link" data-page="${i}">
          ${i}
        </button>
      </li>
    `;
  }

  if (meta.hasNextPage) {
    paginationHTML += `
      <li class="page-item">
        <button type="button" class="page-link" data-page="${parseInt(meta.page) + 1}">
          ${locale === 'en' ? 'Next' : 'Trang kế'}
        </button>
      </li>
    `;
  }

  paginationHTML += `
      </ul>
    </nav>
  `;

  paginationContainer.innerHTML = paginationHTML;

  // Add event listeners to pagination buttons
  const paginationButtons = paginationContainer.querySelectorAll('.page-link');
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('page').value = button.getAttribute('data-page');
      fetchAndRenderFeedback();
    });
  });
}

async function fetchAndRenderFeedback() {
  const starValue = document.getElementById('star').value;
  const data = {
    productId: document.getElementById('productId').value,
    sortField: document.getElementById('sortField').value,
    order: document.getElementById('order').value,
    star: starValue,
    haveImage: document.getElementById('haveImage').checked,
    haveContent: document.getElementById('haveContent').checked,
    page: document.getElementById('page').value,
  };

  const params = new URLSearchParams(data);

  const response = await fetch(`/feedback?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text:
        locale === 'en'
          ? 'Invalid input. Please try again!'
          : 'Có lỗi xảy ra, hãy thử lại!',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  } else {
    const data = await response.json();
    renderFeedback(data.feedbacks);
    renderPagination(data.meta);
    renderRating();
  }
}
