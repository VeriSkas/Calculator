export function createErrorNotificationHandler (errorMessage) {
  const wrapper = document.querySelector('.wrapper');
  const errorNotification = document.createElement('div');

  errorNotification.className ='error_notification';
  errorNotification.innerText = errorMessage;
  wrapper.append(errorNotification);

  const timeout = setTimeout(() => {
    errorNotification.className ='error_notification hide';
    clearTimeout(timeout);
  }, 5000)
}
