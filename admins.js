document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('application-modal');
  const openBtn = document.getElementById('open-modal-btn');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('application-form');
  const messageEl = document.getElementById('form-message');

  // Открыть модалку
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  // Закрыть по кнопке ×
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      messageEl.textContent = '';
      messageEl.className = 'form-message';
    });
  }

  // Закрыть по клику вне окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      messageEl.textContent = '';
      messageEl.className = 'form-message';
    }
  });

  // Отправка заявки
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;

      // Блокируем кнопку и показываем статус
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';
      messageEl.textContent = '';
      messageEl.className = 'form-message';

      const payload = {
        role: form.elements['role'].value,
        mcNick: form.elements['mc-nick'].value,
        discord: form.elements['discord'].value,
        reason: form.elements['reason'].value,
      };

      // ВСТАВЬ СЮДА URL ОТ MAKE (hook.make.com) ИЛИ СВОЙ СЕРВЕР
      const webhookUrl = 'https://hook.make.com/https://discordapp.com/api/webhooks/1541993157850308749/PZ5yuOxy6VZzHzonyMzXp7y_QLGklnZvp0VkopCit9hpjQlPVGImaveMgan5rdOkyJQc';

      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          messageEl.textContent = 'Заявка успешно отправлена! Мы свяжемся с тобой.';
          messageEl.className = 'form-message success';
          form.reset();
        } else {
          throw new Error('Ошибка сервера');
        }
      } catch (err) {
        messageEl.textContent = 'Не удалось отправить заявку. Попробуй позже.';
        messageEl.className = 'form-message error';
      } finally {
        // Возвращаем кнопку в исходное состояние
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});