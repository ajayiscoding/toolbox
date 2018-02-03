/*
*
* data-form – атрибут валидатора форм
  data-form-type – тип поля
  data-form-id – id поля форма, с помощью него можно привязывать контейнер для ошибок например
*
*
* */

/*  */
/**/
const FIELD_ID_ATTRIBUTE = 'formId';
const VALIDATOR_ATTRIBUTE = 'formValidator';

class Field {
  constructor(options) {
    this.node = options.el;
    this.id = this.getId()
  }
  getId() {
    return this.node.dataset[FIELD_ID_ATTRIBUTE]
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const qs = (s) => document.querySelector(s);

  const EMAIL_REGEX = /\S+@\S+.\S+/;

  const isEmailValid = email => Promise.resolve(EMAIL_REGEX.test(email));
  const formNode = qs('[data-form]');
  const fieldNodes = Array.prototype.slice.call(formNode.querySelectorAll('[data-form-type]'));


  formNode.addEventListener('submit', (e) => {
    fieldNodes.forEach(() => {

    });
  });

  window.isEmailValid = isEmailValid;
});
