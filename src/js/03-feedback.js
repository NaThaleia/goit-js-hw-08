import throttle from 'lodash.throttle';

// Это согласно ТЗ: Пусть ключом для хранилища будет строка "feedback-form-state"
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('submit', toCleanForm);
formRef.addEventListener('input', throttle(putForm, 500));

function putForm() {
  const formData = new FormData(formRef);
  let userForm = {};
  formData.forEach((value, name) => (userForm[name] = value.trim()));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userForm));
}

getForm();
function getForm() {
  let formData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (formData) {
    formData = JSON.parse(formData);
    Object.entries(formData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

function toCleanForm(evt) {
  evt.preventDefault();
  const inputName = formRef.email.value;
  const inputMessage = formRef.message.value;
  if (inputName && inputMessage !== '') {
    let userForm = localStorage.getItem(LOCAL_STORAGE_KEY);
    userForm = JSON.parse(userForm);
    console.log('Submit', userForm);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    evt.currentTarget.reset();
    return;
  }
}
