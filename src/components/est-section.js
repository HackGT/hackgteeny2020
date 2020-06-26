const template = document.createElement('template');
template.innerHTML = `
<style>
    .est-section__container {
        padding: 0px;
        margin: 0px;
        background: var(--background-color);
        color: var(--primary-color-1);
    }
</style>
<div class="est-section__container">
    <slot></slot>
</div>
`;

class EstSection extends HTMLElement {
  constructor() {
    super();
    const container = template.content.cloneNode(true);

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(container);
    this.updateStyles();
  }

  // TODO add attributeChangedCallback
  updateStyles() {
    const padding = this.getAttribute('padding') ? this.getAttribute('padding') :
      'var(--content-padding)';
    const margin = this.getAttribute('margin') ? this.getAttribute('margin') :
      'var(--content-margin)';
    const background = this.getAttribute('background') ? this.getAttribute('background') :
      'var(--background-color)';
    const color = this.getAttribute('color') ? this.getAttribute('color') :
      'var(--primary-color-1)';

    this.shadowRoot.querySelector('style').textContent = `
            .est-section__container {
                padding: ${padding};
                margin: ${margin};
                background: ${background};
                color: ${color};
            }`;
  }
}

customElements.define('est-section', EstSection);
