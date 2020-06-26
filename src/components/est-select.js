const template = document.createElement('template');
template.innerHTML = `
<div class="est-select">
  <div class="est-select__item">
    <div class="est-select__current"></div>
    <div class="est-select__options est-select__hidden"></div>
  </div>
  <div class="est-select__item est-select__item--dropdown">
    ^
  </div>
</div>
`;

/**
 * TODO
 */
class EstSelect extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    const el = template.content.cloneNode(true);
    this.appendChild(el);
    this.options = this.querySelector('.est-select__options');
    this.current = this.querySelector('.est-select__current');

    const dropdown = this.querySelector('.est-select__item--dropdown');
    this.addEventListener('click', () => {
      this.options.classList.toggle('est-select__hidden');
      dropdown.classList.toggle('est-select__turn');
    });
  }

  /**
   * @param {string} optionTxt
   */
  addOption(optionTxt) {
    this.options.appendChild(this._createOption(optionTxt));
  }

  /**
   * @param {string} optionTxt
   */
  selectOption(optionTxt) {
    const option = this.options.querySelector(`[value=${optionTxt}]`);
    if (option) {
      this.current.innerHTML = option.innerHTML;
    }
  }

  /**
   * @param {string} optionTxt
   * @return {string}
   */
  _createOption(optionTxt) {
    const option = document.createElement('div');
    option.classList.add('est-select__options__option');
    option.innerHTML = optionTxt;
    option.setAttribute('value', optionTxt);
    option.addEventListener('click', () => {
      this.current.innerHTML = option.innerHTML;
      this.dispatchEvent(new Event('change'));
    });
    return option;
  }
}

customElements.define('est-select', EstSelect);
