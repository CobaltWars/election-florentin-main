document.addEventListener('DOMContentLoaded', function() {
    const ministerList = document.getElementById('ministre-list');
    const testimonyList = document.getElementById('temoignage-list');
    const newsList = document.getElementById('news-list');

    function loadData() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                displayMinisters(data.ministers);
                displayTestimonies(data.testimonies);
                displayNews(data.news);
            })
            .catch(error => console.error('Erreur lors du chargement des données :', error));
    }

    function saveData(data) {
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Erreur lors de la sauvegarde des données :', error));
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

    document.getElementById('add-minister').addEventListener('click', function() {
        const ministerName = prompt("Entrez le nom du ministère :");
        const ministerPerson = prompt("Entrez le nom du ministre :");
        if (ministerName && ministerPerson) {
            fetch('/data')
                .then(response => response.json())
                .then(data => {
                    data.ministers.push({ name: ministerName, person: ministerPerson });
                    saveData(data);
                    displayMinisters(data.ministers);
                })
                .catch(error => console.error('Erreur lors de l\'ajout du ministre :', error));
        }
    });

    document.getElementById('add-temoignage').addEventListener('click', function() {
        const name = prompt("Entrez votre nom :");
        const message = prompt("Entrez votre témoignage :");
        if (name && message) {
            fetch('/data')
                .then(response => response.json())
                .then(data => {
                    data.testimonies.push({ name, message });
                    saveData(data);
                    displayTestimonies(data.testimonies);
                })
                .catch(error => console.error('Erreur lors de l\'ajout du témoignage :', error));
        }
    });

    document.getElementById('add-news').addEventListener('click', function() {
        const title = prompt("Entrez le titre de l'article :");
        const content = prompt("Entrez le contenu de l'article :");
        if (title && content) {
            fetch('/data')
                .then(response => response.json())
                .then(data => {
                    data.news.push({ title, content });
                    saveData(data);
                    displayNews(data.news);
                })
                .catch(error => console.error('Erreur lors de l\'ajout de l\'article :', error));
        }
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Merci pour votre message !');
        document.getElementById('contact-form').reset();
    });

    loadData();
});
