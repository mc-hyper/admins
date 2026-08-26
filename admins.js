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
