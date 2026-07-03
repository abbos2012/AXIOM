// Навигация
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Калькулятор ROI
function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value);
    const returnVal = parseFloat(document.getElementById('return').value);
    
    if (!investment || !returnVal) {
        alert('Заполните все поля!');
        return;
    }
    
    const roi = ((returnVal - investment) / investment) * 100;
    const profit = returnVal - investment;
    
    document.getElementById('roi-result').innerHTML = `
        <strong>ROI:</strong> ${roi.toFixed(2)}%<br>
        <strong>Прибыль:</strong> ${profit.toLocaleString()} ₽<br>
        ${roi > 0 ? '✅ Инвестиция выгодна!' : ' Инвестиция убыточна'}
    `;
}

// Точка безубыточности
function calculateBreakeven() {
    const fixed = parseFloat(document.getElementById('fixed-costs').value);
    const price = parseFloat(document.getElementById('price').value);
    const variable = parseFloat(document.getElementById('variable-costs').value);
    
    if (!fixed || !price || !variable) {
        alert('Заполните все поля!');
        return;
    }
    
    const breakeven = fixed / (price - variable);
    const revenue = breakeven * price;
    
    document.getElementById('breakeven-result').innerHTML = `
        <strong>Точка безубыточности:</strong> ${Math.ceil(breakeven)} единиц<br>
        <strong>Выручка:</strong> ${revenue.toLocaleString()} ₽<br>
        Нужно продать минимум ${Math.ceil(breakeven)} товаров для выхода в ноль
    `;
}

// Калькулятор маржи
function calculateMargin() {
    const cost = parseFloat(document.getElementById('cost').value);
    const price = parseFloat(document.getElementById('selling-price').value);
    
    if (!cost || !price) {
        alert('Заполните все поля!');
        return;
    }
    
    const margin = ((price - cost) / price) * 100;
    const markup = ((price - cost) / cost) * 100;
    const profit = price - cost;
    
    document.getElementById('margin-result').innerHTML = `
        <strong>Маржа:</strong> ${margin.toFixed(2)}%<br>
        <strong>Наценка:</strong> ${markup.toFixed(2)}%<br>
        <strong>Прибыль с единицы:</strong> ${profit.toLocaleString()} ₽
    `;
}

// Генератор бизнес-идей
const businessIdeas = [
    "🚀 SaaS-платформа для автоматизации малого бизнеса",
    "📱 Мобильное приложение для доставки локальных продуктов",
    "🎓 Онлайн-школа с AI-наставником",
    " Сервис умного дома для арендодателей",
    "💼 Платформа для фрилансеров с escrow-платежами",
    "🌱 Маркетплейс экологичных товаров",
    "🎮 Геймификация фитнеса с криптовалютными наградами",
    "📊 AI-аналитика для интернет-магазинов",
    "🚗 Каршеринг электромобилей в регионах",
    "🍕 Подписка на готовые наборы для готовки",
    " Платформа для корпоративного тимбилдинга",
    " Телемедицина с персональным врачом",
    "📚 Библиотека подписки на бизнес-книги",
    "🎨 Маркетплейс цифрового искусства с NFT",
    " Платформа для удаленной работы с VR-офисами"
];

function generateIdea() {
    const randomIdea = businessIdeas[Math.floor(Math.random() * businessIdeas.length)];
    document.getElementById('idea-result').innerHTML = `
        <strong>💡 Ваша бизнес-идея:</strong><br><br>
        ${randomIdea}
    `;
}

// Анализ конкурентов
let competitors = JSON.parse(localStorage.getItem('competitors')) || [];

function addCompetitor() {
    const name = document.getElementById('competitor-name').value;
    const price = document.getElementById('competitor-price').value;
    const quality = document.getElementById('competitor-quality').value;
    
    if (!name || !price || !quality) {
        alert('Заполните все поля!');
        return;
    }
    
    competitors.push({
        id: Date.now(),
        name,
        price: parseFloat(price),
        quality: parseFloat(quality)
    });
    
    localStorage.setItem('competitors', JSON.stringify(competitors));
    renderCompetitors();
    
    document.getElementById('competitor-name').value = '';
    document.getElementById('competitor-price').value = '';
    document.getElementById('competitor-quality').value = '';
}

function renderCompetitors() {
    const list = document.getElementById('competitors-list');
    list.innerHTML = '';
    
    competitors.forEach(comp => {
        const card = document.createElement('div');
        card.className = 'competitor-card';
        card.innerHTML = `
            <h3>${comp.name}</h3>
            <p>💰 Цена: ${comp.price} ₽</p>
            <p>⭐ Качество: ${comp.quality}/10</p>
            <p>📊 Соотношение: ${(comp.quality / comp.price * 100).toFixed(2)}</p>
            <button class="neon-btn" style="margin-top: 10px; padding: 8px 15px;" onclick="deleteCompetitor(${comp.id})">Удалить</button>
        `;
        list.appendChild(card);
    });
}

function deleteCompetitor(id) {
    competitors = competitors.filter(c => c.id !== id);
    localStorage.setItem('competitors', JSON.stringify(competitors));
    renderCompetitors();
}

// Бизнес-цели
let goals = JSON.parse(localStorage.getItem('goals')) || [];

function addGoal() {
    const text = document.getElementById('goal-text').value;
    const date = document.getElementById('goal-date').value;
    
    if (!text || !date) {
        alert('Заполните все поля!');
        return;
    }
    
    goals.push({
        id: Date.now(),
        text,
        date,
        completed: false
    });
    
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
    
    document.getElementById('goal-text').value = '';
    document.getElementById('goal-date').value = '';
}

function renderGoals() {
    const list = document.getElementById('goals-list');
    list.innerHTML = '';
    
    goals.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    goals.forEach(goal => {
        const item = document.createElement('div');
        item.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="goal-text">${goal.text}</div>
            <div class="goal-date">📅 ${new Date(goal.date).toLocaleDateString('ru-RU')}</div>
            <div class="goal-actions">
                <button class="goal-btn" onclick="toggleGoal(${goal.id})">
                    ${goal.completed ? '↩️' : '✅'}
                </button>
                <button class="goal-btn delete" onclick="deleteGoal(${goal.id})">🗑️</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function toggleGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals();
    }
}

function deleteGoal(id) {
    goals = goals.filter(g => g.id !== id);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
}

// Инициализация
renderCompetitors();
renderGoals();

// Анимация чисел на дашборде
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;
    
    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        obj.innerHTML = value.toLocaleString() + (id === 'conversion' ? '%' : id === 'clients' ? '' : ' ₽');
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// Запуск анимации при загрузке
window.onload = function() {
    animateValue('revenue', 0, 1250000, 2000);
    animateValue('profit', 0, 385000, 2000);
    animateValue('clients', 0, 1847, 2000);
    animateValue('conversion', 0, 12, 2000);
};