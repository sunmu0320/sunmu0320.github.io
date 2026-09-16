// Preserve the media frame on a failed future asset, without inventing visuals.
document.querySelectorAll('.media-asset').forEach(asset => {
  const showError = () => {
    const frame = asset.closest('.media-frame');
    if (!frame || frame.dataset.failed) return;
    frame.dataset.failed = 'true';
    const message = document.createElement('div');
    message.className = 'media-placeholder';
    message.setAttribute('role', 'status');
    message.textContent = 'Media unavailable. Please check the asset file.';
    asset.hidden = true;
    frame.append(message);
  };
  asset.addEventListener('error', showError);
  asset.querySelectorAll('source').forEach(source => source.addEventListener('error', showError));
  if (asset.tagName === 'IMG' && asset.complete && !asset.naturalWidth) showError();
});

// Manual video collections: changing selection stops the outgoing recording.
document.querySelectorAll('[data-video-collection]').forEach(collection => {
  const panels = [...collection.querySelectorAll('[data-video-panel]')];
  const choices = [...collection.querySelectorAll('[data-video-select]')];
  let current = 0;
  const select = index => {
    current = (index + panels.length) % panels.length;
    panels.forEach((panel, i) => {
      if (i !== current) panel.querySelectorAll('video').forEach(video => video.pause());
      panel.hidden = i !== current;
      choices[i].setAttribute('aria-pressed', String(i === current));
    });
    collection.querySelector('[data-video-status]').textContent = `${current + 1} / ${panels.length}`;
  };
  choices.forEach((button, i) => button.addEventListener('click', () => select(i)));
  collection.querySelector('[data-video-prev]').addEventListener('click', () => select(current - 1));
  collection.querySelector('[data-video-next]').addEventListener('click', () => select(current + 1));
  collection.querySelector('.video-collection__choices').addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1);
    select(next);
    choices[current].focus();
  });
});
