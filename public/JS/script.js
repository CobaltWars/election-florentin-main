document.addEventListener('DOMContentLoaded', function() {
    const ministerList = document.getElementById('ministre-list');
    const testimonyList = document.getElementById('temoignage-list');
    const newsList = document.getElementById('news-list');
    
    let data = { ministers: [], testimonies: [], news: [] };

    function loadData() {
        fetch('/data.json')
            .then(response => response.json())
            .then(fetchedData => {
                data = fetchedData;
                if (ministerList) {
                    displayMinisters(data.ministers);
                }
                if (testimonyList) {
                    displayTestimonies(data.testimonies);
                }
                if (newsList) {
                    displayNews(data.news);
                }
            })
            .catch(error => console.error('Erreur lors du chargement des données :', error));
    }

    function displayMinisters(ministers) {
        ministerList.innerHTML = '';
        ministers.forEach(minister => {
            const listItem = document.createElement('li');
            listItem.textContent = `${minister.name}: ${minister.person}`;
            ministerList.appendChild(listItem);
        });
    }

    function displayTestimonies(testimonies) {
        testimonyList.innerHTML = '';
        testimonies.forEach(testimony => {
            const testimonyItem = document.createElement('div');
            testimonyItem.classList.add('temoignage-item');
            testimonyItem.innerHTML = `<h3>${testimony.name}</h3><p>${testimony.message}</p>`;
            testimonyList.appendChild(testimonyItem);
        });
    }

    function displayNews(news) {
        newsList.innerHTML = '';
        news.forEach(newsItem => {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
            newsElement.innerHTML = `<h3>${newsItem.title}</h3><img ${newsItem.src} ${newsItem.alt}><p>${newsItem.content}</p>`;
            newsList.appendChild(newsElement);
        });
    }

    document.getElementById('contact-form')?.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Merci pour votre message !');
        document.getElementById('contact-form').reset();
    });

    loadData();
});
