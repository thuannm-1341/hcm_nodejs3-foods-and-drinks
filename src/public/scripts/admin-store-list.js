const locale = getCookie('locale');
const openCreateStoreModal = () => {
  const createStoreModal = new bootstrap.Modal(document.getElementById('createStoreModal'));
  createStoreModal.show();
}

const closeCreateStoreModal = () => {
  const createStoreModal = bootstrap.Modal.getInstance(document.getElementById('createStoreModal'));
  createStoreModal.hide();
}

const openUpdateStoreModal = (id, name, address, phoneNumber) => {
  const createStoreModal = new bootstrap.Modal(document.getElementById('updateStoreModal'));
  const updateStoreIdInput = document.getElementById('update-store-id');
  const updateStoreNameInput = document.getElementById('update-store-name');
  const updateStoreAddressInput = document.getElementById('update-store-address');
  const updateStorePhoneNumberInput = document.getElementById('update-store-phone');
  updateStoreIdInput.value = id;
  updateStoreNameInput.value = name;
  updateStoreAddressInput.value = address;
  updateStorePhoneNumberInput.value = phoneNumber;
  document.getElementById('display-store-id').innerText = id;
  createStoreModal.show();
}

document.getElementById('createStoreForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('create-store-name-error').textContent = '';
  document.getElementById('create-store-address-error').textContent = '';
  document.getElementById('create-store-phoneNumber-error').textContent = '';

  const data = {
    name: document.getElementById('create-store-name').value,
    address: document.getElementById('create-store-address').value,
    phoneNumber: document.getElementById('create-store-phone').value
  };

  try {
    const response = await fetch(`/admin/store`, {
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
          document.getElementById(`create-store-${key}-error`).textContent = value[0];
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const confirmResult = await swal.fire({
        title: locale === 'en' ? 'Create new store successfully!' : 'Tạo cửa hàng mới thành công!',
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

document.getElementById('updateStoreForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const confirmUpdate = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update store' : 'Xác nhận cập nhật cửa hàng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmUpdate.isConfirmed) {
      // Clear previous error messages
    document.getElementById('update-store-name-error').textContent = '';
    document.getElementById('update-store-address-error').textContent = '';
    document.getElementById('update-store-phoneNumber-error').textContent = '';

    const data = {
      id: document.getElementById('update-store-id').value,
      name: document.getElementById('update-store-name').value,
      address: document.getElementById('update-store-address').value,
      phoneNumber: document.getElementById('update-store-phone').value
    };

    try {
      const response = await fetch(`/admin/store`, {
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
            document.getElementById(`update-store-${key}-error`).textContent = value[0];
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Update store successfully!' : 'Cập nhật thông tin cửa hàng thành công!',
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

const deleteStore = async () => {
  const confirmDelete = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm delete store' : 'Xác nhận xóa cửa hàng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmDelete.isConfirmed) {
    try {
      const id = document.getElementById('update-store-id').value;
      const response = await fetch(`/admin/store/${id}`, {
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
              ? 'The store that received the order cannot be deleted'
              : 'Không thể xóa cửa hàng đã nhận đơn hàng',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Delete store successfully!' : 'Xóa cửa hàng thành công!',
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
