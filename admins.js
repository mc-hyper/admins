const modal = document.getElementById('application-modal');
const openBtn = document.getElementById('open-modal-btn');
const closeBtn = document.getElementById('close-modal-btn');
const form = document.getElementById('discordAppForm');
const messageBox = document.getElementById('form-message');
const submitBtn = form.querySelector('button[type="submit"]');

// Открыть окно
openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Закрыть окно крестиком
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрыть окно при клике на затемнение (фон)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Обработка отправки формы
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const position = document.getElementById('position').value;
  const mcUser = document.getElementById('mc-username').value;
  const discordUser = document.getElementById('discord').value;
  const experience = document.getElementById('experience').value;
  const webhookUrl = document.getElementById('webhook-url').value;

  // Проверка ссылки
  if (!webhookUrl || webhookUrl === 'https://discordapp.com/api/webhooks/1541993157850308749/PZ5yuOxy6VZzHzonyMzXp7y_QLGklnZvp0VkopCit9hpjQlPVGImaveMgan5rdOkyJQc') {
    messageBox.textContent = '❌ Ошибка: не настроена ссылка на Discord!';
    messageBox.className = 'form-message error';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';

  const payload = {
    "embeds": [
      {
        "title": "📬 НОВАЯ ЗАЯВКА НА СЕРВЕР HYPER",
        "color": 5793266,
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

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      messageBox.textContent = '✅ Заявка успешно отправлена! Администрация скоро свяжется с тобой.';
      messageBox.className = 'form-message success';
      form.reset();
      
      // Через 2 секунды закрываем окно
      setTimeout(() => {
        modal.style.display = 'none';
        messageBox.textContent = '';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
      }, 2000);
    } else {
      throw new Error('Ошибка сети');
    }
  } catch (error) {
    console.error(error);
    messageBox.textContent = '❌ Произошла ошибка. Попробуй позже.';
    messageBox.className = 'form-message error';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить заявку';
  }
});
