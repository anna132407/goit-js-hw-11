export const markupImg = (array) => {
    return array.map(img => {
        const { webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        } = img;
        return `
    <div class="photo-card">
        <a href='${largeImageURL}'>
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width= '300' height='400'/>
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes: <br>${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: <br>${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: <br>${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: <br>${downloads}</b>
            </p>
        </div>
    </div>`
    }).join('');
    
}