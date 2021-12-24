import throttle from 'lodash.throttle';

// Это согласно ТЗ: Пусть ключом для хранилища будет строка "feedback-form-state"
const LOCAL_STORAGE_KEY = 'feedback-form-state';
// Слушаем форму
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', toCleanForm);
form.addEventListener('input', throttle(putForm, 500));

function putForm() {
  const formData = new FormData(form);
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
      form.elements[name].value = value;
    });
  }
}

function toCleanForm(evt) {
  evt.preventDefault();
  const inputName = form.email.value;
  const inputMessage = form.message.value;
  if (inputName && inputMessage !== '') {
    let userForm = localStorage.getItem(LOCAL_STORAGE_KEY);
    userForm = JSON.parse(userForm);
    console.log('Submit', userForm);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    evt.currentTarget.reset();
    return;
  }
  alert('Поля не могут быть пустыми!');
  return;
}
