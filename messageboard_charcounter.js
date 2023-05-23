const titleTextArea = document.querySelector('#post-title');
const textTextArea = document.querySelector('#post-text');
const titleCharCount = document.querySelector('#title-char-count');
const textCharCount = document.querySelector('#text-char-count');

titleTextArea.addEventListener('input', () => {
  const charCount = titleTextArea.value.length;
  titleCharCount.textContent = `${charCount}/50`;

  if (charCount >= 50) {
    titleTextArea.value = titleTextArea.value.substring(0, 49);
  } else {
    titleCharCount.style.color = rgba(200, 200, 200, 0.5);
  }
});

textTextArea.addEventListener('input', () => {
  const charCount = textTextArea.value.length;
  textCharCount.textContent = `${charCount}/300`;

  if (charCount >= 300) {
    textTextArea.value = textTextArea.value.substring(0, 299);
  } else {
    textCharCount.style.color = rgba(200, 200, 200, 0.5);
  }
});