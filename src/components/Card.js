export class Card {
    constructor({data, cardTemplateSelector, handleCardClick, userId, handleDeleteIconClick, handleSetLike, handleRemoveLike}){
      this._name = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._userId = userId;
      this._cardId = data._id;
      this._cardOwnerId = data.owner._id;
      this._cardTemplateSelector = cardTemplateSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._likes = data.likes;
      this._handleSetLike = handleSetLike;
      this._handleRemoveLike = handleRemoveLike;
    }
    
    _getTemplate(){
      const newCard = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
      return newCard;
    }
    
    createCard(){
      this._element = this._getTemplate();
        
      this._elementTitle = this._element.querySelector('.element__title');
      this._elementImage = this._element.querySelector('.element__img');
      this._elementLike = this._element.querySelector('.element__like-btn');
      this._elementDelete = this._element.querySelector('.element__delete-btn');
      this._likesNumber = this._element.querySelector('.element__likes-number')
       
      this._elementTitle.textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._hasDeleteBtn();
      this._isCardLiked();
      this._likesNumber.textContent = this._likes.length;
      this._setEventListeners();
    
      return this._element;
    }

    deleteCard(){
      this._element.remove();
      this._element = null;
    };
      
    _setEventListeners(){
      this._elementLike.addEventListener('click', () => {
        if (this._elementLike.classList.contains('element__like-btn_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
      
      this._elementDelete.addEventListener('click', () => {this._handleDeleteIconClick(this._cardId)});
    
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)});
    }

    _isCardLiked() {
      if (this._likes.some((user) => {
        return this._userId === user._id;
      })) {
        this._elementLike.classList.add('element__like-btn_active');
      }
    }
  
    handleLikeCard(data) {
      this._likes = data.likes;
      this._likesNumber.textContent = this._likes.length;
      this._elementLike.classList.toggle('element__like-btn_active');
    }

    _hasDeleteBtn() {
      if (this._userId !== this._cardOwnerId) {
        this._elementDelete.remove();
      }
    }
}