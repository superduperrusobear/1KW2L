document.addEventListener('DOMContentLoaded', () => {
    const storiesContainer = document.getElementById('storiesContainer');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let currentIndex = 0;
    const storiesPerLoad = 3;
    let isLoading = false;
    let activeTypewriter = null;
    let audio = new Audio('merzic/Unsolved Mysteries - 1991 Extended Theme (10-15-91) [Vinyl].mp3');
    audio.loop = true;
    audio.volume = 0.2; // Set initial volume to 20%

    let typewriterSound = new Audio('va audio/Typewriter Sound Effect.mp3');
    typewriterSound.volume = 0.5; // Increased volume

    let bassImpactSound = new Audio('va audio/Bass Impact - Sound Effect for editing.mp3');
    bassImpactSound.volume = 0.7; // Set bass impact volume

    // Create and append sound control button
    const soundControl = document.createElement('button');
    soundControl.className = 'sound-control';
    soundControl.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Start with muted icon
    document.body.appendChild(soundControl);

    // Create and append sound hint
    const soundHint = document.createElement('div');
    soundHint.className = 'sound-hint';
    soundHint.innerHTML = `
        FOR THE BEST EXPERIENCE PRESS ME
        <i class="fas fa-arrow-down sound-hint-arrow"></i>
    `;
    document.body.appendChild(soundHint);

    let isSoundOn = false;
    let currentNarration = null; // Track current playing narration

    soundControl.addEventListener('click', () => {
        // Remove hint on first click
        if (soundHint) {
            soundHint.style.display = 'none';
        }

        isSoundOn = !isSoundOn;
        const icon = soundControl.querySelector('i');
        if (isSoundOn) {
            icon.className = 'fas fa-volume-up';
            audio.play();
            // Fade in
            let vol = 0;
            audio.volume = vol;
            const fadeIn = setInterval(() => {
                if (vol < 0.2) {
                    vol += 0.02;
                    audio.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        } else {
            // Fade out
            let vol = audio.volume;
            const fadeOut = setInterval(() => {
                if (vol > 0.02) {
                    vol -= 0.02;
                    audio.volume = vol;
                } else {
                    audio.pause();
                    clearInterval(fadeOut);
                }
            }, 100);
            icon.className = 'fas fa-volume-mute';
        }
    });

    // Function to get narration path
    function getNarrationPath(storyId) {
        const paths = {
            1: 'va audio/sam.mp3',
            2: 'va audio/ca3rol.mp3',
            3: 'va audio/rugpullromance.mp3',
            4: 'va audio/bathroomblunder.mp3',
            5: 'va audio/diamond hands.mp3',
            6: 'va audio/sleepwalkingtrader.mp3',
            7: 'va audio/finaltransaction.mp3',
            8: 'va audio/keyextact.mp3',
            9: 'va audio/hatak.mp3',
            10: 'va audio/cannibal.mp3',
            11: 'va audio/codertim.mp3'
        };
        return paths[storyId] || null;
    }

    // Function to play narration
    function playNarration(storyId, button) {
        // Get the correct audio path
        const audioPath = getNarrationPath(storyId);
        if (!audioPath) {
            console.error(`No audio file found for story ${storyId}`);
            return;
        }

        // Stop any currently playing narration and reset button states
        if (currentNarration) {
            currentNarration.pause();
            currentNarration.currentTime = 0;
            // Remove playing class from all buttons
            document.querySelectorAll('.narration-button').forEach(btn => {
                btn.classList.remove('playing');
            });
        }

        // Lower background music volume
        if (isSoundOn) {
            audio.volume = 0.05;
        }

        // Create new audio for narration
        currentNarration = new Audio(audioPath);
        currentNarration.volume = 1;

        // Add playing class to current button
        button.classList.add('playing');

        // When narration ends
        currentNarration.onended = () => {
            // Play bass impact sound
            const impactSound = bassImpactSound.cloneNode();
            impactSound.play().catch(error => console.error('Error playing impact sound:', error));
            
            if (isSoundOn) {
                audio.volume = 0.2;
            }
            button.classList.remove('playing');
            currentNarration = null;
        };

        // Handle errors
        currentNarration.onerror = () => {
            console.error(`Error playing narration for story ${storyId}`);
            button.classList.remove('playing');
            if (isSoundOn) {
                audio.volume = 0.2;
            }
            currentNarration = null;
        };

        currentNarration.play().catch(error => {
            console.error('Error playing narration:', error);
            button.classList.remove('playing');
            if (isSoundOn) {
                audio.volume = 0.2;
            }
            currentNarration = null;
        });
    }

    function typeWriter(element, text, speed = 30) {
        // Split the text into first line and rest
        const lines = text.split('\n');
        const firstLine = lines[0];
        const restOfText = lines.slice(1).join('\n');
        
        // Show first line immediately
        element.textContent = firstLine + '\n';
        
        // Play first typewriter sound immediately
        const sound1 = typewriterSound.cloneNode();
        sound1.volume = 0.5;
        sound1.play().catch(error => console.error('Error playing typewriter sound:', error));
        
        let i = 0;
        const textLength = restOfText.length;
        const midPoint = Math.floor(textLength / 2);
        let hasPlayedSecondSound = false;

        return new Promise((resolve) => {
            // Start typing the rest after a delay
            setTimeout(() => {
                function type() {
                    if (i < restOfText.length) {
                        element.textContent = firstLine + '\n' + restOfText.substring(0, i + 1);
                        i++;

                        // Play second typewriter sound at midpoint
                        if (i === midPoint && !hasPlayedSecondSound) {
                            const sound2 = typewriterSound.cloneNode();
                            sound2.volume = 0.5;
                            sound2.play().catch(error => console.error('Error playing typewriter sound:', error));
                            hasPlayedSecondSound = true;
                        }

                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                }
                type();
            }, 400);
        });
    }

    // Create a story card element
    function createStoryCard(story, index) {
        const card = document.createElement('div');
        card.className = 'story-card';
        
        // Add the card number
        const cardNumber = document.createElement('div');
        cardNumber.className = 'card-number';
        cardNumber.textContent = `#${String(index + 1).padStart(2, '0')}`;
        card.appendChild(cardNumber);
        
        const tweetText = encodeURIComponent(`${story.title}\n\n${story.content}\n\nRead more at 1000WaysToLose.com 😅 #crypto #rekt`);
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'story-content-wrapper';

        // Add thread line
        const threadLine = document.createElement('div');
        threadLine.className = 'thread-line';
        card.appendChild(threadLine);
        
        contentWrapper.innerHTML = `
            <div class="tweet-header">
            </div>
            <button class="narration-button" data-story-id="${story.id}">
                <span class="narration-button-text">DON'T FEEL LIKE READING?<br>PRESS ME</span>
                <i class="fas fa-headphones"></i>
            </button>
            <h2 class="story-title">${story.title}</h2>
            <p class="story-content">${story.content}</p>
            <div class="tweet-actions">
                <div class="tweet-action">
                    <i class="far fa-comment"></i>
                    <span>${Math.floor(Math.random() * 100)}</span>
                </div>
                <div class="tweet-action">
                    <i class="fas fa-retweet"></i>
                    <span>${Math.floor(Math.random() * 500)}</span>
                </div>
                <div class="tweet-action">
                    <i class="far fa-heart"></i>
                    <span>${Math.floor(Math.random() * 1000)}</span>
                </div>
                <div class="tweet-action">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>
            <a href="https://twitter.com/intent/tweet?text=${tweetText}" 
               class="share-button" 
               target="_blank">
                <img src="images/x-0muuxjzgzvtlpaduv3p4k2s.webp" alt="X Logo" class="x-logo">Share this L
            </a>
        `;

        const storyContent = contentWrapper.querySelector('.story-content');
        const originalText = storyContent.textContent;
        storyContent.textContent = '';

        // Create an Intersection Observer for this card
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !storyContent.textContent) {
                    // Stop any active typewriter
                    if (activeTypewriter) {
                        activeTypewriter.storyContent.textContent = activeTypewriter.originalText;
                        activeTypewriter.storyContent.classList.remove('typing-active');
                    }
                    // Start new typewriter
                    typeWriter(storyContent, originalText);
                    activeTypewriter = {
                        storyContent,
                        originalText
                    };
                }
            });
        }, {
            threshold: 0.7
        });

        observer.observe(card);
        
        // Add interaction to tweet actions
        const tweetActions = contentWrapper.querySelectorAll('.tweet-action');
        tweetActions.forEach(action => {
            action.addEventListener('click', () => {
                const icon = action.querySelector('i');
                const count = action.querySelector('span');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    if (count) count.textContent = (parseInt(count.textContent) + 1).toString();
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    if (count) count.textContent = (parseInt(count.textContent) - 1).toString();
                }
            });
        });
        
        // Add click handler for narration button
        const narrationButton = contentWrapper.querySelector('.narration-button');
        narrationButton.addEventListener('click', (e) => {
            playNarration(story.id, e.currentTarget);
        });
        
        card.appendChild(contentWrapper);
        return card;
    }

    // Load initial stories
    function loadInitialStories() {
        const initialStories = stories.slice(0, Math.min(15, stories.length));
        initialStories.forEach((story, index) => {
            storiesContainer.appendChild(createStoryCard(story, index));
        });
        currentIndex = initialStories.length;
        updateScrollIndicator();
    }

    // Load more stories
    function loadMoreStories() {
        if (isLoading || currentIndex >= Math.min(15, stories.length)) {
            scrollIndicator.style.display = 'none';
            return;
        }
        
        isLoading = true;
        loadingIndicator.style.display = 'block';
        scrollIndicator.style.display = 'none';

        setTimeout(() => {
            const remainingCount = Math.min(15 - currentIndex, storiesPerLoad);
            const moreStories = stories.slice(currentIndex, currentIndex + remainingCount);
            moreStories.forEach((story, idx) => {
                storiesContainer.appendChild(createStoryCard(story, currentIndex + idx));
            });
            
            currentIndex += moreStories.length;
            isLoading = false;
            loadingIndicator.style.display = 'none';
            updateScrollIndicator();
        }, 800);
    }

    // Update scroll indicator visibility
    function updateScrollIndicator() {
        if (currentIndex < Math.min(15, stories.length)) {
            scrollIndicator.style.display = 'block';
        } else {
            scrollIndicator.style.display = 'none';
        }
    }

    // Infinite scroll handler
    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
        
        if (scrollTop + clientHeight >= scrollHeight - 300) {
            loadMoreStories();
        }
    }

    // Share Loss Modal Functionality
    const fabButton = document.querySelector('.fab-button');
    const shareLossModal = document.getElementById('shareLossModal');
    const closeModal = document.querySelector('.close-modal');
    const lossMessage = document.getElementById('lossMessage');
    const charCount = document.getElementById('charCount');
    const shareToTwitter = document.querySelector('.share-to-twitter');

    // Open modal
    fabButton.addEventListener('click', () => {
        shareLossModal.classList.add('active');
        lossMessage.focus();
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        shareLossModal.classList.remove('active');
        lossMessage.value = '';
        charCount.textContent = '75';
    });

    // Close modal when clicking outside
    shareLossModal.addEventListener('click', (e) => {
        if (e.target === shareLossModal) {
            shareLossModal.classList.remove('active');
            lossMessage.value = '';
            charCount.textContent = '75';
        }
    });

    // Character count
    lossMessage.addEventListener('input', () => {
        const remaining = 75 - lossMessage.value.length;
        charCount.textContent = remaining;
        
        // Visual feedback when nearing limit
        if (remaining < 10) {
            charCount.style.color = '#ff4500';
        } else {
            charCount.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    });

    // Share to Twitter
    shareToTwitter.addEventListener('click', () => {
        if (lossMessage.value.trim()) {
            const tweetText = encodeURIComponent(`${lossMessage.value}\n\n@1000WaysToLose #crypto #rekt`);
            window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
            shareLossModal.classList.remove('active');
            lossMessage.value = '';
            charCount.textContent = '75';
        }
    });

    // Initialize
    loadInitialStories();
    window.addEventListener('scroll', handleScroll);

    // Add click handler for scroll indicator
    scrollIndicator.addEventListener('click', () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}); 