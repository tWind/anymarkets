"use strict";


var AmAppImageCropModal = function () {
  let modal, currentThumb;
  const cropContainer = document.getElementById('crop_image_container'),
    cropResult = document.getElementById('crop_image_result');

  // remove thumbs
  const handleDeleteThumb = () => {
    const thumbsList = modal.querySelectorAll('.crop-thumb');
    let currentImageUrl;

    currentThumb = [...thumbsList].find(thumb => {
      return thumb.classList.contains('is-active');
    });

    thumbsList.forEach(item => {
      const removeButton = item.querySelector('[data-thumb-action="remove"]');

      item.addEventListener('click', function() {
        if(item.classList.contains('is-valid')) return;

        thumbsList.forEach(thumb => {
          thumb.classList.remove('is-active');
        });

        item.classList.add('is-active');
        currentThumb = item;

        const currentThumbImage = currentThumb.querySelector('.crop-thumb-wrapper');

        currentImageUrl = currentThumbImage.style.backgroundImage;

        cropContainer.style.backgroundImage = currentImageUrl;
        cropResult.style.backgroundImage = currentImageUrl;
      });

      removeButton.addEventListener('click', function(event) {
        event.stopPropagation();

        item.remove();
      });
    });
  }

  // crop options
  const handleCropOptions = () => {
    const cropPanels = modal.querySelectorAll('.crop-options');

    cropPanels.forEach(pane => {
      const cropOptionsButtons = pane.querySelectorAll('.crop-option'),
        cropText = pane.querySelector('.crop-text');

      cropOptionsButtons.forEach(button => {
        button.addEventListener('click', function() {
          const cropInfo = button.dataset.cropText;

          cropOptionsButtons.forEach(option => {
            option.classList.remove('is-active');
          });
  
          button.classList.add('is-active');
          cropText.innerHTML = cropInfo;
        })
      });
    });
  }

  return {
    init: function () {
      modal = document.getElementById('am_modal_crop');

      if(!modal) return;

      handleDeleteThumb();
      handleCropOptions();
    },
  };
}();

AmAppImageCropModal.init();
