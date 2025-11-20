// --- ВАЖНО: Замените 'YOUR_IMGBB_API_KEY' на ваш реальный API Key от ImgBB ---
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY';

// --- Маппинг бейджей на классы ---
const badgeClassMap = {
    "CONTENT CREATOR": "badge-primary",
    "SHREDDED": "badge-purple",
    "Rice": "badge-orange",
    "Noob": "badge-pink",
    "VIP": "badge-purple"
};

// --- Маппинг стран на SVG ---
const countryFlagMap = {
    "Russia": '<rect width="5" height="1" y="0" fill="#fff"/><rect width="5" height="1" y="1" fill="#0039a6"/><rect width="5" height="1" y="2" fill="#d52b1e"/>',
    "Germany": '<rect width="5" height="1" y="0" fill="#000"/><rect width="5" height="1" y="1" fill="#dd0000"/><rect width="5" height="1" y="2" fill="#ffce00"/>',
    "USA": '<rect width="19" height="10" fill="#b22234"/><path d="M0,0h19v1H0z" fill="#fff"/><path d="M0,2h19v1H0z" fill="#fff"/><path d="M0,4h19v1H0z" fill="#fff"/><path d="M0,6h19v1H0z" fill="#fff"/><path d="M0,8h19v1H0z" fill="#fff"/><path d="M0,0h7v5H0z" fill="#3c3b6e"/><path d="M0,0l1,0l0,0l1,0l0,0l1,0l0,0l1,0l0,0l1,0l0,0l1,0l0,0l1,0l0,0l1,0l0,0z" fill="#fff"/>',
    "Turkey": '<rect width="5" height="3" fill="#e30a17"/><path d="M2.5,1.5A0.75,0.75 0 1,0 2.5,0.75 A0.75,0.75 0 1,0 2.5,1.5 Z" fill="#fff"/><path d="M2.7,1.5A0.75,0.75 0 1,0 2.7,0.75 A0.75,0.75 0 1,0 2.7,1.5 Z" fill="#e30a17"/>',
    "Indonesia": '<rect width="3" height="1" y="0" fill="#ce1126"/><rect width="3" height="1" y="1" fill="#fff"/>',
    "Ukraine": '<rect width="5" height="1.5" y="0" fill="#0057b7"/><rect width="5" height="1.5" y="1.5" fill="#ffd700"/>',
    "Nigeria": '<rect width="1" height="2" x="0" y="0" fill="#008751"/><rect width="1" height="2" x="1" y="0" fill="#fff"/><rect width="1" height="2" x="2" y="0" fill="#008751"/>',
    "China": '<rect width="30" height="20" fill="#de2910"/><path d="M5,5 L7,4 L6,6 L8,7 L5,7 Z" fill="#ffde00" transform="rotate(23.0769 5 5)"/><path d="M10,2 L11,3 L10,4 L11,5 L10,4 L9,5 L10,4 L9,3 Z" fill="#ffde00" transform="rotate(43.6364 10 2)"/><path d="M12,6 L13,7 L12,8 L13,9 L12,8 L11,9 L12,8 L11,7 Z" fill="#ffde00" transform="rotate(80 12 6)"/><path d="M12,10 L13,11 L12,12 L13,13 L12,12 L11,13 L12,12 L11,11 Z" fill="#ffde00" transform="rotate(-80 12 10)"/><path d="M10,14 L11,15 L10,16 L11,17 L10,16 L9,17 L10,16 L9,15 Z" fill="#ffde00" transform="rotate(-46.3636 10 14)"/>'
};

// --- Функция обновления превью ---
function updatePreview() {
    // Username
    const username = document.getElementById('display-username').textContent;
    document.getElementById('preview-username').textContent = username;

    // Avatar
    const avatarUrl = document.getElementById('avatar-preview').src;
    document.getElementById('preview-avatar').src = avatarUrl;

    // Badges
    const selectedBadges = Array.from(document.querySelectorAll('.badge-checkbox:checked')).map(cb => cb.value);
    const previewBadgesContainer = document.getElementById('preview-badges');
    previewBadgesContainer.innerHTML = '';
    selectedBadges.forEach(badgeText => {
        const className = badgeClassMap[badgeText] || "badge-primary";
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge ${className}`;
        badgeElement.textContent = badgeText;
        previewBadgesContainer.appendChild(badgeElement);
    });

    // Country
    const selectedCountryRadio = document.querySelector('input[name="country"]:checked');
    if (selectedCountryRadio) {
        const countryName = selectedCountryRadio.value;
        const flagSVG = countryFlagMap[countryName];
        if (flagSVG) {
            document.getElementById('preview-flag').innerHTML = flagSVG;
            document.getElementById('preview-country-name').textContent = countryName;
        }
    }
}

// --- Обработчики событий для обновления превью ---
document.getElementById('username-input').addEventListener('input', function(event) {
    const username = event.target.value;
    document.getElementById('display-username').textContent = username || 'Your Username';
    localStorage.setItem('userUsername', username);
    updatePreview();
});

document.querySelectorAll('.badge-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updatePreview);
});

document.querySelectorAll('.country-radio').forEach(radio => {
    radio.addEventListener('change', updatePreview);
});

// --- Обработчик кнопки "Generate Passport" ---
document.getElementById('generate-btn').addEventListener('click', function() {
    const avatarUrl = document.getElementById('avatar-preview').src;
    const username = document.getElementById('display-username').textContent;
    const selectedBadges = Array.from(document.querySelectorAll('.badge-checkbox:checked')).map(cb => cb.value);
    const selectedCountryRadio = document.querySelector('input[name="country"]:checked');
    const countryName = selectedCountryRadio ? selectedCountryRadio.value : 'Russia'; // Значение по умолчанию
    const countryFlag = selectedCountryRadio ? countryFlagMap[countryName] : countryFlagMap['Russia'];

    if (selectedBadges.length === 0) {
        alert('Please select at least one badge.');
        return;
    }

    const generatedHTML = `
        <div class="card-background">
            <img src="${avatarUrl}" alt="Avatar Preview" class="avatar-img">
        </div>
        <div class="display-username">${username}</div>
        <div class="badges-row">
            ${selectedBadges.map(badgeText => {
                const className = badgeClassMap[badgeText] || "badge-primary";
                return `<div class="badge ${className}">${badgeText}</div>`;
            }).join('')}
        </div>
        <div class="country-display">
            <svg class="flag-svg" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">${countryFlag}</svg>
            <span>${countryName}</span>
        </div>
        <div class="activity-description">
            Crafting pixels, pumping vibes, farming retweets 🌀
        </div>
    `;

    const generatedPassportElement = document.getElementById('generated-passport');
    generatedPassportElement.innerHTML = generatedHTML;

    // Правильное переключение видимости
    document.getElementById('editor-section').style.display = 'none';
    document.getElementById('generated-section').style.display = 'block';
});

// --- Обработчик кнопки "Back to Editor" ---
document.getElementById('back-btn').addEventListener('click', function() {
    // Правильное переключение видимости
    document.getElementById('generated-section').style.display = 'none';
    document.getElementById('editor-section').style.display = 'block';
});

// --- Обработчик кнопки "Download PNG" ---
document.getElementById('download-btn').addEventListener('click', function() {
    const generatedPassportElement = document.getElementById('generated-passport');

    html2canvas(generatedPassportElement, {
        backgroundColor: '#121212',
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-discord-passport.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

// --- Обработчик кнопки "Share on Twitter" ---
document.getElementById('twitter-btn').addEventListener('click', function() {
    const { username } = getPassportData();
    const tweetText = encodeURIComponent(`Check out my new Discord Passport! @${username} #Discord #Passport`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
});

// --- Функция для получения данных (для шаринга) ---
function getPassportData() {
    const avatarUrl = document.getElementById('avatar-preview').src;
    const username = document.getElementById('display-username').textContent;
    return { avatarUrl, username };
}

// --- Код загрузки аватара и восстановления данных ---
document.getElementById('avatar-upload').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusElement = document.getElementById('upload-status');
    statusElement.textContent = 'Uploading...';
    statusElement.className = '';

    if (!file.type.match('image.*')) {
        statusElement.textContent = 'Please select an image.';
        statusElement.className = 'error';
        return;
    }

    if (file.size > 16 * 1024 * 1024) {
        statusElement.textContent = 'File too large. Max 16 MB.';
        statusElement.className = 'error';
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success && result.data && result.data.url) {
            const imageUrl = result.data.url;
            console.log('Image uploaded to ImgBB:', imageUrl);

            document.getElementById('avatar-preview').src = imageUrl;
            localStorage.setItem('userAvatarUrl', imageUrl);

            updatePreview(); // Обновляем превью после загрузки

            statusElement.textContent = 'Uploaded!';
            statusElement.className = 'success';
        } else {
            console.error('ImgBB API Error:', result);
            statusElement.textContent = `Upload Error: ${result.error?.message || 'Unknown error'}`;
            statusElement.className = 'error';
        }
    } catch (error) {
        console.error('Network Error:', error);
        statusElement.textContent = `Network Error: ${error.message}`;
        statusElement.className = 'error';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const savedAvatarUrl = localStorage.getItem('userAvatarUrl');
    if (savedAvatarUrl) {
        document.getElementById('avatar-preview').src = savedAvatarUrl;
        updatePreview(); // Обновляем превью при загрузке
    }

    const savedUsername = localStorage.getItem('userUsername');
    if (savedUsername) {
        document.getElementById('username-input').value = savedUsername;
        document.getElementById('display-username').textContent = savedUsername;
        updatePreview(); // Обновляем превью при загрузке
    }

    // Вызов updatePreview после восстановления данных
    updatePreview();
});

// Инициализация превью при загрузке страницы (уже вызывается выше в DOMContentLoaded)
// document.addEventListener('DOMContentLoaded', updatePreview); // Убираем дублирование
