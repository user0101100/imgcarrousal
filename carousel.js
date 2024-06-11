class Carousel {
    constructor(container, options = {}) {
        this.container = container;
        this.carouselImages = container.querySelector('.carousel-images');
        this.images = container.querySelectorAll('.carousel-images img');
        this.prevButton = container.querySelector('.prev');
        this.nextButton = container.querySelector('.next');
        this.indicators = container.querySelector('.carousel-indicators');
        this.index = 0;
        this.totalImages = this.images.length;
        this.interval = options.interval || 3000;

        this.updateCarousel = this.updateCarousel.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.autoSlide = this.autoSlide.bind(this);
        this.stopAutoSlide = this.stopAutoSlide.bind(this);
        this.startAutoSlide = this.startAutoSlide.bind(this);

        this.prevButton.addEventListener('click', this.prev);
        this.nextButton.addEventListener('click', this.next);
        this.carouselImages.addEventListener('touchstart', this.touchStart.bind(this));
        this.carouselImages.addEventListener('touchmove', this.touchMove.bind(this));
        this.carouselImages.addEventListener('touchend', this.touchEnd.bind(this));

        this.startAutoSlide();
        this.createIndicators();
    }

    createIndicators() {
        this.images.forEach((_, idx) => {
            const indicator = document.createElement('span');
            indicator.classList.add('carousel-indicator');
            indicator.addEventListener('click', () => {
                this.index = idx;
                this.updateCarousel();
            });
            this.indicators.appendChild(indicator);
        });
        this.updateIndicators();
    }

    updateIndicators() {
        this.indicators.querySelectorAll('.carousel-indicator').forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === this.index);
        });
    }

    updateCarousel() {
        this.carouselImages.style.transform = `translateX(${-this.index * 100}%)`;
        this.updateIndicators();
    }

    next() {
        this.index = (this.index < this.totalImages - 1) ? this.index + 1 : 0;
        this.updateCarousel();
    }

    prev() {
        this.index = (this.index > 0) ? this.index - 1 : this.totalImages - 1;
        this.updateCarousel();
    }

    autoSlide() {
        this.next();
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.intervalId = setTimeout(this.autoSlide, this.interval);
    }

    stopAutoSlide() {
        clearTimeout(this.intervalId);
    }

    touchStart(e) {
        this.stopAutoSlide();
        this.startX = e.touches[0].clientX;
    }

    touchMove(e) {
        this.moveX = e.touches[0].clientX - this.startX;
    }

    touchEnd() {
        if (this.moveX > 50) {
            this.prev();
        } else if (this.moveX < -50) {
            this.next();
        }
        this.startAutoSlide();
    }
}

export default Carousel;
