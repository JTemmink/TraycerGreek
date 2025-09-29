'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Target, CheckCircle, PlayCircle } from 'lucide-react';
import type { Lesson } from '@/types/content';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentSection + 1) / lesson.sections.length) * 100;

  const handleSectionComplete = (sectionIndex: number) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
    
    if (sectionIndex < lesson.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleNextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionData = lesson.sections[currentSection];

  return (
    <div className="space-y-6">
      {/* Lesson Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentSection + 1} of {lesson.sections.length} sections
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Section {currentSection + 1}: {currentSectionData.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={completedSections.has(currentSection) ? 'default' : 'secondary'}>
                {completedSections.has(currentSection) ? 'Completed' : 'In Progress'}
              </Badge>
              <Badge variant="outline">
                {currentSectionData.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Section Content */}
            <div className="prose prose-slate max-w-none">
              {currentSectionData.type === 'theory' && (
                <div className="space-y-4">
                  <div 
                    className="lesson-content"
                    dangerouslySetInnerHTML={{ __html: currentSectionData.content }}
                  />
                  
                  {currentSectionData.examples && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Examples</h4>
                      <div className="space-y-2">
                        {currentSectionData.examples.map((example, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-greek-600 font-greek text-lg">
                              {example.greek}
                            </span>
                            <span className="text-muted-foreground">
                              {example.translation}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentSectionData.type === 'exercise' && (
                <div className="space-y-4">
                  <div 
                    className="lesson-content"
                    dangerouslySetInnerHTML={{ __html: currentSectionData.content }}
                  />
                  
                  <div className="bg-card border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Exercise</h4>
                    <div className="space-y-3">
                      {currentSectionData.questions?.map((question, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium">{question.question}</p>
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <label
                                key={optionIndex}
                                className="flex items-center space-x-2 p-2 rounded border hover:bg-accent cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={option}
                                  className="text-primary"
                                />
                                <span className="text-greek-600 font-greek">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSectionData.type === 'vocabulary' && (
                <div className="space-y-4">
                  <div 
                    className="lesson-content"
                    dangerouslySetInnerHTML={{ __html: currentSectionData.content }}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSectionData.vocabulary?.map((word, index) => (
                      <div key={index} className="vocab-card">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="vocab-word">{word.greek}</div>
                            <div className="vocab-translation">{word.translation}</div>
                            <div className="vocab-pronunciation">{word.pronunciation}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {!completedSections.has(currentSection) && (
                  <Button
                    onClick={() => handleSectionComplete(currentSection)}
                    className="bg-greek-600 hover:bg-greek-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Section
                  </Button>
                )}
                
                {currentSection < lesson.sections.length - 1 && (
                  <Button onClick={handleNextSection}>
                    Next Section
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Completion */}
      {isCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Congratulations!
                </h3>
                <p className="text-green-700">
                  You've completed "{lesson.title}". Great job!
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  Review Lesson
                </Button>
                <Button className="bg-greek-600 hover:bg-greek-700">
                  Take Quiz
                </Button>
                <Button variant="outline">
                  Next Lesson
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lesson Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Level</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {lesson.level}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div className="text-sm text-muted-foreground">
                  {lesson.estimatedDuration} min
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Difficulty</div>
                <div className="text-sm text-muted-foreground">
                  {lesson.difficulty}/5
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Sections</div>
                <div className="text-sm text-muted-foreground">
                  {lesson.sections.length}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
