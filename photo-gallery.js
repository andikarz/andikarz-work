/* Local-file friendly photo galleries. No upload service, fetch, or database. */
(() => {
    'use strict';
    const script = document.currentScript;
    const base = new URL('.', script.src);
    const config = window.PORTFOLIO_MEDIA;
    if (!config) return;

    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text != null) element.textContent = String(text);
        return element;
    }
    function resolvePhoto(src) {
        if (typeof src !== 'string' || !src.trim()) return null;
        try {
            const url = new URL(src.trim(), base);
            if (!['file:', 'http:', 'https:'].includes(url.protocol)) return null;
            if (config.assetVersion) url.searchParams.set('v', String(config.assetVersion));
            return url.href;
        } catch { return null; }
    }

    // One shared native dialog supplies focus trapping and Escape behavior.
    let dialog, viewerImage, viewerTitle, viewerCaption, viewerCount, viewerError;
    let previousButton, nextButton, closeButton;
    let activeGroup = [], activeIndex = 0, opener, previousOverflow = '';
    function ensureViewer() {
        if (dialog) return;
        dialog = node('dialog', 'photo-viewer');
        dialog.setAttribute('aria-labelledby', 'photo-viewer-title');
        dialog.setAttribute('aria-describedby', 'photo-viewer-caption');
        const top = node('div', 'photo-viewer-top');
        const heading = node('div');
        heading.append(node('span', 'photo-viewer-label', 'PHOTO DOCUMENTATION'));
        viewerTitle = node('h2'); viewerTitle.id = 'photo-viewer-title';
        heading.append(viewerTitle);
        closeButton = node('button', 'photo-control photo-close', '×');
        closeButton.type = 'button'; closeButton.setAttribute('aria-label', 'Close photo');
        closeButton.autofocus = true;
        top.append(heading, closeButton);
        const stage = node('div', 'photo-viewer-stage');
        viewerImage = node('img');
        viewerImage.decoding = 'async';
        viewerError = node('p', 'photo-viewer-error', 'This photo could not be loaded.');
        viewerError.hidden = true;
        viewerImage.addEventListener('load', () => { viewerError.hidden = true; });
        viewerImage.addEventListener('error', () => { viewerImage.hidden = true; viewerError.hidden = false; });
        stage.append(viewerImage, viewerError);
        const bottom = node('div', 'photo-viewer-bottom');
        viewerCaption = node('p'); viewerCaption.id = 'photo-viewer-caption';
        const controls = node('div', 'photo-viewer-navigation');
        previousButton = node('button', 'photo-control', '←');
        previousButton.type = 'button'; previousButton.setAttribute('aria-label', 'Previous photo');
        nextButton = node('button', 'photo-control', '→');
        nextButton.type = 'button'; nextButton.setAttribute('aria-label', 'Next photo');
        viewerCount = node('span', 'photo-viewer-count');
        viewerCount.setAttribute('aria-live', 'polite');
        controls.append(previousButton, viewerCount, nextButton);
        bottom.append(viewerCaption, controls);
        dialog.append(top, stage, bottom);
        document.body.append(dialog);
        closeButton.addEventListener('click', () => dialog.close());
        previousButton.addEventListener('click', () => changePhoto(-1));
        nextButton.addEventListener('click', () => changePhoto(1));
        dialog.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                changePhoto(event.key === 'ArrowLeft' ? -1 : 1);
            }
        });
        dialog.addEventListener('click', event => {
            if (event.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
        });
        dialog.addEventListener('close', () => {
            document.body.style.overflow = previousOverflow;
            viewerImage.removeAttribute('src');
            if (opener && opener.isConnected) opener.focus({ preventScroll: true });
        });
    }
    function showPhoto() {
        const photo = activeGroup[activeIndex];
        viewerTitle.textContent = photo.item.title || 'Photo documentation';
        viewerCaption.textContent = photo.item.caption || '';
        viewerCount.textContent = `${activeIndex + 1} / ${activeGroup.length}`;
        previousButton.disabled = nextButton.disabled = activeGroup.length < 2;
        viewerError.hidden = true;
        viewerImage.hidden = false;
        viewerImage.alt = photo.item.alt || photo.item.title || 'Documentation photo';
        viewerImage.src = photo.url;
    }
    function changePhoto(direction) {
        if (activeGroup.length < 2) return;
        activeIndex = (activeIndex + direction + activeGroup.length) % activeGroup.length;
        showPhoto();
    }
    function openPhoto(photo, group, button) {
        if (!photo.ready) return;
        ensureViewer();
        activeGroup = group.filter(entry => !entry.failed);
        activeIndex = activeGroup.indexOf(photo);
        if (activeIndex < 0) return;
        opener = button;
        previousOverflow = document.body.style.overflow;
        showPhoto();
        dialog.showModal();
        document.body.style.overflow = 'hidden';
    }

    function placeholder(item, index, failed) {
        const area = node('div', 'photo-placeholder');
        area.append(node('span', 'photo-placeholder-number', String(index + 1).padStart(2, '0')));
        area.append(node('span', 'photo-placeholder-title', item.placeholder || 'Documentation photo'));
        area.append(node('span', 'photo-placeholder-note', failed ? 'Photo unavailable' : 'Photo to be added'));
        return area;
    }
    function card(item, index, group, profile = false) {
        const figure = node('figure', profile ? 'photo-card profile-photo-card' : 'photo-card');
        const frame = node('div', 'photo-frame');
        const caption = node('figcaption', 'photo-caption');
        if (item.title) caption.append(node('strong', '', item.title));
        if (item.caption) caption.append(node('p', '', item.caption));
        figure.append(frame, caption);
        const url = resolvePhoto(item.src);
        if (!url) {
            frame.append(placeholder(item, index, Boolean(item.src)));
            return figure;
        }
        const photo = { item, url, ready: false, failed: false };
        group.push(photo);
        const button = node('button', 'photo-open');
        button.type = 'button'; button.disabled = true;
        button.setAttribute('aria-label', `Enlarge photo: ${item.title || item.alt || 'documentation'}`);
        const image = node('img', 'gallery-photo');
        image.alt = item.alt || item.title || 'Documentation photo';
        image.loading = 'lazy'; image.decoding = 'async';
        image.style.objectFit = item.fit === 'contain' ? 'contain' : 'cover';
        image.style.objectPosition = item.position || '50% 50%';
        image.addEventListener('load', () => { photo.ready = true; button.disabled = false; });
        image.addEventListener('error', () => {
            photo.ready = false;
            photo.failed = true;
            frame.replaceChildren(placeholder(item, index, true));
        }, { once: true });
        image.src = url;
        const zoom = node('span', 'photo-enlarge', 'View photo ↗'); zoom.setAttribute('aria-hidden', 'true');
        button.append(image, zoom);
        button.addEventListener('click', () => openPhoto(photo, group, button));
        frame.append(button);
        return figure;
    }

    document.querySelectorAll('[data-photo-profile]').forEach(mount => {
        const item = config.profile;
        if (!item || item.enabled === false) { mount.hidden = true; return; }
        mount.replaceChildren(card(item, 0, [], true));
    });
    document.querySelectorAll('[data-photo-gallery]').forEach(mount => {
        const info = config.galleries?.[mount.dataset.photoGallery];
        const items = Array.isArray(info?.items) ? info.items.filter(item => item && item.enabled !== false) : [];
        if (!info || info.enabled === false || !items.length) { mount.hidden = true; return; }
        const group = [];
        const grid = node('div', 'photo-grid');
        items.forEach((item, index) => grid.append(card(item, index, group)));
        if (info.title || info.description) {
            mount.classList.add('photo-gallery-with-heading');
            const heading = node('div', 'photo-gallery-heading');
            if (info.title) heading.append(node('h3', '', info.title));
            if (info.description) heading.append(node('p', '', info.description));
            mount.replaceChildren(heading, grid);
        } else {
            mount.classList.remove('photo-gallery-with-heading');
            mount.replaceChildren(grid);
        }
    });
})();
