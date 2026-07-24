document.addEventListener('DOMContentLoaded', () => {
    const posterCards = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox');
    const mainImg = document.getElementById('lb-main-img');
    const currentIndexElem = document.getElementById('lb-current');
    const totalIndexElem = document.getElementById('lb-total');
    
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');
    const closeBtn = document.getElementById('lb-close-btn');
    const zoomBtn = document.getElementById('lb-zoom-btn');
    const gridBtn = document.getElementById('lb-grid-btn');
    const sidebar = document.getElementById('lb-sidebar');
    const gridList = document.getElementById('lb-grid-list');
    const backdrop = document.getElementById('lightbox-backdrop');

    let currentIndex = 0;
    let isZoomed = false;

    const posters = Array.from(posterCards).map(card => ({
        src: card.src,
        alt: card.alt
    }));

    totalIndexElem.textContent = posters.length;

    posters.forEach((poster, idx) => {
        const thumb = document.createElement('img');
        thumb.src = poster.src;
        thumb.alt = poster.alt;
        thumb.classList.add('lb-thumb');
        thumb.addEventListener('click', () => showImage(idx));
        gridList.appendChild(thumb);
    });

    const thumbnails = document.querySelectorAll('.lb-thumb');

    posterCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'), 10);
            lightbox.classList.add('active');
            showImage(index);
        });
    });

    function showImage(index) {
        currentIndex = index;
        mainImg.src = posters[currentIndex].src;
        mainImg.alt = posters[currentIndex].alt;
        currentIndexElem.textContent = currentIndex + 1;

        resetZoom();

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % posters.length;
        showImage(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + posters.length) % posters.length;
        showImage(currentIndex);
    }

    function toggleZoom() {
        isZoomed = !isZoomed;
        mainImg.classList.toggle('zoomed', isZoomed);
    }

    function resetZoom() {
        isZoomed = false;
        mainImg.classList.remove('zoomed');
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    zoomBtn.addEventListener('click', toggleZoom);
    mainImg.addEventListener('click', toggleZoom);

    gridBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        resetZoom();
    };

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'z' || e.key === 'Z') toggleZoom();
    });
});