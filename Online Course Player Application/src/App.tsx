import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import Curriculum from './components/Curriculum';
import CourseMaterials from './components/CourseMaterials';
import CourseProgress from './components/CourseProgress';
import Comments from './components/Comments';
import PDFViewer from './components/Modals/PDFViewer';
import ExamModal from './components/Modals/ExamModal';
import LeaderboardModal from './components/Modals/LeaderboardModal';
import { mockCourse, mockMaterials, mockComments, mockLeaderboard, mockQuestions, currentUser } from './data/mockData';
import { Lesson, Material } from './types';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(mockCourse.modules[0].lessons[0].id);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPdf, setShowPdf] = useState<{ show: boolean; pdf: Material | null }>({
    show: false,
    pdf: null,
  });
  const [showExam, setShowExam] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);

  // Handle resize to toggle between mobile and desktop layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find the current lesson when the current lesson ID changes
  useEffect(() => {
    const lesson = mockCourse.modules
      .flatMap(module => module.lessons)
      .find(lesson => lesson.id === currentLessonId);
    
    if (lesson) {
      setCurrentLesson(lesson);
      document.title = `${lesson.title} | ${mockCourse.title}`;
    }
  }, [currentLessonId]);

  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    if (isMobile) {
      setSidebarOpen(false);
    }
    
    const lesson = mockCourse.modules
      .flatMap(module => module.lessons)
      .find(lesson => lesson.id === lessonId);
    
    if (lesson?.type === 'quiz') {
      setShowExam(true);
    }
  };

  const handleOpenPdf = (pdf: Material) => {
    setShowPdf({ show: true, pdf });
  };

  const handleAddComment = (text: string) => {
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      text,
      timestamp: new Date().toISOString(),
    };
    
    setComments([newCommentObj, ...comments]);
  };

  const handleExamComplete = (score: number, totalQuestions: number) => {
    alert(`You scored ${score} out of ${totalQuestions}!`);
    setShowExam(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        courseTitle={mockCourse.title} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isMobile={isMobile}
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Sidebar for mobile */}
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 z-40 bg-white">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold text-lg">Course Content</h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-500"
                >
                  ×
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100vh-70px)]">
                <Curriculum 
                  modules={mockCourse.modules}
                  currentLessonId={currentLessonId}
                  onSelectLesson={handleLessonSelect}
                />
              </div>
            </div>
          )}
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {currentLesson?.type === 'video' && currentLesson.videoUrl && (
              <VideoPlayer 
                videoSrc={currentLesson.videoUrl}
                posterSrc={currentLesson.posterUrl}
                title={currentLesson.title}
              />
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <CourseMaterials 
                materials={mockMaterials}
                onOpenPdf={handleOpenPdf}
              />
              
              <CourseProgress 
                progress={mockCourse.progress}
                modulesCompleted={mockCourse.modulesCompleted}
                totalModules={mockCourse.modules.length}
              />
            </div>
            
            <div>
              <Comments 
                comments={comments}
                currentUser={currentUser}
                onAddComment={handleAddComment}
              />
            </div>
            
            <div className="mt-8 flex space-x-4 justify-center">
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Leaderboard
              </button>
              <button 
                onClick={() => setShowExam(true)}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                Take Practice Quiz
              </button>
            </div>
          </div>
          
          {/* Sidebar for desktop */}
          {!isMobile && (
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-96px)] overflow-y-auto pb-8">
              <Curriculum 
                modules={mockCourse.modules}
                currentLessonId={currentLessonId}
                onSelectLesson={handleLessonSelect}
              />
            </div>
          )}
        </div>
      </main>
      
      {/* Modals */}
      {showPdf.show && showPdf.pdf && (
        <PDFViewer 
          pdfUrl={showPdf.pdf.url}
          title={showPdf.pdf.title}
          onClose={() => setShowPdf({ show: false, pdf: null })}
        />
      )}
      
      {showExam && (
        <ExamModal 
          title="SEO Fundamentals Quiz"
          questions={mockQuestions}
          timeLimit={15} // 15 minutes
          onClose={() => setShowExam(false)}
          onComplete={handleExamComplete}
        />
      )}
      
      {showLeaderboard && (
        <LeaderboardModal 
          entries={mockLeaderboard}
          currentUserId={currentUser.id}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}

export default App;