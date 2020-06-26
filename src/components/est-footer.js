import {fetchSocials} from '../cms.js';
import config from '../../est.config.yaml';
import facebook from '../../assets/social/fb.svg';
import twitter from '../../assets/social/twitter.svg';
import instagram from '../../assets/social/insta.svg';
import github from '../../assets/social/github.svg';
import website from '../../assets/social/website.svg';

const template = document.createElement('template');
template.innerHTML = `
<footer>
    <div class="est-footer">
        <div class="est-footer__item est-footer__item--social"></div>
        <div class="est-footer__item est-footer__item--extra">
            Made with love by HackGT
        </div>
    </div>
    <div class="est-footer__gh-issue">
      Found a bug?
      <a href="${config.repo}/issues/new" target="_blank">File an issue!</a>
    </div>
</footer>
`;

/**
 * Class representing the `<est-footer>` custome element
 *
 * TODO
 */
class EstFooter extends HTMLElement {
  /**
       * @constructor
       */
  constructor() {
    super();

    const el = template.content.cloneNode(true);
    this.appendChild(el);

    fetchSocials()
        .then((data) => this._genHtml(data));
  }

  /**
   * TODO
   * @param {Object} socials
   */
  _genHtml(socials) {
    const socialContainer = this.querySelector('.est-footer__item--social');

    for (const social of socials) {
      const socialItem = document.createElement('a');
      socialItem.href = social.url;
      socialItem.target = '_blank';

      const socialIcon = document.createElement('img');
      let icon;
      switch (social.name) {
        case 'facebook': icon = facebook; break;
        case 'twitter': icon = twitter; break;
        case 'instagram': icon = instagram; break;
        case 'github': icon = github; break;
        case 'website': icon = website; break;
      }
      socialIcon.src = icon;

      socialItem.appendChild(socialIcon);
      socialContainer.appendChild(socialItem);
    }
  }
}

customElements.define('est-footer', EstFooter);
