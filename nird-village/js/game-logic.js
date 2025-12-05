// game-logic.js
// Logique d'interface pour le quiz NIRD :
// - affichage des questions
// - feedback immédiat
// - barre de progression
// - badges et partage social

import { QuizEngine, storeProgress, buildShareText, loadStoredProgress } from './quiz-engine.js';

const progressBar = document.getElementById('quiz-progress-bar');
const progressLabel = document.getElementById('quiz-progress-label');
const scoreLabel = document.getElementById('quiz-score');
const questionText = document.getElementById('quiz-question');
const choicesList = document.getElementById('quiz-choices');
const feedbackBox = document.getElementById('quiz-feedback');
const feedbackMessage = document.getElementById('quiz-feedback-message');
const feedbackTip = document.getElementById('quiz-feedback-tip');
const nextButton = document.getElementById('quiz-next');
const endScreen = document.getElementById('quiz-end');
const endScore = document.getElementById('quiz-end-score');
const endBadge = document.getElementById('quiz-end-badge');
const endDetails = document.getElementById('quiz-end-details');
const shareButtons = document.querySelectorAll('[data-share]');
const bestScoreLabel = document.getElementById('quiz-best-score');

let engine = null;
let isAwaitingNext = false;

async function initQuiz() {
  try {
    engine = await QuizEngine.loadFromJSON('../data/questions.json');
    const stored = loadStoredProgress();
    if (stored && bestScoreLabel) {
      bestScoreLabel.textContent = `${stored.score} pts - ${stored.badge.label}`;
    }
    renderCurrentQuestion();
    updateProgressUI();
  } catch (error) {
    console.error(error);
    if (questionText) {
      questionText.textContent =
        'Impossible de charger le quiz pour le moment. Vérifie la connexion ou réessaie plus tard.';
    }
  }
}

function renderCurrentQuestion() {
  if (!engine) return;
  const question = engine.getCurrentQuestion();
  if (!question) {
    showEndScreen();
    return;
  }

  questionText.textContent = question.question;
  choicesList.innerHTML = '';
  feedbackBox.hidden = true;
  isAwaitingNext = false;
  nextButton.disabled = true;

  question.choices.forEach((choiceText, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = choiceText;
    btn.addEventListener('click', () => handleAnswer(index, btn));
    li.appendChild(btn);
    choicesList.appendChild(li);
  });
}

function handleAnswer(selectedIndex, btnElement) {
  if (!engine || isAwaitingNext) return;
  const feedback = engine.answerCurrent(selectedIndex);
  if (!feedback) return;

  // Mise à jour score et progression
  scoreLabel.textContent = engine.score.toString();
  updateProgressUI();

  // Met en évidence la bonne / mauvaise réponse
  const buttons = choicesList.querySelectorAll('button.choice-btn');
  buttons.forEach((b, index) => {
    b.disabled = true;
    if (index === feedback.correctAnswerIndex) {
      b.classList.add('choice-btn--correct');
    }
  });

  if (!feedback.isCorrect) {
    btnElement.classList.add('choice-btn--wrong');
  }

  // Feedback pédagogique
  feedbackBox.hidden = false;
  feedbackMessage.textContent = feedback.isCorrect
    ? 'Bravo, tu viens de renforcer le Village Libre !'
    : 'Ce n’est pas la bonne réponse, mais chaque erreur fait progresser la résistance.';
  feedbackBox.classList.toggle('quiz-feedback--success', feedback.isCorrect);
  feedbackBox.classList.toggle('quiz-feedback--error', !feedback.isCorrect);
  feedbackTip.textContent = feedback.tip;

  isAwaitingNext = true;
  nextButton.disabled = false;
}

function updateProgressUI() {
  if (!engine) return;
  const ratio = engine.getProgressRatio();
  const percent = Math.round(ratio * 100);
  progressBar.style.width = percent + '%';
  progressLabel.textContent = `${percent}% du village libéré`;
}

function showEndScreen() {
  const summary = engine.toSummary();
  storeProgress(summary);

  document.getElementById('quiz-main').hidden = true;
  endScreen.hidden = false;

  endScore.textContent = `${summary.score} points`;
  endBadge.textContent = summary.badge.label;
  endDetails.textContent = `${summary.correctCount}/${summary.totalQuestions} bonnes réponses.`;

  const stored = loadStoredProgress();
  if (stored && bestScoreLabel) {
    bestScoreLabel.textContent = `${stored.score} pts - ${stored.badge.label}`;
  }

  const shareText = buildShareText(summary);
  shareButtons.forEach((btn) => {
    const network = btn.getAttribute('data-share');
    btn.onclick = () => shareResult(network, shareText);
  });
}

function shareResult(network, text) {
  const encodedText = encodeURIComponent(text);
  let shareUrl = '';

  if (network === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  } else if (network === 'mastodon') {
    shareUrl = `https://mastodon.online/share?text=${encodedText}`;
  } else if (network === 'clipboard') {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Texte de partage copié dans le presse-papiers !');
      })
      .catch(() => {
        alert('Impossible de copier automatiquement. Tu peux sélectionner et copier le texte à la main.');
      });
    return;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'noopener');
  }
}

nextButton.addEventListener('click', () => {
  if (!engine) return;
  if (!isAwaitingNext) return;

  if (engine.isFinished()) {
    showEndScreen();
  } else {
    renderCurrentQuestion();
  }
});

window.addEventListener('DOMContentLoaded', initQuiz);
