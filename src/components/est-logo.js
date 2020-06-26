import logo from '../../assets/brand/hackgt-logo-light.svg';

/**
 * Class representing the `<est-logo>` custom element
 *
 * ### Attributes
 * | name     | description        |
 * |----------|--------------------|
 * | `height` | Height of the logo |
 * | `width`  | Width of the logo  |
 *
 * @example
 * <est-logo height="25px" width="50px"></est-logo>
 */
class EstLogo extends HTMLElement {
  /**
   * Pulls the HackGT logo from CMS, wraps it in an anchor tag that links to
   * [https://hack.gt](https://hack.gt)
   */
  constructor() {
    super();

    const a = document.createElement('a');
    a.href = 'https://www.hack.gt';
    a.target = '_blank';

    const img = document.createElement('img');
    img.src = logo;
    img.style.height = this.getAttribute('height') ?
        this.getAttribute('height') : '50px';
    img.style.width = this.getAttribute('width');

    a.appendChild(img);
    this.appendChild(a);
  }
}

customElements.define('est-logo', EstLogo);
