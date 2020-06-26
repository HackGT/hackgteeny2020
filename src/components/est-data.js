import {fetchBlock} from '../cms.js';
import {Converter} from 'showdown';

/** Class representing the `<est-data>` custom element
  *
  * Use this custom element to pull data from a Block in CMS.
  * Blocks can be found under the **Block** list in CMS.
  *
  * To specify which block's content you want, add the `data-block`
  * attribute to a container that will ultimately contain the content, and
  * set it equal to the `slug` for the corresponding block. The `slug` can
  * be easily found in CMS.
  * `<est-data>` will fetch the content for the specified block, and will
  * insert it into the container.
  *
  * The content from CMS is in markdown. `<est-data>` uses
  * [showdownjs](http://showdownjs.com/) to convert the markdown to HTML.
  *
  * @example
  * <est-data>
  *   <!-- This will fetch the content of the "About" block from CMS, and will
  *   insert it into the div. Any markdown will be converted into HTML.-->
  *   <div data-block="about"></div>
  *
  *   <!-- Similary, this will fetch the content of the "Message" block -->
  *   <div data-block="message"></div>
  * </est-data>
  **/
class EstData extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();

    this.blockNodes = this.querySelectorAll('[data-block]');
    this.metaNodes = this.querySelectorAll('[data-meta]');

    this._populateBlockNodes();
  }

  /**
   * Fetches blocks from CMS, converts any markdown to HTML, and inserts it
   * into the corresponding node
   */
  async _populateBlockNodes() {
    const converter = new Converter();
    for (const node of this.blockNodes) {
      const slug = node.getAttribute('data-block');
      const data = await fetchBlock(slug);
      node.innerHTML = converter.makeHtml(data.content);
    }

    for (const node of this.metaNodes) {
      node.innerHTML = `[warning]: pulling data from meta nodes not 
implemented yet`;
    }
  }
}

customElements.define('est-data', EstData);
