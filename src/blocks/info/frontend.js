document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.gtvb-tca-item');

    accordions.forEach(accordion => {
        const btn = accordion.querySelector('.tca-button');

        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();

                const collapse = accordion.querySelector('.tca-collapse');

                accordion.classList.toggle('active');
                btn.classList.toggle('active');
                collapse.classList.toggle('active');
            });
        }
    });
});
