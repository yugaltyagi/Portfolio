// 3D Tilt Effect
const tiltElements = document.querySelectorAll('.process-step, .metric-card, .device-mockup');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Animated Tech Radar
function initTechRadar() {
    const radarData = {
        labels: ['Kotlin', 'Architecture', 'UI/UX', 'Performance', 'Testing', 'CI/CD'],
        datasets: [{
            label: 'My Skills',
            data: [95, 85, 80, 75, 70, 65],
            backgroundColor: 'rgba(3, 218, 198, 0.5)',
            borderColor: 'rgba(3, 218, 198, 1)',
            pointBackgroundColor: 'rgba(3, 218, 198, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 5
        }]
    };

    const radarConfig = {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: { color: '#fff' }
                }
            },
            plugins: {
                legend: { display: false },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            },
            elements: {
                line: { tension: 0.1 }
            }
        }
    };

    new Chart(document.getElementById('techRadar'), radarConfig);
}

// Lazy Loading with Intersection Observer
const lazyLoader = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lazyElement = entry.target;
            
            if (lazyElement.tagName === 'VIDEO') {
                lazyElement.load();
            } else if (lazyElement.classList.contains('lazy-img')) {
                lazyElement.src = lazyElement.dataset.src;
            }
            
            observer.unobserve(lazyElement);
        }
    });
}, { rootMargin: '200px' });

document.querySelectorAll('video, .lazy-img').forEach(el => {
    lazyLoader.observe(el);
});