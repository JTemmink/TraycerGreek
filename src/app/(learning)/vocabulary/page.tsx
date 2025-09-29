import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Award, Search, Volume2, BookOpen, Filter } from 'lucide-react';
import { getVocabulary } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Vocabulary',
  description: 'Master Ancient Greek vocabulary with our comprehensive word database and interactive learning tools.',
};

export default async function VocabularyPage() {
  const vocabulary = await getVocabulary();

  const vocabularyByLevel = vocabulary.reduce((acc, word) => {
    if (!acc[word.level]) {
      acc[word.level] = [];
    }
    acc[word.level].push(word);
    return acc;
  }, {} as Record<string, typeof vocabulary>);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground greek-heading">
                Vocabulary
              </h1>
              <p className="text-muted-foreground mt-2">
                Master Ancient Greek vocabulary with our comprehensive word database
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search vocabulary..."
                    leftIcon={<Search className="h-4 w-4" />}
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {Object.entries(vocabularyByLevel).map(([level, levelWords]) => (
              <div key={level} className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground capitalize mb-2">
                    {level} Level Vocabulary
                  </h2>
                  <p className="text-muted-foreground">
                    {levelWords.length} words available
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {levelWords.map((word) => (
                    <Card key={word.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-greek">
                            {word.greek}
                          </CardTitle>
                          <Badge variant="outline" className="capitalize text-xs">
                            {word.partOfSpeech}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {word.translation}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Volume2 className="h-4 w-4 mr-2" />
                            {word.pronunciation}
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Award className="h-4 w-4 mr-2" />
                            Frequency: {word.frequency}
                          </div>

                          {word.examples && word.examples.length > 0 && (
                            <div className="text-sm">
                              <p className="font-medium text-foreground mb-1">Example:</p>
                              <p className="text-muted-foreground font-greek">
                                {word.examples[0].greek}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {word.examples[0].translation}
                              </p>
                            </div>
                          )}

                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Study
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
