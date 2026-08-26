  <script>
  const form = document.getElementById('discordAppForm');
  const messageBox = document.getElementById('form-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const position = document.getElementById('position').value;
    const mcUser = document.getElementById('mc-username').value;
    const discordUser = document.getElementById('discord').value;
    const experience = document.getElementById('experience').value;
    const webhookUrl = document.getElementById('webhook-url').value;

    // Формируем сообщение для Discord
    const payload = {
      "embeds": [
        {
          "title": "📬 НОВАЯ ЗАЯВКА НА СЕРВЕР HYPER",
          "color": 5793266, // Приятный сине-зеленый цвет
          "fields": [
            { "name": "👤 Игрок", "value": mcUser, "inline": true },
            { "name": "🎮 Должность", "value": position, "inline": true },
            { "name": "💬 Discord", "value": discordUser, "inline": false },
            { "name": "📝 Опыт", "value": experience || "Нет опыта", "inline": false }
          ],
          "footer": { "text": "Сервер HYPER | Minecraft" },
          "timestamp": new Date().toISOString()
        }
      ]
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        messageBox.textContent = '✅ Заявка успешно отправлена! Администрация скоро свяжется с тобой.';
        messageBox.className = 'form-message success';
        form.reset();
      } else {
        throw new Error('Ошибка отправки');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      messageBox.textContent = '❌ Произошла ошибка. Попробуй позже или напиши админам.';
      messageBox.className = 'form-message error';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
    });
  });
</script>

<!-- JS СКРИПТ (для анимации окна) -->
  <script>
    const modal = document.getElementById('application-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.querySelector('.close-btn');

    // Открыть окно
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    });

    // Закрыть окно крестиком
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });

    // Закрыть окно при клике на фон
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });

    // Обработка формы (заглушка)
    document.getElementById('application-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-message');
      msg.textContent = 'Заявка отправлена! Мы свяжемся с вами в Discord.';
      msg.className = 'form-message success';
      setTimeout(() => {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
        document.getElementById('application-form').reset();
        msg.textContent = '';
      }, 2000);
    });
  </script>