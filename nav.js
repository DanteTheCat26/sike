(function() {
    const contentArea = document.querySelector('.main-wrapper');
    if (!contentArea) return;

    function navigateTo(url) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newWrapper = doc.querySelector('.main-wrapper');
                const newTitle = doc.title;
                if (newWrapper) {
                    contentArea.innerHTML = newWrapper.innerHTML;
                    document.title = newTitle;
                    window.scrollTo(0, 0);
                }
            });
    }

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;

        // Внешние ссылки — открываем в новой вкладке
        if (href.startsWith('http') || href.startsWith('//')) {
            window.open(href, '_blank');
            e.preventDefault();
            return;
        }

        e.preventDefault();
        history.pushState({ url: href }, '', href);
        navigateTo(href);
    });

    window.addEventListener('popstate', function() {
        navigateTo(location.pathname);
    });
})();
