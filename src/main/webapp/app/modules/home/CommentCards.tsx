import React, { useEffect } from 'react';
import $ from 'jquery';
import './CommentCards.scss'; // Assuming you place the CSS in CommentCards.css

const CommentCards: React.FC = () => {
  useEffect(() => {
    $.fn.commentCards = function () {
      return this.each(function () {
        const $this = $(this);
        const $cards = $this.find('.card');
        let $current = $cards.filter('.card--current');
        let $next;

        $cards.on('click', function () {
          if (!$current.is(this)) {
            $cards.removeClass('card--current card--out card--next');
            $current.addClass('card--out');
            $current = $(this).addClass('card--current');
            $next = $current.next();
            $next = $next.length ? $next : $cards.first();
            $next.addClass('card--next');
          }
        });

        if (!$current.length) {
          $current = $cards.last();
          $cards.first().trigger('click');
        }

        $this.addClass('cards--active');
      });
    };

    $('.cards').commentCards();
  }, []);

  return (
    <ul className="cards">
      <li className="card card--current">
        <h1>BMW</h1>
        <img
          src="data:image/jpeg;base64,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"
          className="cust"
        ></img>
        <p>
          ServoCRM has transformed the way we manage our customer relationships. Their intuitive platform and excellent support have
          streamlined our processes and boosted our productivity. We highly recommend ServoCRM to any business looking to enhance their CRM
          capabilities.
        </p>
      </li>
      <li className="card">
        <h1>Crimsoune Club</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCC7ccNQvTA04JQq9bjRFPOqKkRZTWBeNQPg&s" className="cust"></img>
        <p>
          Using ServoCRM has been a game-changer for our business. The robust features and user-friendly interface make managing customer
          data a breeze. The insights and analytics provided have helped us make informed decisions and drive growth.
        </p>
      </li>
      <li className="card">
        <h1>Titan</h1>
        <img
          src="data:image/png;base64,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"
          className="cust"
        ></img>
        <p>
          "As a customer of ServoCRM, we've experienced unparalleled efficiency in managing our client interactions. The intuitive design
          and powerful tools have streamlined our processes, saving us time and effort. The support team is responsive and always ready to
          assist.
        </p>
      </li>
      <li className="card">
        <h1>Red Bull</h1>
        <img
          src="data:image/png;base64,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"
          className="cust"
        ></img>
        <p>
          Working with ServoCRM has been a game-changer for our sales team. The CRM's advanced analytics and reporting tools have provided
          us with invaluable insights into our customer base. We've seen a significant increase in customer satisfaction and retention since
          implementing ServoCRM.
        </p>
      </li>
    </ul>
  );
};

export default CommentCards;
