export function createDebouncedRender(render, delayMs = 120, scheduler = globalThis) {
  let timer = 0;
  return (...args) => {
    scheduler.clearTimeout(timer);
    timer = scheduler.setTimeout(() => {
      timer = 0;
      render(...args);
    }, delayMs);
  };
}

export async function runButtonTask(button, task) {
  if (!button || button.disabled) return;
  const originalLabel = button.textContent;
  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  try {
    await task();
  } finally {
    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.textContent = originalLabel;
  }
}
