document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Image Sequence Animation (strokeimages)
    const headerCanvas = document.getElementById("stork-hero-canvas");
    if (headerCanvas) {
        const headerContext = headerCanvas.getContext("2d");

        // The images are in strokeimages/ folder and named 00001.png to 00192.png
        // Limiting to 90 frames for a full flap sequence
        const headerFrameCount = 90;
        const headerCurrentFrame = index => (
            `strokeimages/${(index + 1).toString().padStart(5, '0')}.png`
        );

        const preloadHeaderImages = () => {
            for (let i = 1; i < headerFrameCount; i++) {
                const img = new Image();
                img.src = headerCurrentFrame(i);
            }
        };

        const headerImg = new Image();
        headerImg.src = headerCurrentFrame(0);
        
        headerCanvas.width = 1920;
        headerCanvas.height = 1080;

        headerImg.onload = function() {
            headerContext.drawImage(headerImg, 0, 0);
        }

        const updateHeaderImage = index => {
            headerImg.src = headerCurrentFrame(index);
            headerContext.drawImage(headerImg, 0, 0);
        }

        window.addEventListener('scroll', () => {  
            const scrollTop = document.documentElement.scrollTop;
            // The header is 600px tall. Finish the animation by the time we scroll past it.
            const scrollFraction = Math.min(1, scrollTop / 600);
            
            const frameIndex = Math.min(
                headerFrameCount - 1,
                Math.ceil(scrollFraction * headerFrameCount)
            );
            
            requestAnimationFrame(() => updateHeaderImage(frameIndex + 1));
        });

        preloadHeaderImages();
    }

    // 2. Hero Image Sequence Animation
    const canvas = document.getElementById("hero-lightpass");
    if (canvas) {
        const context = canvas.getContext("2d");

        // The images are in images/ folder and named 00001.png to 00192.png
        const frameCount = 192;
        const currentFrame = index => (
            `images/${(index + 1).toString().padStart(5, '0')}.png`
        );

        const preloadImages = () => {
            for (let i = 1; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
            }
        };

        const img = new Image();
        img.src = currentFrame(0);
        
        canvas.width = 1280;
        canvas.height = 720;

        img.onload = function() {
            context.drawImage(img, 0, 0);
        }

        const updateImage = index => {
            img.src = currentFrame(index);
            context.drawImage(img, 0, 0);
        }

        window.addEventListener('scroll', () => {  
            const section = document.getElementById('doordash-hero');
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
            
            requestAnimationFrame(() => updateImage(frameIndex + 1));
        });

        preloadImages();
    }
});
