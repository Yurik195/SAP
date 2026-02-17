// Получаем все элементы со звуками
const soundItems = document.querySelectorAll('.sound-item');

// Объект для хранения аудио элементов
const audioCache = {};

// Инициализация аудио элементов
soundItems.forEach(item => {
    const soundFile = item.dataset.sound;
    if (!audioCache[soundFile]) {
        audioCache[soundFile] = new Audio(soundFile);
        audioCache[soundFile].preload = 'auto';
    }
});

// Функция для воспроизведения звука
function playSound(soundFile, element) {
    const audio = audioCache[soundFile];
    
    // Останавливаем и сбрасываем звук, если он уже играет
    audio.pause();
    audio.currentTime = 0;
    
    // Воспроизводим звук
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения:', error);
    });
    
    // Добавляем анимацию
    element.classList.add('playing');
    setTimeout(() => {
        element.classList.remove('playing');
    }, 300);
}

// Добавляем обработчики событий для каждого элемента
soundItems.forEach(item => {
    const soundFile = item.dataset.sound;
    
    // Обработчик клика мышью
    item.addEventListener('click', () => {
        playSound(soundFile, item);
    });
    
    // Обработчик касания для мобильных устройств
    item.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Предотвращаем двойное срабатывание
        playSound(soundFile, item);
    });
});
