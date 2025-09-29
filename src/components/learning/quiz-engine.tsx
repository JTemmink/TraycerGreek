'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, RotateCcw, ArrowRight } from 'lucide-react';
import type { Quiz, QuizQuestion } from '@/types/content';

interface QuizEngineProps {
  quiz: Quiz;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, any>;
  timeRemaining: number;
  isSubmitted: boolean;
  score: number;
  showResults: boolean;
}

export function QuizEngine({ quiz }: QuizEngineProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: quiz.timeLimit ? quiz.timeLimit * 60 : 0,
    isSubmitted: false,
    score: 0,
    showResults: false,
  });

  const currentQuestion = quiz.questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / quiz.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (quiz.timeLimit && quizState.timeRemaining > 0 && !quizState.isSubmitted) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz.timeLimit, quizState.timeRemaining, quizState.isSubmitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (quizState.timeRemaining === 0 && !quizState.isSubmitted) {
      handleSubmit();
    }
  }, [quizState.timeRemaining, quizState.isSubmitted]);

  const handleAnswerSelect = (questionIndex: number, answer: any) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setQuizState(prev => ({
      ...prev,
      isSubmitted: true,
      score,
      showResults: true,
    }));
  };

  const calculateScore = (): number => {
    let correctAnswers = 0;
    
    quiz.questions.forEach((question, index) => {
      const userAnswer = quizState.answers[index];
      if (isAnswerCorrect(question, userAnswer)) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const isAnswerCorrect = (question: QuizQuestion, userAnswer: any): boolean => {
    if (!userAnswer) return false;
    
    switch (question.type) {
      case 'multiple_choice':
        return userAnswer === question.correctAnswer;
      case 'fill_in_blank':
        return userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
      case 'matching':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      case 'drag_drop':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      default:
        return false;
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: QuizQuestion, questionIndex: number) => {
    const userAnswer = quizState.answers[questionIndex];
    const isCorrect = quizState.showResults ? isAnswerCorrect(question, userAnswer) : null;

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium">{question.question}</p>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    userAnswer === option
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-accent'
                  } ${
                    quizState.showResults
                      ? option === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : userAnswer === option
                        ? 'border-red-500 bg-red-50'
                        : ''
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={userAnswer === option}
                    onChange={() => handleAnswerSelect(questionIndex, option)}
                    disabled={quizState.showResults}
                    className="text-primary"
                  />
                  <span className="text-greek-600 font-greek text-lg">{option}</span>
                  {quizState.showResults && option === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                  {quizState.showResults && userAnswer === option && option !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 'fill_in_blank':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium">
              {question.question.split('___').map((part, index) => (
                <span key={index}>
                  {part}
                  {index < question.question.split('___').length - 1 && (
                    <input
                      type="text"
                      value={userAnswer || ''}
                      onChange={(e) => handleAnswerSelect(questionIndex, e.target.value)}
                      disabled={quizState.showResults}
                      className={`mx-2 px-2 py-1 border rounded ${
                        quizState.showResults
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Your answer"
                    />
                  )}
                </span>
              ))}
            </p>
            {quizState.showResults && (
              <div className="text-sm text-muted-foreground">
                Correct answer: <span className="font-greek text-greek-600">{question.correctAnswer}</span>
              </div>
            )}
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Greek Terms</h4>
                <div className="space-y-2">
                  {question.leftColumn?.map((item, index) => (
                    <div key={index} className="p-2 bg-muted rounded">
                      <span className="font-greek text-greek-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">English Translations</h4>
                <div className="space-y-2">
                  {question.rightColumn?.map((item, index) => (
                    <div key={index} className="p-2 bg-muted rounded">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Drag and drop to match the Greek terms with their English translations.
            </p>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (quizState.showResults) {
    const passed = quizState.score >= quiz.passingScore;
    
    return (
      <div className="space-y-6">
        <Card className={passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {passed ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${passed ? 'text-green-900' : 'text-red-900'}`}>
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h3>
                <p className={`${passed ? 'text-green-700' : 'text-red-700'}`}>
                  You scored {quizState.score}% on this quiz.
                  {passed ? ' Well done!' : ` You need ${quiz.passingScore}% to pass.`}
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button className="bg-greek-600 hover:bg-greek-700">
                  Continue Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Question {index + 1}</span>
                    {isAnswerCorrect(question, quizState.answers[index]) ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  {renderQuestion(question, index)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-muted-foreground">{quiz.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {quiz.timeLimit && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">
                    {formatTime(quizState.timeRemaining)}
                  </span>
                </div>
              )}
              <Badge variant="outline">
                Question {quizState.currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardContent className="pt-6">
          {renderQuestion(currentQuestion, quizState.currentQuestion)}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={quizState.currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {quizState.currentQuestion === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-greek-600 hover:bg-greek-700"
                  disabled={Object.keys(quizState.answers).length === 0}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!quizState.answers[quizState.currentQuestion]}
                >
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
