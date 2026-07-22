export function createNotificationService(target = null) {
  return {
    success: (message) => render(target, message),
    info: (message) => render(target, message),
    warning: (message) => render(target, message),
    error: (message) => render(target, message),
  };
}

function render(target, message) {
  if (target) target.textContent = message;
}
