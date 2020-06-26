const template = document.createElement('template');
template.innerHTML = `
<button class="est-register-btn"> 
</button>
`;

/**
 * Class representing the `<est-register-btn>` element
 *
 * This element ensures that you will never ever mess up
 * linking to the correct registration website. It uses the name of the
 * event, combined with how the domains are usually named for our events to
 * correctly generate the registration link.
 *
 * `<est-register-btn>` will look for a shortened name in `est.config.yaml`.
 * To specify a shortened name, add a `shortened-name` key
 * to `est.config.yaml`.
 * The link generated will be of the form
 * [[shortened-name].registration.hack.gt](https://example.com).
 * It will throw an error if the shortened name is not found.
 *
 * ### Attributes
 * | name   | description                  |
 * |--------|------------------------------|
 * | `text` | Text for the register button |
 * Default text is "Register".
 *
 * @example
 * <est-register-btn text="Register now!"></est-register-btn>
 */
class EstRegisterBtn extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();

    const el = template.content.cloneNode(true);
    const text = this.getAttribute('text') ?
      this.getAttribute('text') : 'Register';
    el.querySelector('button').innerHTML = text;
    this.appendChild(el);
  }
}

customElements.define('est-register-btn', EstRegisterBtn);
