
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Book, BookOpen, CalendarClock, ReceiptText } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Layout from '@/components/Layout';
// import { useAuth } from '@/contexts/AuthContext';

// const StudentDashboard = () => {
//   const { user } = useAuth();

//   // In a real app, these would be fetched from the backend
//   const stats = {
//     borrowedBooks: 2,
//     dueToday: 0,
//     overdue: 0,
//     fineAmount: '$0.00',
//   };

//   return (
//     <Layout>
//       <div className="space-y-8">
//         <div>
//           <h1 className="font-display text-3xl font-bold tracking-tight">
//             Welcome, {user?.name || 'Student'}
//           </h1>
//           <p className="mt-2 text-muted-foreground">
//             {user?.studentId ? `Student ID: ${user.studentId}` : 'Your library dashboard'}
//           </p>
//         </div>
        
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <StatsCard 
//             title="Books Borrowed" 
//             value={stats.borrowedBooks} 
//             description="Currently checked out"
//             icon={<Book className="h-5 w-5 text-primary" />}
//             link="/student/borrows"
//           />
//           <StatsCard 
//             title="Due Today" 
//             value={stats.dueToday} 
//             description="Return ASAP"
//             icon={<CalendarClock className="h-5 w-5 text-amber-500" />}
//             link="/student/borrows"
//           />
//           <StatsCard 
//             title="Overdue" 
//             value={stats.overdue} 
//             description="Return immediately"
//             icon={<BookOpen className="h-5 w-5 text-red-500" />}
//             link="/student/borrows"
//           />
//           <StatsCard 
//             title="Total Fines" 
//             value={stats.fineAmount} 
//             description="Outstanding balance"
//             icon={<ReceiptText className="h-5 w-5 text-emerald-500" />}
//             link="/student/pay-fine"
//           />
//         </div>
        
//         <div className="grid gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recently Borrowed Books</CardTitle>
//               <CardDescription>Your recent activity</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Activity items would go here */}
//                 <p className="text-muted-foreground">No recent activity to display.</p>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Upcoming Due Dates</CardTitle>
//               <CardDescription>Books to return soon</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Due date items would go here */}
//                 <p className="text-muted-foreground">No upcoming due dates.</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// interface StatsCardProps {
//   title: string;
//   value: number | string;
//   description: string;
//   icon: React.ReactNode;
//   link: string;
// }

// const StatsCard = ({ title, value, description, icon, link }: StatsCardProps) => (
//   <Card>
//     <Link to={link} className="block h-full p-6 transition-colors hover:bg-muted/50">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold">{value}</p>
//           <p className="text-xs text-muted-foreground">{description}</p>
//         </div>
//         <div className="rounded-full bg-background p-2 shadow-sm">{icon}</div>
//       </div>
//     </Link>
//   </Card>
// );

// export default StudentDashboard;


import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Book, BookOpen, CalendarClock, ReceiptText, Search, Bookmark, Clock, TrendingUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const StudentDashboard = () => {
  const { user } = useAuth();

  // In a real app, these would be fetched from the backend
  const stats = {
    borrowedBooks: 2,
    dueToday: 0,
    overdue: 0,
    fineAmount: '$0.00',
  };

  // Sample data for recommendations
  const recommendedBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: '/placeholder/cover1.jpg' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: '/placeholder/cover2.jpg' },
    { id: 3, title: '1984', author: 'George Orwell', cover: '/placeholder/cover3.jpg' },
  ];

  // Sample reading progress
  const readingProgress = 68;

  // Sample recent activity
  const recentActivity = [
    { id: 1, action: 'Borrowed', book: 'Clean Code', date: '2 days ago' },
    { id: 2, action: 'Returned', book: 'Design Patterns', date: '1 week ago' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <DashboardHeader user={user} />
        <StatsCardGrid stats={stats} />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ReadingProgressCard progress={readingProgress} />
              <UpcomingDueDatesCard recentActivity={recentActivity} />
              <QuickActionsCard />
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <RecentActivityCard recentActivity={recentActivity} />
          </TabsContent>
          
          <TabsContent value="recommendations">
            <RecommendationsCard books={recommendedBooks} />
          </TabsContent>
        </Tabs>
        
        <ReadingInsightsCard />
      </div>
    </Layout>
  );
};

// Component for the dashboard header with search
const DashboardHeader = ({ user }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Welcome, {user?.name || 'Student'}
        </h1>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Active
        </Badge>
      </div>
      <p className="mt-2 text-muted-foreground">
        {user?.studentId ? `Student ID: ${user.studentId}` : 'Your library dashboard'}
      </p>
    </div>
    
    <div className="w-full md:w-auto flex gap-2">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search books..." className="pl-8" />
      </div>
      <Button size="sm" variant="outline">
        <Bell className="h-4 w-4 mr-2" />
        <span className="sr-only md:not-sr-only">Notifications</span>
      </Button>
    </div>
  </div>
);

// Component for the stats cards grid
const StatsCardGrid = ({ stats }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard 
      title="Books Borrowed" 
      value={stats.borrowedBooks} 
      description="Currently checked out"
      icon={<Book className="h-5 w-5 text-primary" />}
      link="/student/borrows"
      trend="+1 from last month"
      trendUp={true}
    />
    <StatsCard 
      title="Due Today" 
      value={stats.dueToday} 
      description="Return ASAP"
      icon={<CalendarClock className="h-5 w-5 text-amber-500" />}
      link="/student/borrows"
      trend="No change"
      trendUp={false}
    />
    <StatsCard 
      title="Overdue" 
      value={stats.overdue} 
      description="Return immediately"
      icon={<BookOpen className="h-5 w-5 text-red-500" />}
      link="/student/borrows"
      trend="-2 from last month"
      trendUp={true}
    />
    <StatsCard 
      title="Total Fines" 
      value={stats.fineAmount} 
      description="Outstanding balance"
      icon={<ReceiptText className="h-5 w-5 text-emerald-500" />}
      link="/student/pay-fine"
      trend="No outstanding fines"
      trendUp={false}
    />
  </div>
);

// Component for individual stats card
const StatsCard = ({ title, value, description, icon, link, trend, trendUp }) => (
  <Card>
    <Link to={link} className="block h-full transition-colors hover:bg-muted/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <div className="mt-3 flex items-center">
          {trendUp ? (
            <span className="text-xs font-medium flex items-center text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              {trend}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </div>
    </Link>
  </Card>
);

// Component for reading progress card
const ReadingProgressCard = ({ progress }) => (
  <Card className="col-span-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Reading Progress</CardTitle>
      <CardDescription>Your current book</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-12 bg-gray-100 rounded flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <div>
          <p className="font-medium">Clean Code</p>
          <p className="text-sm text-muted-foreground">Robert C. Martin</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground">Page 213 of 312</p>
      </div>
    </CardContent>
    <CardFooter>
      <Button size="sm" variant="outline" className="w-full">
        <Clock className="h-4 w-4 mr-2" />
        Update Progress
      </Button>
    </CardFooter>
  </Card>
);

// Component for upcoming due dates card
const UpcomingDueDatesCard = ({ recentActivity }) => (
  <Card className="col-span-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Upcoming Due Dates</CardTitle>
      <CardDescription>Books to return soon</CardDescription>
    </CardHeader>
    <CardContent>
      {recentActivity.length > 0 ? (
        <div className="space-y-4">
          {recentActivity.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{item.book}</p>
                <p className="text-sm text-muted-foreground">Due in 5 days</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <CalendarClock className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No upcoming due dates</p>
        </div>
      )}
    </CardContent>
  </Card>
);

// Component for quick actions card
const QuickActionsCard = () => (
  <Card className="col-span-1">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      <CardDescription>Common library operations</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button variant="outline" className="w-full justify-start">
        <Book className="h-4 w-4 mr-2" />
        Browse Library Catalog 
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Bookmark className="h-4 w-4 mr-2" />
        Reserve a Book
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <ReceiptText className="h-4 w-4 mr-2" />
        View Fines & Payments
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Clock className="h-4 w-4 mr-2" />
        Request Extension
      </Button>
    </CardContent>
  </Card>
);

// Component for recent activity card
const RecentActivityCard = ({ recentActivity }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Your recent interactions with the library</CardDescription>
    </CardHeader>
    <CardContent>
      {recentActivity.length > 0 ? (
        <div className="space-y-6">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                {item.action === 'Borrowed' ? (
                  <Book className="h-5 w-5 text-blue-500" />
                ) : (
                  <BookOpen className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{item.action} "{item.book}"</p>
                  <time className="text-sm text-muted-foreground">{item.date}</time>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.action === 'Borrowed' ? 'Due in 14 days' : 'Thank you for returning on time'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recent activity to display.</p>
        </div>
      )}
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        View Complete History
      </Button>
    </CardFooter>
  </Card>
);

// Component for recommendations card
const RecommendationsCard = ({ books }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended for You</CardTitle>
      <CardDescription>Based on your reading history</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col">
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
              <Book className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="default">Borrow</Button>
              <Button size="sm" variant="outline">Save</Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        View More Recommendations
      </Button>
    </CardFooter>
  </Card>
);

// Component for reading insights card
const ReadingInsightsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Reading Insights</CardTitle>
      <CardDescription>Your reading patterns and progress</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-3">
        <InsightCard 
          icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          title="Reading Streak"
          value="7 days"
          description="Keep it up!"
        />
        <InsightCard 
          icon={<Book className="h-5 w-5 text-purple-500" />}
          title="Books This Month"
          value="3"
          description="+1 from last month"
        />
        <InsightCard 
          icon={<Clock className="h-5 w-5 text-emerald-500" />}
          title="Avg. Reading Time"
          value="42 min"
          description="Per day"
        />
      </div>
    </CardContent>
  </Card>
);

// Component for individual insight card
const InsightCard = ({ icon, title, value, description }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default StudentDashboard;