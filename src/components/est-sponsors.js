import {fetchCms} from '../cms.js';
const query = `
{
    allSponsors 
    {
        name
        website
        image 
        {
            publicUrl 
        }
    }
}
`;

class EstSponsors extends HTMLElement {
  constructor() {
    super();

    fetchCms(query)
        .then((data) => this._genHtml(data.allSponsors));
  }

  _genHtml(sponsors) {
    const container = document.createElement('div');
    for (const sponsor of sponsors) {
      const sponsorContainer = document.createElement('div');
      sponsorContainer.style.display = 'inline-block';

      const sponsorImg = document.createElement('img');
      sponsorImg.src = sponsor.image.publicUrl;
      sponsorImg.style.height = '200px';

      const sponsorWebsite = document.createElement('a');
      sponsorWebsite.href = sponsor.website;
      sponsorWebsite.target = '_blank';

      sponsorWebsite.appendChild(sponsorImg);
      sponsorContainer.appendChild(sponsorWebsite);
      container.appendChild(sponsorContainer);
    }
    this.appendChild(container);
  }
}

customElements.define('est-sponsors', EstSponsors);
