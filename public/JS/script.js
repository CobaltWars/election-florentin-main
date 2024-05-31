document.addEventListener('DOMContentLoaded', function() {
    const ministerList = document.getElementById('ministre-list');
    const testimonyList = document.getElementById('temoignage-list');
    const newsList = document.getElementById('news-list');

    let data = { ministers: [], testimonies: [], news: [] };

    function loadData() {
        fetch('/data')
            .then(response => response.json())
            .then(fetchedData => {
                data = fetchedData;
                displayMinisters(data.ministers);
                displayTestimonies(data.testimonies);
                displayNews(data.news);
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
            newsElement.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p>`;
            newsList.appendChild(newsElement);
        });
    }

    loadData();
});
