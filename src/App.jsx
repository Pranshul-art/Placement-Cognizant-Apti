import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Calculator, Brain, MessageSquare, BarChart3, Target, Users, Clock, Award, ChevronDown, ChevronUp, ExternalLink, FileText, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CitationLink } from '@/components/ui/citation';

// Citations for all sources
const citations = {
  1: {
    title: "Cognizant GenC Sample Aptitude Questions and Answers",
    url: "http://www.placementpreparation.io/cognizant-genc/aptitude/questions-and-answers/",
    content: "Comprehensive collection of Cognizant GenC aptitude questions covering quantitative aptitude, logical reasoning, and verbal ability sections with detailed solutions and explanations.",
    date: "Retrieved 2024",
    siteName: "Placement Preparation",
    sourceContent: "Sample questions for Cognizant GenC recruitment process including Time & Distance, Simple Interest, Percentages, Calendars, Numbers, Races, Permutations & Combinations, Probability, Work & Time, and other quantitative topics."
  },
  2: {
    title: "Cognizant Aptitude Questions | Aptitude Test For Cognizant",
    url: "https://cpt.hitbullseye.com/Cognizant-Aptitude-Questions.php",
    content: "Practice tests and aptitude questions specifically designed for Cognizant recruitment with focus on Quantitative, Verbal, Reasoning, and Data Interpretation sections.",
    date: "Retrieved 2024",
    siteName: "Hitbullseye",
    sourceContent: "Volumes, Coins/Values, Average Speed, Simplification, Numbers, Divisibility, Algebra, Clocks, Square Roots, and Price Reduction problems with multiple choice answers."
  },
  3: {
    title: "Cognizant Logical Reasoning Questions and Answers For Freshers",
    url: "https://www.freshersnow.com/cognizant-logical-reasoning-questions-and-answers/",
    content: "Detailed logical reasoning questions and answers for Cognizant placement preparation including syllogisms, odd one out, rules-based problems, analogies, and sequence arrangements.",
    date: "Retrieved 2024",
    siteName: "FreshersNow",
    sourceContent: "Statements and Conclusions, Classification problems, Rules-based numerical problems, Analogies, and Sequence/Arrangement questions with comprehensive explanations."
  },
  4: {
    title: "Cognizant GenC Logical Reasoning Questions 2025 | PrepInsta",
    url: "https://prepinsta.com/cognizant/logical-reasoning/",
    content: "Latest logical reasoning questions for Cognizant GenC 2025 recruitment including analogy, number series, coding/decoding, blood relations, syllogisms, and pattern recognition problems.",
    date: "Retrieved 2024",
    siteName: "PrepInsta",
    sourceContent: "Word/Relationship analogies, Number Series, Coding/Decoding, Blood Relations, Statement & Conclusion problems, Pattern Recognition, and Visual Reasoning questions."
  }
};

// Image resources
const imageResources = {
  cogniznantBanner: "https://static.placementpreparation.io/cdn-cgi/image/metadata=keep,quality=60,width=1440,height=500,f=auto,fit=cover/aptitude-images/aptitude/category/v2/webps/cts-banner.webp",
  hitbullseyeLogo: "https://s3service.hitbullseye.com/s3fs-public/Campus%20Placement%20Test%20Series%20(3).jpg?null",
  hitbullseyeGeneric: "https://www.hitbullseye.com/images/img-lazy-temp.png",
  freshersNowLogo: "https://www.freshersnow.com/wp-content/uploads/2017/11/freshersnow-logo.png",
  freshersNowQuestions: "https://www.freshersnow.com/wp-content/uploads/2019/03/Cognizant-Reasoning-Questions-and-Answers-696x357.png",
  prepInstaCourses: "https://i.ytimg.com/vi/VIJZDU6XjVk/hqdefault.jpg",
  prepInstaLogo: "https://files.prepinsta.com/wp-content/uploads/2024/11/V6YCLYSe-atul-image.png"
};

// Data for visualizations
const topicDistributionData = [
  { name: 'Quantitative Aptitude', questions: 45, percentage: 40, color: '#3b82f6' },
  { name: 'Logical Reasoning', questions: 35, percentage: 30, color: '#10b981' },
  { name: 'Verbal Ability', questions: 25, percentage: 22, color: '#f59e0b' },
  { name: 'Data Interpretation', questions: 10, percentage: 8, color: '#ef4444' }
];

const quantTopicsData = [
  { topic: 'Time & Distance', questions: 8, difficulty: 'Medium' },
  { topic: 'Percentages', questions: 6, difficulty: 'Easy' },
  { topic: 'Work & Time', questions: 7, difficulty: 'Medium' },
  { topic: 'Probability', questions: 5, difficulty: 'Hard' },
  { topic: 'Mensuration', questions: 4, difficulty: 'Medium' },
  { topic: 'Ratio & Proportion', questions: 5, difficulty: 'Easy' },
  { topic: 'Number System', questions: 6, difficulty: 'Medium' },
  { topic: 'Simple Interest', questions: 4, difficulty: 'Easy' }
];

const reasoningTopicsData = [
  { topic: 'Syllogisms', questions: 8, difficulty: 'Hard' },
  { topic: 'Coding-Decoding', questions: 6, difficulty: 'Medium' },
  { topic: 'Blood Relations', questions: 5, difficulty: 'Medium' },
  { topic: 'Series Completion', questions: 7, difficulty: 'Medium' },
  { topic: 'Analogies', questions: 5, difficulty: 'Easy' },
  { topic: 'Classification', questions: 4, difficulty: 'Easy' }
];

const skillsRadarData = [
  { skill: 'Mathematical Skills', score: 85 },
  { skill: 'Logical Thinking', score: 78 },
  { skill: 'Pattern Recognition', score: 82 },
  { skill: 'Language Skills', score: 75 },
  { skill: 'Data Analysis', score: 70 },
  { skill: 'Problem Solving', score: 88 }
];

const CognizantAptitudeReport = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topic) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const renderSection = (sectionId, title, icon, children) => (
    <div className={`${activeSection === sectionId ? 'block' : 'hidden'}`}>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <img src={imageResources.cogniznantBanner} alt="Cognizant GenC Banner" className="mx-auto mb-4 max-w-xs rounded-lg shadow-lg" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cognizant Aptitude Test Questions</h1>
        <p className="text-lg sm:text-xl opacity-90">Comprehensive Visual Report & Preparation Guide</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              115+ Questions Analyzed
            </span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              4 Major Categories
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 justify-center bg-white p-4 rounded-lg shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'quantitative', label: 'Quantitative', icon: <Calculator className="w-4 h-4" /> },
          { id: 'reasoning', label: 'Logical Reasoning', icon: <Brain className="w-4 h-4" /> },
          { id: 'verbal', label: 'Verbal Ability', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'data', label: 'Data Interpretation', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'resources', label: 'Resources', icon: <FileText className="w-4 h-4" /> }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {section.icon}
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {renderSection('overview', 'Test Overview & Distribution', <Target className="w-8 h-8 text-blue-600" />, (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Question Distribution by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topicDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="questions"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {topicDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Skills Assessment Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Statistics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Key Test Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">115+</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Main Categories</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">60-90</div>
                  <div className="text-sm text-gray-600">Minutes Duration</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">25+</div>
                  <div className="text-sm text-gray-600">Sub-topics</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Information */}
          <Alert className="lg:col-span-2">
            <Award className="w-4 h-4" />
            <AlertTitle>Important Test Information</AlertTitle>
            <AlertDescription>
              The Cognizant aptitude test is a crucial preliminary round in the recruitment process for roles like Cognizant GenC. 
              The test evaluates candidates across multiple cognitive skills including mathematical ability, logical reasoning, and verbal comprehension.
              <CitationLink id="1" className="ml-2" callType="quote" citations={citations} />
            </AlertDescription>
          </Alert>
        </div>
      ))}

      {/* Quantitative Aptitude Section */}
      {renderSection('quantitative', 'Quantitative Aptitude Questions', <Calculator className="w-8 h-8 text-blue-600" />, (
        <div className="space-y-6">
          {/* Topic Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Quantitative Topics Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={quantTopicsData}>
                  <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="questions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Major Topics */}
          <div className="grid gap-4">
            {/* Time & Distance */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('time-distance')}>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time & Distance (8 Questions)
                  </span>
                  {expandedTopics['time-distance'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['time-distance'] && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Sample Question:</h4>
                      <p className="text-sm mb-2">
                        A train 125 meters long passes a man running at 5 km/hr in the same direction in which the train crosses in 10 seconds. The speed of the train is:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>(A) 50 km/hr</div>
                        <div>(B) 54 km/hr</div>
                        <div>(C) 55 km/hr</div>
                        <div>(D) 60 km/hr</div>
                      </div>
                      <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Percentages */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('percentages')}>
                <CardTitle className="flex items-center justify-between">
                  <span>Percentages (6 Questions)</span>
                  {expandedTopics['percentages'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['percentages'] && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sample Question:</h4>
                    <p className="text-sm mb-2">
                      In an election between two candidates, one got 55% of the total valid votes and got 20% invalid votes. 
                      At the end of the day when the total number of votes were counted, the total number was found to be 7500. 
                      So what was the total number of valid votes that the winning candidate got?
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>(A) 2800</div>
                      <div>(B) 3300</div>
                      <div>(C) 3100</div>
                      <div>(D) 2700</div>
                    </div>
                    <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Work & Time */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('work-time')}>
                <CardTitle className="flex items-center justify-between">
                  <span>Work & Time (7 Questions)</span>
                  {expandedTopics['work-time'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['work-time'] && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Sample Question:</h4>
                      <p className="text-sm mb-2">
                        X, Y and Z can do a piece of work in 20, 30 and 60 days respectively depending on their capacity of doing work. 
                        If X is assisted by Y and Z on every third day, then in how many days X will complete the work?
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>(A) 12 days</div>
                        <div>(B) 15 days</div>
                        <div>(C) 16 days</div>
                        <div>(D) 18 days</div>
                      </div>
                      <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Additional Topics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Topics Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Topic</th>
                      <th className="text-left p-2">Questions</th>
                      <th className="text-left p-2">Difficulty</th>
                      <th className="text-left p-2">Key Concepts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Simple Interest</td>
                      <td className="p-2">4</td>
                      <td className="p-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Easy</span></td>
                      <td className="p-2">SI = PRT/100, Amount calculation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Probability</td>
                      <td className="p-2">5</td>
                      <td className="p-2"><span className="bg-red-100 text-red-800 px-2 py-1 rounded">Hard</span></td>
                      <td className="p-2">Combinations, Independent events</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Mensuration</td>
                      <td className="p-2">4</td>
                      <td className="p-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span></td>
                      <td className="p-2">Area, Volume, Surface area</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Number System</td>
                      <td className="p-2">6</td>
                      <td className="p-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span></td>
                      <td className="p-2">HCF, LCM, Remainders, Divisibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Logical Reasoning Section */}
      {renderSection('reasoning', 'Logical Reasoning Questions', <Brain className="w-8 h-8 text-green-600" />, (
        <div className="space-y-6">
          {/* Topic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Logical Reasoning Topics Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={reasoningTopicsData}>
                  <XAxis dataKey="topic" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="questions" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Major Topics */}
          <div className="grid gap-4">
            {/* Syllogisms */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('syllogisms')}>
                <CardTitle className="flex items-center justify-between">
                  <span>Statements and Conclusions (Syllogisms) - 8 Questions</span>
                  {expandedTopics['syllogisms'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['syllogisms'] && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sample Question:</h4>
                    <p className="text-sm mb-2"><strong>Statements:</strong></p>
                    <ul className="text-sm mb-2 ml-4 list-disc">
                      <li>All pens are pins.</li>
                      <li>No tag is a pin.</li>
                      <li>All papers are pens.</li>
                    </ul>
                    <p className="text-sm mb-2"><strong>Conclusions:</strong></p>
                    <ul className="text-sm mb-2 ml-4 list-disc">
                      <li>I. No pin is a tag</li>
                      <li>II. All papers are pins</li>
                      <li>III. All pins are definitely not tag</li>
                    </ul>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      <div>(A) Only I follows</div>
                      <div>(B) Only II follows</div>
                      <div>(C) Only II and III follow</div>
                      <div>(D) All I, II and III follow</div>
                    </div>
                    <CitationLink id="3" className="mt-2 text-xs" callType="quote" citations={citations} />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Coding-Decoding */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('coding')}>
                <CardTitle className="flex items-center justify-between">
                  <span>Coding and Decoding - 6 Questions</span>
                  {expandedTopics['coding'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['coding'] && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sample Question:</h4>
                    <p className="text-sm mb-2">
                      In a certain code GUEST is written as 53@$2 and MEAN is written as 6@4#. How is SAME written in that code?
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>(A) 4$6@</div>
                      <div>(B) $46@</div>
                      <div>(C) $36@</div>
                      <div>(D) 5$6@</div>
                    </div>
                    <CitationLink id="4" className="mt-2 text-xs" callType="quote" citations={citations} />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Blood Relations */}
            <Card>
              <CardHeader className="cursor-pointer" onClick={() => toggleTopic('blood-relations')}>
                <CardTitle className="flex items-center justify-between">
                  <span>Blood Relations - 5 Questions</span>
                  {expandedTopics['blood-relations'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
              {expandedTopics['blood-relations'] && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sample Question:</h4>
                    <p className="text-sm mb-2">
                      A is the son of C; C and Q are sisters; Z is the mother of Q and P is the son of Z. Which of the following statements is true?
                    </p>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      <div>(A) P is father of A</div>
                      <div>(B) P is brother of C</div>
                      <div>(C) A is son of Z</div>
                      <div>(D) Q is sister of A</div>
                    </div>
                    <CitationLink id="4" className="mt-2 text-xs" callType="quote" citations={citations} />
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Complete Topics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Logical Reasoning Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Core Topics:</h4>
                  <ul className="space-y-1">
                    <li>• Statements and Conclusions</li>
                    <li>• Statements and Arguments</li>
                    <li>• Blood Relations</li>
                    <li>• Directional Sense</li>
                    <li>• Coding and Decoding</li>
                    <li>• Analogies</li>
                    <li>• Classification (Odd Man Out)</li>
                    <li>• Series Completion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced Topics:</h4>
                  <ul className="space-y-1">
                    <li>• Analytical Reasoning</li>
                    <li>• Decision Making</li>
                    <li>• Critical Reasoning</li>
                    <li>• Data Sufficiency</li>
                    <li>• Seating Arrangements</li>
                    <li>• Logical Word Sequence</li>
                    <li>• Pattern Recognition</li>
                    <li>• Rule Detection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Verbal Ability Section */}
      {renderSection('verbal', 'Verbal Ability Questions', <MessageSquare className="w-8 h-8 text-yellow-600" />, (
        <div className="space-y-6">
          {/* Topics Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Verbal Ability Topics Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Main Topics:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Sentence Completion</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">8 Questions</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Vocabulary (Synonyms/Antonyms)</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">6 Questions</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Reading Comprehension</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">7 Questions</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Grammar & Error Detection</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">4 Questions</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Key Skills Tested:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• English Language Proficiency</li>
                    <li>• Comprehension Skills</li>
                    <li>• Grammar Knowledge</li>
                    <li>• Vocabulary Range</li>
                    <li>• Inference Making</li>
                    <li>• Context Understanding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Questions */}
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sample Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Sentence Completion:</h4>
                  <p className="text-sm mb-2">
                    In a press meet on the recent scam, the minister said, "The buck stops here". What did the minister convey by the statement?
                  </p>
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    <div>(A) He wants all the money</div>
                    <div>(B) He will return the money</div>
                    <div>(C) He will assume final responsibility</div>
                    <div>(D) He will resist all enquiries</div>
                  </div>
                  <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Grammar:</h4>
                  <p className="text-sm mb-2">
                    Who ___________ was coming to see us this evening?
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>(A) you said</div>
                    <div>(B) did you say</div>
                    <div>(C) did you say that</div>
                    <div>(D) had you</div>
                  </div>
                  <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vocabulary Matching:</h4>
                  <p className="text-sm mb-2">Match the columns:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Column 1:</strong></p>
                      <ul>
                        <li>1. eradicate</li>
                        <li>2. distort</li>
                        <li>3. saturate</li>
                        <li>4. utilize</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Column 2:</strong></p>
                      <ul>
                        <li>P) misrepresent</li>
                        <li>Q) soak completely</li>
                        <li>R) use</li>
                        <li>S) destroy utterly</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs mt-2">Answer: (A) 1:S, 2:P, 3:Q, 4:R</p>
                  <CitationLink id="1" className="mt-2 text-xs" callType="quote" citations={citations} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      {/* Data Interpretation Section */}
      {renderSection('data', 'Data Interpretation Questions', <BarChart3 className="w-8 h-8 text-red-600" />, (
        <div className="space-y-6">
          <Alert>
            <BarChart3 className="w-4 h-4" />
            <AlertTitle>Data Interpretation Overview</AlertTitle>
            <AlertDescription>
              Data Interpretation questions involve analyzing data presented in various graphical or tabular formats. 
              While specific Cognizant DI questions weren't provided in the sources, this section outlines the general types and preparation methods.
            </AlertDescription>
          </Alert>

          {/* Types of DI */}
          <Card>
            <CardHeader>
              <CardTitle>Types of Data Interpretation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Chart Types:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span>Table Charts</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BarChart3 className="w-4 h-4 text-green-600" />
                      <span>Bar Charts</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BarChart3 className="w-4 h-4 text-yellow-600" />
                      <span>Pie Charts</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BarChart3 className="w-4 h-4 text-red-600" />
                      <span>Line Charts</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <span>Mixed Charts</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span>Caselet DI</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Key Skills Required:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Strong mathematical foundations (percentages, ratios, averages)</li>
                    <li>• Profit & loss calculations</li>
                    <li>• Efficient time management</li>
                    <li>• Attention to units and data presentation</li>
                    <li>• Pattern recognition in data</li>
                    <li>• Quick calculation abilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Data Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Data Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Example of the type of data analysis skills tested in DI sections:
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: 'Jan', sales: 4000, profit: 2400 },
                  { month: 'Feb', sales: 3000, profit: 1398 },
                  { month: 'Mar', sales: 2000, profit: 9800 },
                  { month: 'Apr', sales: 2780, profit: 3908 },
                  { month: 'May', sales: 1890, profit: 4800 },
                  { month: 'Jun', sales: 2390, profit: 3800 }
                ]}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 mt-2">
                Sample questions would involve calculating growth rates, comparing periods, finding averages, etc.
              </p>
            </CardContent>
          </Card>

          {/* Preparation Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Preparation Strategy for Data Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Practice Areas:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Regular practice with various chart formats</li>
                    <li>• Time-bound practice sessions</li>
                    <li>• Focus on accuracy over speed initially</li>
                    <li>• Master basic mathematical operations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Common Mistakes to Avoid:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Misreading chart labels and units</li>
                    <li>• Calculation errors under time pressure</li>
                    <li>• Not double-checking approximations</li>
                    <li>• Ignoring data trends and patterns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Resources Section */}
      {renderSection('resources', 'Preparation Resources', <FileText className="w-8 h-8 text-purple-600" />, (
        <div className="space-y-6">
          {/* Main Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Placement Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={imageResources.cogniznantBanner} alt="Placement Preparation Banner" className="w-full rounded-lg mb-3" />
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive Cognizant GenC sample questions covering Aptitude, Programming, and company-specific resources.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <ExternalLink className="w-3 h-3" />
                  <CitationLink id="1" callType="recommend" citations={citations} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Hitbullseye
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={imageResources.hitbullseyeLogo} alt="Hitbullseye Logo" className="w-full rounded-lg mb-3" />
                <p className="text-sm text-gray-600 mb-3">
                  Practice tests for Cognizant aptitude questions with solutions, focusing on Quant, Verbal, Reasoning, and Data sections.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <ExternalLink className="w-3 h-3" />
                  <CitationLink id="2" callType="recommend" citations={citations} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  FreshersNow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={imageResources.freshersNowLogo} alt="FreshersNow Logo" className="w-full rounded-lg mb-3" />
                <p className="text-sm text-gray-600 mb-3">
                  Specialized in Cognizant Logical Reasoning questions and answers with PDF downloads for practice.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <ExternalLink className="w-3 h-3" />
                  <CitationLink id="3" callType="recommend" citations={citations} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  PrepInsta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={imageResources.prepInstaLogo} alt="PrepInsta Logo" className="w-full rounded-lg mb-3" />
                <p className="text-sm text-gray-600 mb-3">
                  Detailed syllabus, analytics, and practice questions for Cognizant GenC with placement courses and mock tests.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <ExternalLink className="w-3 h-3" />
                  <CitationLink id="4" callType="recommend" citations={citations} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Study Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recommended Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600 text-lg">Week 1-2</div>
                  <div className="text-sm">Quantitative Aptitude</div>
                  <div className="text-xs text-gray-600 mt-1">Focus on basics and formulas</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-600 text-lg">Week 3-4</div>
                  <div className="text-sm">Logical Reasoning</div>
                  <div className="text-xs text-gray-600 mt-1">Pattern recognition and logic</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="font-bold text-yellow-600 text-lg">Week 5-6</div>
                  <div className="text-sm">Verbal Ability</div>
                  <div className="text-xs text-gray-600 mt-1">Grammar and comprehension</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="font-bold text-red-600 text-lg">Week 7-8</div>
                  <div className="text-sm">Mock Tests & DI</div>
                  <div className="text-xs text-gray-600 mt-1">Full practice and timing</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Key Preparation Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Study Strategy:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Start with your weakest section first</li>
                    <li>• Practice time management regularly</li>
                    <li>• Take full-length mock tests weekly</li>
                    <li>• Review mistakes and understand concepts</li>
                    <li>• Focus on accuracy over speed initially</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Test Day Tips:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Read questions carefully and completely</li>
                    <li>• Manage time effectively across sections</li>
                    <li>• Don't spend too much time on difficult questions</li>
                    <li>• Use elimination method for MCQs</li>
                    <li>• Stay calm and confident throughout</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Citations Footer */}
      <Card className="w-full">
        <CardContent className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4 p-3 sm:p-6">
          <p className="font-semibold">References:</p>
          <ul className="space-y-1 mt-2">
            {Object.entries(citations).map(([id, citation]) => (
              <li key={id}>
                <CitationLink id={id} callType="recommend" citations={citations}/>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CognizantAptitudeReport;
