document.getElementById('add-minister').addEventListener('click', function() {
    const ministerName = prompt("Entrez le nom du ministère :");
    const ministerPerson = prompt("Entrez le nom du ministre :");
    if (ministerName && ministerPerson) {
        data.ministers.push({ name: ministerName, person: ministerPerson });
        displayMinisters(data.ministers);
        saveData();
    }
});

document.getElementById('add-temoignage').addEventListener('click', function() {
    const name = prompt("Entrez votre nom :");
    const message = prompt("Entrez votre témoignage :");
    if (name && message) {
        data.testimonies.push({ name, message });
        displayTestimonies(data.testimonies);
        saveData();
    }
});

document.getElementById('add-news').addEventListener('click', function() {
    const title = prompt("Entrez le titre de l'article :");
    const content = prompt("Entrez le contenu de l'article :");
    if (title && content) {
        data.news.push({ title, content });
        displayNews(data.news);
        saveData();
    }
});
