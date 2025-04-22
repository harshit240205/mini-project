
// import Layout from '@/components/Layout';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
// import { useToast } from '@/hooks/use-toast';
// import { Book, Calendar, Check } from 'lucide-react';

// interface BorrowedBook {
//   id: string;
//   title: string;
//   author: string;
//   borrowDate: string;
//   dueDate: string;
//   isOverdue: boolean;
//   coverImage?: string;
// }

// const StudentBorrows = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([
//     {
//       id: '1',
//       title: 'To Kill a Mockingbird',
//       author: 'Harper Lee',
//       borrowDate: '2023-04-10',
//       dueDate: '2023-05-10',
//       isOverdue: true,
//     },
//     {
//       id: '2',
//       title: 'The Great Gatsby',
//       author: 'F. Scott Fitzgerald',
//       borrowDate: '2023-05-01',
//       dueDate: '2023-06-01',
//       isOverdue: false,
//       coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
//     },
//   ]);
//   const { toast } = useToast();

//   const handleReturnBook = (bookId: string) => {
//     const bookToReturn = borrowedBooks.find((book) => book.id === bookId);
//     setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
    
//     toast({
//       title: "Book Returned",
//       description: `You have successfully returned "${bookToReturn?.title}".`,
//     });
//   };

//   const handleRenewBook = (bookId: string) => {
//     setBorrowedBooks(
//       borrowedBooks.map((book) => {
//         if (book.id === bookId) {
//           // Add 14 days to the due date
//           const newDueDate = new Date(book.dueDate);
//           newDueDate.setDate(newDueDate.getDate() + 14);
          
//           return {
//             ...book,
//             dueDate: newDueDate.toISOString().split('T')[0],
//             isOverdue: false,
//           };
//         }
//         return book;
//       })
//     );
    
//     const bookToRenew = borrowedBooks.find((book) => book.id === bookId);
//     toast({
//       title: "Book Renewed",
//       description: `You have successfully renewed "${bookToRenew?.title}" for 14 more days.`,
//     });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="font-display text-3xl font-bold tracking-tight">My Borrowed Books</h1>
//           <p className="mt-2 text-muted-foreground">
//             Manage your current loans and returns
//           </p>
//         </div>

//         {borrowedBooks.length === 0 ? (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="mb-4 rounded-full bg-primary/10 p-3">
//                 <Book className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-medium">No Borrowed Books</h3>
//               <p className="mt-2 text-muted-foreground">
//                 You don't have any books checked out at the moment.
//               </p>
//               <Button className="mt-6" asChild>
//                 <a href="/student/books">Browse Books</a>
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid gap-6 lg:grid-cols-2">
//             {borrowedBooks.map((book) => (
//               <Card key={book.id} className={book.isOverdue ? "border-red-300" : ""}>
//                 <div className="flex flex-col md:flex-row">
//                   <div className="w-full md:w-1/3">
//                     <div className="aspect-[3/4] h-full w-full">
//                       {book.coverImage ? (
//                         <img
//                           src={book.coverImage}
//                           alt={book.title}
//                           className="h-full w-full rounded-l-lg object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center bg-muted">
//                           <Book className="h-12 w-12 text-muted-foreground" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-1 flex-col p-6">
//                     <CardHeader className="p-0 pb-4">
//                       <CardTitle className="font-display text-xl">{book.title}</CardTitle>
//                       <CardDescription>{book.author}</CardDescription>
//                     </CardHeader>
//                     <CardContent className="flex-1 space-y-2 p-0">
//                       <div className="flex items-center text-sm">
//                         <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
//                         <span>Borrowed: {formatDate(book.borrowDate)}</span>
//                       </div>
//                       <div className="flex items-center text-sm">
//                         <Calendar className={`mr-2 h-4 w-4 ${book.isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
//                         <span className={book.isOverdue ? 'text-red-500 font-medium' : ''}>
//                           Due: {formatDate(book.dueDate)}
//                           {book.isOverdue && ' (Overdue)'}
//                         </span>
//                       </div>
//                     </CardContent>
//                     <CardFooter className="flex gap-2 p-0 pt-4">
//                       <Button 
//                         variant="default" 
//                         className="flex-1"
//                         onClick={() => handleReturnBook(book.id)}
//                       >
//                         <Check className="mr-2 h-4 w-4" />
//                         Return
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         className="flex-1"
//                         onClick={() => handleRenewBook(book.id)}
//                         disabled={book.isOverdue}
//                       >
//                         {book.isOverdue ? 'Cannot Renew' : 'Renew'}
//                       </Button>
//                     </CardFooter>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default StudentBorrows;


import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ArrowRight, Book, BookOpenText, Calendar, Check, Clock, RotateCcw, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO, differenceInDays } from 'date-fns';

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
  coverImage?: string;
  category?: string;
}

const StudentBorrows = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([
    {
            id: '1',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            borrowDate: '2023-04-10',
            dueDate: '2023-05-10',
            isOverdue: true,
             coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3'
          },
    {
      id: '2',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      borrowDate: '2023-05-01',
      dueDate: '2023-06-01',
      isOverdue: false,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Classic'
    },
  ]);
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'current' | 'overdue'>('all');
  const { toast } = useToast();

  const handleReturnBook = (bookId: string) => {
    const bookToReturn = borrowedBooks.find((book) => book.id === bookId);
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
    
    toast({
      title: "Book Returned",
      description: `You have successfully returned "${bookToReturn?.title}".`,
    });
  };

  const handleRenewBook = (bookId: string) => {
    setBorrowedBooks(
      borrowedBooks.map((book) => {
        if (book.id === bookId) {
          // Add 14 days to the due date
          const newDueDate = new Date(book.dueDate);
          newDueDate.setDate(newDueDate.getDate() + 14);
          
          return {
            ...book,
            dueDate: newDueDate.toISOString().split('T')[0],
            isOverdue: false,
          };
        }
        return book;
      })
    );
    
    const bookToRenew = borrowedBooks.find((book) => book.id === bookId);
    toast({
      title: "Book Renewed",
      description: `You have successfully renewed "${bookToRenew?.title}" for 14 more days.`,
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = parseISO(dueDate);
    return differenceInDays(due, today);
  };

  const getTimeProgress = (borrowDate: string, dueDate: string) => {
    const start = parseISO(borrowDate);
    const end = parseISO(dueDate);
    const today = new Date();
    
    const totalDays = differenceInDays(end, start);
    const daysUsed = differenceInDays(today, start);
    
    return Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));
  };

  // Apply filters based on active tab
  const filteredBooks = borrowedBooks.filter(book => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'overdue') return book.isOverdue;
    if (activeFilter === 'current') return !book.isOverdue;
    return true;
  });

  // Summary counts
  const overdueCount = borrowedBooks.filter(book => book.isOverdue).length;
  const dueSoonCount = borrowedBooks.filter(book => {
    const daysRemaining = getDaysRemaining(book.dueDate);
    return daysRemaining >= 0 && daysRemaining <= 3 && !book.isOverdue;
  }).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">My Borrowed Books</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your current loans and returns
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <LoanStatusCard title="Total Books" count={borrowedBooks.length} icon={<Book className="h-4 w-4" />} />
            <LoanStatusCard 
              title="Overdue" 
              count={overdueCount} 
              icon={<AlertCircle className="h-4 w-4" />} 
              variant={overdueCount > 0 ? "destructive" : "default"} 
            />
            <LoanStatusCard 
              title="Due Soon" 
              count={dueSoonCount} 
              icon={<Clock className="h-4 w-4" />} 
              variant={dueSoonCount > 0 ? "warning" : "default"} 
            />
          </div>
        </div>
        
        {borrowedBooks.length > 0 && (
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveFilter(value as any)}>
            <TabsList>
              <TabsTrigger value="all">All Books ({borrowedBooks.length})</TabsTrigger>
              <TabsTrigger value="current">Current ({borrowedBooks.length - overdueCount})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {filteredBooks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium">No Borrowed Books</h3>
              <p className="mt-2 text-muted-foreground">
                {activeFilter === 'all' 
                  ? "You don't have any books checked out at the moment." 
                  : activeFilter === 'overdue' 
                    ? "You don't have any overdue books."
                    : "You don't have any books currently borrowed."}
              </p>
              <Button className="mt-6" asChild>
                <a href="/student/books">Browse Books</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onReturn={handleReturnBook}
                onRenew={handleRenewBook}
                formatDate={formatDate}
                getDaysRemaining={getDaysRemaining}
                getTimeProgress={getTimeProgress}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

interface LoanStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  variant?: 'default' | 'destructive' | 'warning';
}

const LoanStatusCard = ({ title, count, icon, variant = 'default' }: LoanStatusCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };
  
  return (
    <div className={`flex items-center gap-2 py-1 px-3 rounded-md border ${getVariantStyles()}`}>
      {icon}
      <span className="text-sm font-medium">{title}: {count}</span>
    </div>
  );
};

interface BookCardProps {
  book: BorrowedBook;
  onReturn: (id: string) => void;
  onRenew: (id: string) => void;
  formatDate: (date: string) => string;
  getDaysRemaining: (dueDate: string) => number;
  getTimeProgress: (borrowDate: string, dueDate: string) => number;
}

const BookCard = ({ book, onReturn, onRenew, formatDate, getDaysRemaining, getTimeProgress }: BookCardProps) => {
  const daysRemaining = getDaysRemaining(book.dueDate);
  const timeProgress = getTimeProgress(book.borrowDate, book.dueDate);
  
  // Calculate progress color
  const getProgressColor = () => {
    if (book.isOverdue) return 'bg-red-500';
    if (daysRemaining <= 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  // Days remaining text
  const getDaysRemainingText = () => {
    if (book.isOverdue) return `Overdue by ${Math.abs(daysRemaining)} days`;
    return `${daysRemaining} days remaining`;
  };

  return (
    <Card className={book.isOverdue ? "border-red-300" : ""}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] h-full w-full">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full rounded-l-lg object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Book className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-display text-xl">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </div>
              {book.category && (
                <Badge variant="outline" className="ml-2">
                  {book.category}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 p-0">
            <div className="grid gap-3">
              <div className="flex items-center text-sm">
                <BookOpenText className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Borrowed: {formatDate(book.borrowDate)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className={`mr-2 h-4 w-4 ${book.isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
                <span className={book.isOverdue ? 'text-red-500 font-medium' : ''}>
                  Due: {formatDate(book.dueDate)}
                </span>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{getDaysRemainingText()}</span>
                <span>{Math.round(timeProgress)}% of loan period used</span>
              </div>
              <Progress value={timeProgress} className={`h-2 ${getProgressColor()}`} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 p-0 pt-4">
            <Button 
              variant="default" 
              className="w-full sm:flex-1"
              onClick={() => onReturn(book.id)}
            >
              <Check className="mr-2 h-4 w-4" />
              Return Book
            </Button>
            {book.isOverdue ? (
              <Button 
                variant="destructive"
                className="w-full sm:flex-1"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Pay Fine
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full sm:flex-1"
                onClick={() => onRenew(book.id)}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Renew Loan
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default StudentBorrows;