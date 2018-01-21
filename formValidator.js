function FormValidator(options) {
  var DATA_ERROR_ATTRIBUTE = 'flFormError';
  var DATA_FIELD_ATTRIBUTE = 'flFormField';
  var DATA_FIELD_REQUIRED = 'flFormRequired'; // обязательное или нет
  var DATA_ERROR_CLASS = 'flFormInvalidClass';
  var DEFAULT_INVALID_CLASS = 'is-invalid';

  var $form = options.el; // el
  var onSuccessHandler = options.onSuccessHandler;
  var $fields = $form.querySelectorAll('[data-fl-form-field]');
  $fields = Array.prototype.slice.call($fields);

  var $errors = $form.querySelectorAll('[data-fl-form-error]');
  $errors = Array.prototype.slice.call($errors);

  var $submitButton = $form.querySelector('[data-fl-form-submit]');
  var hasSubmitted = false;


  function isValidEmail(email) {
    return /\S+@\S+.\S+/.test(email);
  }

  function getFieldValue(field) {
    var type = field.dataset && field.dataset[DATA_FIELD_ATTRIBUTE];
    var value = null;

    switch (type) {
      case 'text':
      case 'email':
        value = field.value && field.value.trim();
        break;
      case 'checkbox':
        value = field.checked;
        break;
    }

    return value;
  }

  // undefined, 'false', 'true', ''
  function isFieldRequired(field) {
    var required = field.dataset && field.dataset[DATA_FIELD_REQUIRED];

    return (required === '' || required === 'true');
  }

  // парсить по ноде
  function isFieldValid(field) {
    var type =  field.dataset && field.dataset[DATA_FIELD_ATTRIBUTE];
    var isValid = true;
    var regex = null;

    switch (type) {
      case 'text':
        var val = field.value && field.value.trim();

        isValid = (regex) ? regex.test(val) : val.length > 0;
        break;
      case 'email':
        isValid = isValidEmail(field.value && field.value.trim());
        break;
      case 'checkbox':
        isValid = field.checked;
        break;
      default:
        var validationHandler = options.customValidators && options.customValidators[type];

        isValid = validationHandler(field.value);
        break;
    }
    // debugger

    return isValid;
  }

  function showError(name) {
    $errors.forEach(function (el) {
      if (el.dataset[DATA_ERROR_ATTRIBUTE] === name && el.style.display === 'none') {
        el.style.display = 'block';

        return;
      }
    });
  }

  function hideError(name) {
    $errors.forEach(function (el) {
      if (el.dataset[DATA_ERROR_ATTRIBUTE] === name && el.style.display === 'block') {
        el.style.display = 'none';

        return;
      }
    });
  }

  function hideErrors() {
    $errors.forEach(function (el) {
      el.style.display = 'none';
    });
  }

  // @return {email: '', name: '', data: {}}
  function getFormData() {
    var formData = {};

    $fields.forEach(function ($field) {
      var name = $field.getAttribute('name');

      switch (name) {
        case 'name':
        case  'email':
          formData[name] = $field.value.trim();
          break;
        default:
          if (!formData.data) {
            formData.data = {};
          }

          formData.data[name] = String(getFieldValue($field));
          break;
      }
    });

    return formData;
  }

  function isValidForm() {
    var validationArray = [];

    $fields.forEach(function ($field) {
      var isValid = isFieldValid($field);

      validationArray.push(isValid);
    });

    return validationArray.every(function (v) {return v;});
  }

  function handler(e) {
    var el = e.target;

    if (!hasSubmitted || !el.dataset[DATA_FIELD_ATTRIBUTE]) {
      return;
    }

    var name = el.getAttribute('name');
    var validForm = isValidForm();
    var invalidClass = $form.dataset[DATA_ERROR_CLASS] || DEFAULT_INVALID_CLASS;

    if (isFieldValid(el)) {
      hideError(name);
      el.classList.remove(invalidClass);
    }
    else {
      showError(name);
      el.classList.add(invalidClass);
    }

    if (!$submitButton.disabled && !validForm || $submitButton.disabled && validForm) {
      $submitButton.disabled = !$submitButton.disabled;
    }
  }

  $form.addEventListener('input', handler, false);

  $form.addEventListener('change', handler, false);

  $form.addEventListener('submit', function (e) {
    e.preventDefault();

    var validForm = isValidForm();
    var invalidClass = $form.dataset[DATA_ERROR_CLASS];
    hasSubmitted = true;

    $fields.forEach(function (field) {
      var name = field.getAttribute('name');
      var isValid = isFieldValid(field);

      if (!isValid) {
        showError(name);
        field.classList.add(invalidClass);
      }
    });

    if (!$submitButton.disabled && !validForm || $submitButton.disabled && validForm) {
      $submitButton.disabled = !validForm;
    }

    if (validForm) {
      var formData = getFormData();

      $form.removeEventListener('input', handler, false);
      $form.removeEventListener('change', handler, false);


      if (onSuccessHandler && typeof onSuccessHandler === 'function') {
        onSuccessHandler(formData);
      }
    }
  });

  // прячем ошибки
  hideErrors();
}
