export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.owner._id;
    this._myId = data.myId;
    this._cardId = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  // метод создания шаблона карточки
  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place__element')
      .cloneNode(true);
    return placeTemplate;
  }

  // метод создания карточки из шаблона
  renderPlace() {
    this._element = this._getTemplate();
    this._element.querySelector('.place__title_card').textContent = this._name;
    this._cardImage = this._element.querySelector('.place__image_card');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._trashIcon = this._element.querySelector('.place__trash_button');
    this._likeIcon = this._element.querySelector('.place__like-icon');
    this._likesCounter = this._element.querySelector('.place__like-counter');
    this._likesCounter.textContent = this._likes.length;
    this._setEventListeners();
    this._removeTrashIcon();
    this._checkMyLikes();
    return this._element;
  }

  // метод убирает значок мусора у чужих карточек
  _removeTrashIcon() {
    if (this._id !== this._myId) {
      this._trashIcon.remove();
    }
  }

  // метод ищет в массиве лайков мой лайк и закрашивает иконку при загрузке страницы
  _checkMyLikes() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._likeIcon.classList.add('place__heart_black');
      }
    });
  }

  // метод устанавливает в отображение карточки количество лайков
  renderLikes = (likes) => {
    this._likesCounter.textContent = likes.length;
  };

  // метод переключает цвет иконки лайка
  toggleLike = () => {
    this._likeIcon.classList.toggle('place__heart_black');
  };

  // метод проверяет, закрашена ли иконка лайка
  isLiked = () => {
    if (this._likeIcon.classList.contains('place__heart_black')) {
      return true;
    }
  };

  // метод удаляет карточку
  removePlace() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeIcon.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
    this._trashIcon.addEventListener('click', () => {
      this._handleTrashClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
