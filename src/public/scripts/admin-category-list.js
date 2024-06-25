const locale = getCookie('locale');
const openCreateCategoryModal = () => {
  const createCategoryModal = new bootstrap.Modal(document.getElementById('createCategoryModal'));
  createCategoryModal.show();
}

const openUpdateCategoryModal = (id, name) => {
  const updateCategoryModal = new bootstrap.Modal(document.getElementById('updateCategoryModal'));
  const updateCategoryIdInput = document.getElementById('update-category-id');
  const updateCategoryNameInput = document.getElementById('update-category-name');
  updateCategoryIdInput.value = id;
  updateCategoryNameInput.value = name;
  document.getElementById('display-category-id').innerText = id;
  updateCategoryModal.show();
}

document.getElementById('createCategoryForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('create-category-name-error').textContent = '';

  const data = {
    name: document.getElementById('create-category-name').value,
  };

  try {
    const response = await fetch(`/admin/category`, {
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
          document.getElementById(`create-category-${key}-error`).textContent = value[0];
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const confirmResult = await swal.fire({
        title: locale === 'en' ? 'Create new category successfully!' : 'Tạo phân loại mới thành công!',
        icon: 'success',
        confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
      });
      if(confirmResult.isConfirmed) {
        location.reload();
      }
    }
  } catch (error) {
    console.error('Error:', error);
    swal.fire({
      title: locale === 'en' ? 'Error' : 'Lỗi',
      text:
        locale === 'en'
          ? 'An error occurred. Please try again.'
          : 'Có lỗi xảy ra, vui lòng thử lại',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
});

document.getElementById('updateCategoryForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const confirmUpdate = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update category' : 'Xác nhận cập nhật phân loại này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmUpdate.isConfirmed) {
      // Clear previous error messages
    document.getElementById('update-category-name-error').textContent = '';

    const data = {
      id: document.getElementById('update-category-id').value,
      name: document.getElementById('update-category-name').value,
    };

    try {
      const response = await fetch(`/admin/category`, {
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
            document.getElementById(`update-category-${key}-error`).textContent = value[0];
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Update category successfully!' : 'Cập nhật thông tin phân loại thành công!',
          icon: 'success',
          confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
        });
        if(confirmResult.isConfirmed) {
          location.reload();
        }
      }
    } catch (error) {
      console.error('Error:', error);
      swal.fire({
        title: locale === 'en' ? 'Error' : 'Lỗi',
        text:
          locale === 'en'
            ? 'An error occurred. Please try again.'
            : 'Có lỗi xảy ra, vui lòng thử lại',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
});

const deleteCategory = async () => {
  const confirmDelete = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm delete category' : 'Xác nhận xóa phân loại này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmDelete.isConfirmed) {
    try {
      const id = document.getElementById('update-category-id').value;
      const response = await fetch(`/admin/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        swal.fire({
          title: locale === 'en' ? 'Error' : 'Lỗi',
          text:
            locale === 'en'
              ? 'Cannot delete category that already has products'
              : 'Không thể xóa phân loại đã có sản phẩm',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Delete category successfully!' : 'Xóa phân loại thành công!',
          icon: 'success',
          confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
        });
        if(confirmResult.isConfirmed) {
          location.reload();
        }
      }
    } catch (error) {
      console.error('Error:', error);
      swal.fire({
        title: locale === 'en' ? 'Error' : 'Lỗi',
        text:
          locale === 'en'
            ? 'An error occurred. Please try again.'
            : 'Có lỗi xảy ra, vui lòng thử lại',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
