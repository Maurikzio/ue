document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.getElementById('modalOverlay');
  const openModalBtn = document.getElementById('openBtnModal');
  const closeModalBtn = document.getElementById('closeBtnModal');

  function openModal() {
    modalOverlay.classList.add('active');
    initFormValidation();
  }

  function closeModal() {
    document.getElementById('submitBtn').value = "Crear Proyecto";
    document.getElementById("project-form").reset();
    document.querySelectorAll('.field').forEach(function (field) {
      field.classList.remove('error');
    })
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('successMsg').classList.remove('show');
    modalOverlay.classList.remove('active');
  }

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (event) {
    if (event.target === this) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  })

  function initFormValidation() {
    const form = document.getElementById('project-form');
    const titleField = document.getElementById('title');
    const descriptionField = document.getElementById('description');
    const goalField = document.getElementById('goal');
    const durationField = document.getElementById('duration');
    const emailField = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');

    function validateField(input) {
      const isEmpty = input.value.trim() === '';
      const fieldContainer = input.closest('.field');
      fieldContainer.classList.toggle('error', isEmpty);
      return !isEmpty;
    }

    form.removeEventListener('submit', handleSubmit);

    const formFields = [titleField, descriptionField, goalField, durationField, emailField];

    async function handleSubmit(event) {
      event.preventDefault();

      const formFieldsValid = formFields.map(validateField);
      if (!formFieldsValid.every(field => !!field)) {
        return
      }
      submitBtn.disabled = true;
      submitBtn.value = "Creando..."

      try {
        await new Promise(function (resolve) {
          setTimeout(function () {
            resolve();
          }, 3000)
        });

        submitBtn.value = "Proyecto creado 🎉"
        document.getElementById('successMsg').classList.add('show');

        setTimeout(function () {
          closeModal();
        }, 3000);

      } catch (error) {
        console.error(error)
      }

    };

    form.addEventListener('submit', handleSubmit);

    formFields.forEach(field => {
      field.addEventListener('blur', function (event) {
        validateField(event.target);
      })
      field.addEventListener('input', function (event) {
        const fieldContainer = event.target.closest('.field');
        fieldContainer.classList.remove('error');
      })
    })
  }
})