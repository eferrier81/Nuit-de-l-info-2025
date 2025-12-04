// quiz-engine.js
// Moteur générique pour charger les questions NIRD, gérer l'état du quiz
// et exposer une API simple à la page `quiz.html`.

const NIRD_QUIZ_STORAGE_KEY = 'nird-village-progress-v1';

const BADGES = [
  { id: 1, label: 'Novice de la Potion Libre', minScore: 0 },
  { id: 2, label: 'Apprenti Résistant Numérique', minScore: 60 },
  { id: 3, label: 'Gardien du Village Libre', minScore: 120 },
  { id: 4, label: 'Stratège NIRD', minScore: 180 },
  { id: 5, label: "Libérateur d'écoles", minScore: 240 },
];

export class QuizEngine {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.answers = [];
  }

  static async loadFromJSON(url) {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error('Impossible de charger les questions du quiz.');
    }
    const data = await response.json();
    return new QuizEngine(data);
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  getProgressRatio() {
    if (!this.questions.length) return 0;
    return this.currentIndex / this.questions.length;
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  answerCurrent(indexChoice) {
    const question = this.getCurrentQuestion();
    if (!question) return null;

    const isCorrect = indexChoice === question.answer;
    const delta = isCorrect ? question.points : 0;

    if (isCorrect) {
      this.score += question.points;
      this.correctCount += 1;
    } else {
      this.incorrectCount += 1;
    }

    this.answers.push({
      questionId: question.id,
      chosenIndex: indexChoice,
      isCorrect,
      pointsEarned: delta,
    });

    const feedback = {
      isCorrect,
      pointsEarned: delta,
      tip: question.tip,
      correctAnswerIndex: question.answer,
    };

    this.currentIndex += 1;
    return feedback;
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  getBadge() {
    let best = BADGES[0];
    for (const badge of BADGES) {
      if (this.score >= badge.minScore && badge.minScore >= best.minScore) {
        best = badge;
      }
    }
    return best;
  }

  toSummary() {
    return {
      score: this.score,
      totalQuestions: this.getTotalQuestions(),
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      badge: this.getBadge(),
    };
  }
}

export function loadStoredProgress() {
  try {
    const raw = localStorage.getItem(NIRD_QUIZ_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erreur de lecture du score NIRD dans localStorage', e);
    return null;
  }
}

export function storeProgress(summary) {
  try {
    const existing = loadStoredProgress();
    const bestScore = existing && existing.score && existing.score > summary.score
      ? existing
      : summary;
    localStorage.setItem(NIRD_QUIZ_STORAGE_KEY, JSON.stringify(bestScore));
  } catch (e) {
    console.error('Erreur de sauvegarde du score NIRD dans localStorage', e);
  }
}

export function buildShareText(summary) {
  const badge = summary.badge;
  const score = summary.score;
  const total = summary.totalQuestions;
  const correct = summary.correctCount;
  const base =
    `J'ai obtenu le badge "${badge.label}" dans le Village Numérique Résistant ` +
    `avec ${score} points (${correct}/${total} bonnes réponses) ! ` +
    `Et toi, jusqu'où libéreras-tu ton école ?`;
  const url = window.location.origin + window.location.pathname.replace('quiz.html', '');
  return `${base} ${url}`;
}
