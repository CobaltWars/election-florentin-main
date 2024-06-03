document.addEventListener('DOMContentLoaded', function() {
    const ministerList = document.getElementById('ministre-list');
    const testimonyList = document.getElementById('temoignage-list');
    const newsList = document.getElementById('news-list');

    let data = { ministers: [], testimonies: [], news: [] };

    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    fetch('JSON/data.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            populateMinisters();
            populateTestimonies();
            populateNews();
            loadingScreen.style.display = 'none';
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            loadingScreen.style.display = 'none';
        });

    function populateMinisters() {
        if (ministerList) {
            data.ministers.forEach(minister => {
                const listItem = document.createElement('li');
                listItem.textContent = `${minister.nom} - ${minister.role}`;
                ministerList.appendChild(listItem);
            });
        }
    }

    function populateTestimonies() {
        if (testimonyList) {
            data.testimonies.forEach(testimony => {
                const item = document.createElement('div');
                item.classList.add('temoignage-item');
                item.innerHTML = `<h3>${testimony.nom}</h3><p>${testimony.message}</p>`;
                testimonyList.appendChild(item);
            });
        }
    }

    function populateNews() {
        if (newsList) {
            data.news.forEach(news => {
                const item = document.createElement('div');
                item.classList.add('news-item');
                item.innerHTML = `<h3>${news.titre}</h3><p>${news.contenu}</p>`;
                newsList.appendChild(item);
            });
        }
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = form.name.value;
            const email = form.email.value;
            const message = form.message.value;

            console.log(`Nom: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Message: ${message}`);

            form.reset();
        });
    }
});
