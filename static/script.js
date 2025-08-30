// Font Generator JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Character counter for textarea
    const textArea = document.getElementById('text');
    const charCount = document.getElementById('charCount');
    
    if (textArea && charCount) {
        // Update character count on input
        textArea.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = 500;
            
            charCount.textContent = `${length}/${maxLength}`;
            
            // Add warning/error classes based on character count
            charCount.classList.remove('char-limit-warning', 'char-limit-error');
            if (length > maxLength * 0.8) {
                charCount.classList.add('char-limit-warning');
            }
            if (length >= maxLength) {
                charCount.classList.add('char-limit-error');
            }
        });

        // Auto-resize textarea
        textArea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Initialize copy button event listeners
    initializeCopyButtons();
    
    // Auto-focus on text input if empty
    if (textArea && !textArea.value.trim()) {
        textArea.focus();
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const fontCards = document.querySelectorAll('.font-card');
    const noResults = document.getElementById('noResults');
    const visibleCount = document.getElementById('visibleCount');
    
    let visibleCards = 0;
    
    fontCards.forEach(card => {
        const fontName = card.querySelector('[data-font-name]').dataset.fontName;
        const isVisible = fontName.includes(searchTerm);
        
        if (isVisible) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            visibleCards++;
            
            // Animate card appearance
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });
    
    // Update visible count
    if (visibleCount) {
        visibleCount.textContent = visibleCards;
    }
    
    // Show/hide no results message
    if (noResults) {
        if (visibleCards === 0 && fontCards.length > 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
}

function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('onclick').match(/'([^']*)'/)[1];
            copyToClipboard(textToCopy, this);
        });
    });
}

async function copyToClipboard(text, buttonElement) {
    try {
        // Decode HTML entities
        const decodedText = decodeHtmlEntities(text);
        
        // Use the modern Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(decodedText);
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(decodedText);
        }
        
        // Show success feedback
        showCopySuccess(buttonElement);
        showToast('Copied to clipboard!');
        
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showToast('Failed to copy. Please try again.', 'error');
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        throw new Error('Copy failed');
    }
    
    document.body.removeChild(textArea);
}

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function showCopySuccess(buttonElement) {
    const card = buttonElement.closest('.font-card');
    const successElement = card.querySelector('.copy-success');
    
    if (successElement) {
        successElement.classList.remove('hidden');
        
        // Hide after animation
        setTimeout(() => {
            successElement.classList.add('hidden');
        }, 1500);
    }
    
    // Temporarily change button text
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
    buttonElement.classList.add('bg-green-600');
    
    setTimeout(() => {
        buttonElement.innerHTML = originalText;
        buttonElement.classList.remove('bg-green-600');
    }, 1500);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Update toast content and style
    const icon = type === 'success' ? 'fa-check' : 'fa-exclamation-triangle';
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg transform translate-x-full transition-transform duration-300 z-50`;
    
    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('toast-show');
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        toast.classList.remove('toast-show');
    }, 3000);
}

async function copyAllFonts() {
    try {
        const fontCards = document.querySelectorAll('.font-card:not(.hidden)');
        let allFonts = '';
        
        fontCards.forEach((card, index) => {
            const fontName = card.querySelector('[data-font-name]').textContent.trim();
            const fontText = card.querySelector('.font-preview').textContent.trim();
            
            allFonts += `${fontName}:\n${fontText}\n\n`;
        });
        
        if (allFonts.trim()) {
            await copyToClipboard(allFonts.trim(), document.querySelector('button[onclick="copyAllFonts()"]'));
            showToast(`Copied ${fontCards.length} fonts to clipboard!`);
        } else {
            showToast('No fonts to copy', 'error');
        }
        
    } catch (err) {
        console.error('Failed to copy all fonts: ', err);
        showToast('Failed to copy all fonts', 'error');
    }
}

function clearResults() {
    // Clear the textarea
    const textArea = document.getElementById('text');
    if (textArea) {
        textArea.value = '';
        textArea.focus();
        
        // Reset character count
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = '0/500';
            charCount.classList.remove('char-limit-warning', 'char-limit-error');
        }
    }
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Optionally reload the page to clear results
    window.location.href = window.location.pathname;
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.querySelector('form');
        if (form) {
            form.submit();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            handleSearch();
            searchInput.blur();
        }
    }
    
    // Focus search with Ctrl/Cmd + F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
});

// Handle form submission with loading state
document.addEventListener('submit', function(e) {
    const submitButton = e.target.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Re-enable after a timeout (in case of errors)
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }, 10000);
    }
});

// Performance optimization: Lazy load font previews for large lists
function lazyLoadFontPreviews() {
    const fontCards = document.querySelectorAll('.font-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('loaded');
                    observer.unobserve(card);
                }
            });
        });
        
        fontCards.forEach(card => observer.observe(card));
    }
}

// Initialize lazy loading if there are many font cards
if (document.querySelectorAll('.font-card').length > 20) {
    lazyLoadFontPreviews();
}

// Analytics helper (placeholder for future implementation)
function trackFontCopy(fontName) {
    // Implementation for analytics tracking
    console.log(`Font copied: ${fontName}`);
}

// Error handling for uncaught promises
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('An unexpected error occurred', 'error');
});
