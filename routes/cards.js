const express = require('express');
const router = express.Router();
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor( Math.random() * numberOfCards);
    res.redirect(`/cards/${flashCardId}?side=question`);
});

router.get('/:id', (req, res) => {
    const side = req.query.side;
    const id = req.params.id;
    const text = cards[id][side];
    const hint = cards[id].hint;
    const name = req.cookies.username;
    const templateData = {id, text, name};

    if( side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';  
    }

    res.render('card', templateData);
});

module.exports = router;