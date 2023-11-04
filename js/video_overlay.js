elements = {
  ...elements,
  extensionToggle: document.querySelector('.extension-toggle'),
};

elements.extensionToggle.onclick = () => {
  const isShown = !!elements.extensionContainer.style.opacity;

  elements.extensionContainer.style.opacity = isShown ? null : '1';
  elements.extensionContainer.style.pointerEvents = isShown ? null : 'auto';
};
