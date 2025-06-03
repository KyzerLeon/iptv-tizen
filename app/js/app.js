function fetchChannels() {
    const serverUrl = document.getElementById('serverUrl').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!serverUrl || !username || !password) {
        alert('Lütfen tüm bilgileri girin');
        return;
    }

    // Xtream Codes API (basic example)
    const url = `${serverUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_streams`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('channelList');
            list.innerHTML = '';
            data.forEach(ch => {
                const li = document.createElement('li');
                li.textContent = ch.name;
                list.appendChild(li);
            });
            document.getElementById('content').classList.remove('hidden');
        })
        .catch(err => {
            console.error(err);
            alert('Kanallar alınırken hata oluştu');
        });
}

document.getElementById('loginBtn').addEventListener('click', fetchChannels);

// Basit kumanda yön tuşu desteği
document.addEventListener('keydown', (e) => {
    const list = document.getElementById('channelList');
    const selected = list.querySelector('.selected');
    if (!selected) {
        if (list.firstElementChild) {
            list.firstElementChild.classList.add('selected');
        }
        return;
    }

    if (e.key === 'ArrowDown') {
        const next = selected.nextElementSibling;
        if (next) {
            selected.classList.remove('selected');
            next.classList.add('selected');
        }
    } else if (e.key === 'ArrowUp') {
        const prev = selected.previousElementSibling;
        if (prev) {
            selected.classList.remove('selected');
            prev.classList.add('selected');
        }
    }
});
