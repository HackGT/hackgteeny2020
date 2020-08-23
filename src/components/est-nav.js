const navBlockClass = 'est-nav__list';

const template = document.createElement('template');
template.innerHTML = `
<nav class="est-nav__nav">
    <div class="est-nav__ham">
        <svg id="est-nav__ham" class="ham hamRotate ham4" 
            viewBox="0 0 100 100" width="80" >
            <path
                fill="#fff"
                class="line top"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
            <path
                fill="#fff"
                class="line middle"
                d="m 70,50 h -40" />
            <path
                fill="#fff"
                class="line bottom"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
        </svg>
    </div>
    <div class="${navBlockClass} ${navBlockClass}--center est-nav__hidden--mobile"></div>
</nav>
`;

/**
 * Class representing the `<est-nav>` custom element
 *
 * This element autogenerates a responsive nav bar from `<est-section>`s in
 * the HTML document. It uses the `name` attribute of the `<est-section>` as
 * the display text, and links to that section.
 *
 * The navbar itself is divided into three sections.
 *
 * The left section is left-aligned, the right section is right-aligned, and
 * the center section is, well, you guessed it, center aligned.
 *
 * To center section is auto-populated with links to the sections.
 *
 * To add elements to either the left or the right section, simply add a
 * `for` attribute to the container of elements that you want to add, and set it
 * equal to `left` or `right`. Look at the example below for more details
 *
 * @example
 * <est-nav>
 *    <div for="left">
 *      <span>Hello from the left</span>
 *    </div>
 *    <div for="right">
 *      <span>olleH from the right</span>
 *    </div>
 * <est-nav>
 */
class EstNav extends HTMLElement {
  /**
     * @constructor
     */
  constructor() {
    super();

    const el = template.content.cloneNode(true);
    this.appendChild(el);

    // Exposing utilties
    this.nav = this.querySelector('nav');
    this.navLeft = this.querySelector('[for="left"]');
    this.navCenter = this.querySelector(`.${navBlockClass}--center`);
    this.navRight = this.querySelector('[for="right"]');
    this.sectionIndex = 0;

    if (this.navLeft) {
      this.navLeft.classList.add(`${navBlockClass}`);
      this.navLeft.classList.add(`${navBlockClass}--left`);
      this.nav.insertBefore(this.navLeft, this.navCenter);
    }

    if (this.navRight) {
      this.navRight.classList.add(`${navBlockClass}`);
      this.navRight.classList.add(`${navBlockClass}--right`);
      this.nav.appendChild(this.navRight);
    }

    const ham = this.querySelector('#est-nav__ham');
    const list = this.querySelector('.est-nav__list--center');
    ham.addEventListener('click', () => {
      ham.classList.toggle('active');
      list.classList.toggle('est-nav__display--mobile');
    });
    list.addEventListener('click', () => {
      ham.classList.toggle('active');
      list.classList.toggle('est-nav__display--mobile');
    });

    // Private fieleds used to manage intersections with viewport
    this._observer = null;
    this._targets = [];
  }

  /**
     * This function is triggered whenever a new section intersects the
     * bottom of the nav bar.
     *
     * If you want to style any section of the webpage when this event happens,
     * modify the code in this function.
     *
     * @param {number} i The index of the section that intersected the bottom of
     * the nav bar
     */
  _setSectionIndex(i) {
    const event = new CustomEvent('change-section', {
        detail: {
            section: this._targets[i].section,
            curr: this._targets[i].section.getAttribute('name'),
            prev: this._targets[this.sectionIndex].section.getAttribute('name'),
            link: this._targets[i].link
        }
    });
    const currentLink = this._targets[this.sectionIndex].link;
    const newLink = this._targets[i].link;
    
    /* BEGIN style nav */

    // NOTE: the links can be null because of sections not on the nav bar
    // this.nav.style.background = this._targets[i].section
    //     .getAttribute('background');
    
    if (currentLink) {
      currentLink.classList.remove('est-nav__current');
    }

    if (newLink) {
      newLink.classList.add('est-nav__current');
    }

    /* END style nav */

    this.sectionIndex = i;

    document.body.dispatchEvent(event);
  }

  /**
     * This function runs when the component has been mounted to the DOM.
     *
     * It sets up an IntersectionObserver that determines the section
     * currently in the viewport. It looks for `<est-section>`s in the html
     * document with a `name` attribute and generates links to those
     * sections using the value of the `name` attribute as the text.
     */
  connectedCallback() {
    // create observer
    this._observer = new IntersectionObserver(
        this._observerCallback.bind(this), {
          rootMargin: `-${this.clientHeight}px 0px`,
        });

    // populate center
    for (const section of document.querySelectorAll('est-section')) {
      let link = null;

      if (section.getAttribute('name')) {
        // create the anchor tag to the section and append to nav bar
        link = document.createElement('a');
        link.innerHTML = section.getAttribute('name');
        link.href = `#${section.getAttribute('name')}`;
        section.id = section.getAttribute('name');
        this.navCenter.appendChild(link);
      }

      // observe this section
      this._observer.observe(section);

      // bookeeping for observer
      this._targets.push({
        section: section,
        link,
      });
    }

    this._setSectionIndex(0);
  }

  /**
     * This function is called when the element is dismounted from the DOM
     * It unobserves the targets of the IntersectionObserver. We do this
     * because we are good citizens of the web :)
     */
  disconnectedCallback() {
    for (const target of this._targets) {
      this._observer.unobserve(target.section);
    }
  }

  /**
     * This weird function (from a code perspective) detemines what the
     * current section index is. Setting the current section index in turn
     * invokes the setter (documented above).
     *
     * @param {Object} entries The entries of the IntersectionObserver
     * callback
     */
  _observerCallback(entries) {
    entries.forEach((entry) => {
      const i = this.sectionIndex;
      if (!entry.isIntersecting && entry.target === this._targets[i].section) {
        this._setSectionIndex((i + 1) % this._targets.length);
      } else if (i > 0 && entry.target === this._targets[i - 1].section) {
        this._setSectionIndex(i - 1);
      }
    });
  }
}

customElements.define('est-nav', EstNav);