'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var onInputFileChange = function (input, img) {
    var file = input.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          img.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
    return matches;
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarFileChooser.addEventListener('change', function () {
    onInputFileChange(avatarFileChooser, avatarPreview);
  });

  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  photoFileChooser.addEventListener('change', function () {
    var photoDiv = photoContainer.querySelector('.ad-form__photo');
    var photo = photoDiv.querySelector('img');
    if (!photo) {
      photo = document.createElement('img');
      photo.style.width = 100 + '%';
      photo.style.height = 100 + '%';
      photo.style['object-fit'] = 'cover';
      if (onInputFileChange(photoFileChooser, photo)) {
        photoDiv.appendChild(photo);
      }
    } else {
      var newPhotoDiv = photoDiv.cloneNode(true);
      if (onInputFileChange(photoFileChooser, newPhotoDiv.querySelector('img'))) {
        photoContainer.appendChild(newPhotoDiv);
      }
    }
  });

  window.upload = {
    avatarPreview: avatarPreview,
    photoContainer: photoContainer
  };
})();
