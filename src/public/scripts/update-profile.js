const locale = getCookie('locale');
const openUpdateAccountModal = () => {
  const updateAccountModal = new bootstrap.Modal(document.getElementById('updateAccountModal'));
  updateAccountModal.show();
}

const openUpdateAvatarModal = () => {
  const updateAvatarModal = new bootstrap.Modal(document.getElementById('updateAvatarModal'));
  updateAvatarModal.show();
}

const openUpdatePersonalInfoModal = () => {
  const updatePersonalInfoModal = new bootstrap.Modal(document.getElementById('updatePersonalInfoModal'));
  updatePersonalInfoModal.show();
}

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

document.getElementById('updateAccountForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const confirmUpdate = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update account information' : 'Xác nhận cập nhật thông tin tài khoản?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmUpdate.isConfirmed) {
      // Clear previous error messages
    document.getElementById('update-account-userName-error').textContent = '';
    document.getElementById('update-account-email-error').textContent = '';
    document.getElementById('update-account-password-error').textContent = '';

    let data = {
      userName: document.getElementById('update-account-userName').value,
      email: document.getElementById('update-account-email').value,
      password: document.getElementById('update-account-password').value,
    };

    try {
      const response = await fetch(`/user/profile/account`, {
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
            document.getElementById(`update-account-${key}-error`).textContent = value[0];
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Update account information successfully!' : 'Cập nhật thông tin tài khoản thành công!',
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

document.getElementById('updateAvatarForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  const result = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update avatar' : 'Xác nhận cập nhật ảnh đại diện?',
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
          const data = { avatar: result.url};
          const response = await fetch(`/user/profile/avatar`, {
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
              title: locale === 'en' ? 'Update avatar successfully!' : 'Cập nhật ảnh đại diện thành công!',
              icon: 'success',
              confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
            });
            if(confirmResult.isConfirmed) {
              location.reload();
            }
          }
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
      const confirmResult = await swal.fire({
        title: locale === 'en' ? 'Update avatar successfully!' : 'Cập nhật ảnh đại diện thành công!',
        icon: 'success',
        confirmButtonText: locale === 'en' ? 'Close' : 'Đóng',
      });
      if(confirmResult.isConfirmed) {
        location.reload();
      }
    }
  }
});

document.getElementById('updatePersonalInfoForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const confirmUpdate = await swal.fire({
    title: locale === 'en' ? 'Confirm' : 'Xác nhận',
    text: locale === 'en' ? 'Confirm update personal information' : 'Xác nhận cập nhật thông tin cá nhân?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: locale === 'en' ? 'Yes' : 'Có',
    cancelButtonText: locale === 'en' ? 'No' : 'Không'
  });

  if(confirmUpdate.isConfirmed) {
      // Clear previous error messages
    document.getElementById('update-updatePersonalInfo-fullName-error').textContent = '';
    document.getElementById('update-updatePersonalInfo-gender-error').textContent = '';
    document.getElementById('update-updatePersonalInfo-address-error').textContent = '';
    document.getElementById('update-updatePersonalInfo-phoneNumber-error').textContent = '';
    document.getElementById('update-updatePersonalInfo-dob-error').textContent = '';

    let data = {
      fullName: document.getElementById('update-updatePersonalInfo-fullName').value,
      gender: document.getElementById('update-updatePersonalInfo-gender').value,
      address: document.getElementById('update-updatePersonalInfo-address').value,
      phoneNumber: document.getElementById('update-updatePersonalInfo-phoneNumber').value,
      dob: document.getElementById('update-updatePersonalInfo-dob').value,
    };

    try {
      const response = await fetch(`/user/profile/personal-info`, {
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
            document.getElementById(`update-updatePersonalInfo-${key}-error`).textContent = value[0];
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const confirmResult = await swal.fire({
          title: locale === 'en' ? 'Update personal information successfully!' : 'Cập nhật thông tin cá nhân thành công!',
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
