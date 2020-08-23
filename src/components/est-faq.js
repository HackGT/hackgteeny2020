import {fetchCms} from '../cms.js';

const query = `
{
    allFAQs (where: { hackathon: { name: "HackGTeeny 2020" } }) {
        question
        answer
    }
}`;

/**
 * Class representing the est-faq custom element
 *
 * @example
 * <div>
 *    <!-- This will fetch FAQs from CMS, and generate HTML from it -->
 *    <est-faq></est-faq>
 * </div>
 *
 */
class EstFaq extends HTMLElement {
  /**
   * Fetches FAQs from CMS, and generates HTML by invoking `_genHTML()`
   */
  constructor() {
    super();

    fetchCms(query)
        .then((data) => this._genHtml(data.allFAQs));
  }

  /**
   * @typedef {Object} Faq
   * @property {String} question
   * @property {String} answer
   */

  /**
   * Generates HTML from Faqs
   * @param {Faq[]} faqs - The list of faqs for which HTML is to be generated
   */
  _genHtml(faqs) {
    this.faqs = faqs;
    const container = document.createElement('div');
    container.classList.add('est-faq');

    this.faqs.forEach((faq) => {
      const faqContainer = document.createElement('div');
      faqContainer.classList.add('est-faq__container');

      const q = document.createElement('div');
      q.classList.add('est-faq__container__item--q');

      const question = document.createElement('div');
      question.innerHTML = faq.question;
      question.classList.add('est-faq__container__item');
      question.classList.add('est-faq__container__item--question');

      const questionContainer = document.createElement('div');
      questionContainer.classList.add('est-faq__container__item--question-container');
      questionContainer.appendChild(q);
      questionContainer.appendChild(question);

      const a = document.createElement('div');
      a.classList.add('est-faq__container__item--a');

      const answer = document.createElement('div');
      answer.innerHTML = faq.answer;
      answer.classList.add('est-faq__container__item');
      answer.classList.add('est-faq__container__item--answer');

      const answerContainer = document.createElement('div');
      answerContainer.classList.add('est-faq__container__item--answer-container');
      answerContainer.appendChild(answer);
      answerContainer.appendChild(a);

      faqContainer.appendChild(questionContainer);
      faqContainer.appendChild(answerContainer);

      container.appendChild(faqContainer);
    });
    this.appendChild(container);
  }
}

customElements.define('est-faq', EstFaq);
