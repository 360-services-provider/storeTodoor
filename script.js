document.addEventListener('DOMContentLoaded', () => {
    // Preload all images into a cache for instant frame switching
    const loadImage = (src) => new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });

    // =========================================================
    // 1. Header Image Sequence Animation (strokeimages folder)
    // =========================================================
    const headerCanvas = document.getElementById("stork-hero-canvas");
    if (headerCanvas) {
        const headerContext = headerCanvas.getContext("2d");
        const headerFrameCount = 90;
        const headerCurrentFrame = index =>
            `strokeimages/${(index).toString().padStart(5, '0')}.png`;

        headerCanvas.width = 1920;
        headerCanvas.height = 1080;

        // Cache of preloaded Image objects
        const headerImages = new Array(headerFrameCount).fill(null);
        let headerLoaded = 0;
        let currentHeaderFrame = 0;

        const drawHeader = (index) => {
            const img = headerImages[index];
            if (img) {
                headerContext.drawImage(img, 0, 0, headerCanvas.width, headerCanvas.height);
            }
        };

        // Preload all header frames
        for (let i = 0; i < headerFrameCount; i++) {
            const img = new Image();
            img.onload = () => {
                headerImages[i] = img;
                headerLoaded++;
                if (i === 0) drawHeader(0); // draw first frame ASAP
            };
            img.src = headerCurrentFrame(i + 1);
        }

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollFraction = Math.min(1, scrollTop / 600);
            const frameIndex = Math.min(
                headerFrameCount - 1,
                Math.floor(scrollFraction * headerFrameCount)
            );
            if (frameIndex !== currentHeaderFrame) {
                currentHeaderFrame = frameIndex;
                requestAnimationFrame(() => drawHeader(frameIndex));
            }
        }, { passive: true });
    }

    // =========================================================
    // 2. Hero Image Sequence Animation (images folder)
    // =========================================================
    const canvas = document.getElementById("hero-lightpass");
    if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 192;
        const currentFrame = index =>
            `images/${(index).toString().padStart(5, '0')}.png`;

        canvas.width = 1280;
        canvas.height = 720;

        // Cache of preloaded Image objects
        const images = new Array(frameCount).fill(null);
        let currentFrameIndex = 0;

        const drawFrame = (index) => {
            const img = images[index];
            if (img) {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };

        // Preload all frames
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = () => {
                images[i] = img;
                if (i === 0) drawFrame(0); // draw first frame ASAP
            };
            img.src = currentFrame(i + 1);
        }

        window.addEventListener('scroll', () => {
            const section = document.getElementById('doordash-hero');
            if (!section) return;
            const rect = section.getBoundingClientRect();

            let scrollFraction = 0;
            if (rect.top <= 0) {
                const scrolledDistance = -rect.top;
                const maxScrollable = rect.height - window.innerHeight;
                scrollFraction = Math.max(0, Math.min(1, scrolledDistance / maxScrollable));
            }

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            if (frameIndex !== currentFrameIndex) {
                currentFrameIndex = frameIndex;
                requestAnimationFrame(() => drawFrame(frameIndex));
            }
        }, { passive: true });
    }
});
