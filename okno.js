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
