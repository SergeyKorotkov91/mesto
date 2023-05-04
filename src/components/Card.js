export class Card {
    constructor(data, cardTemplateSelector, handleCardClick){
      this._name = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._cardTemplateSelector = cardTemplateSelector;
      this._handleCardClick = handleCardClick;
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
       
      this._elementTitle.textContent = this._name;
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
    
      this._setEventListeners();
    
      return this._element;
    }

    _likeCard(){
      this._elementLike.classList.toggle('element__like-btn_active');
    };

    _deleteCard(){
      this._element.remove();
      this._element = null;
    };
      
    _setEventListeners(){
      this._elementLike.addEventListener('click', () => {this._likeCard()});
      
      this._elementDelete.addEventListener('click', () => {this._deleteCard()});
    
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)});
    }

}