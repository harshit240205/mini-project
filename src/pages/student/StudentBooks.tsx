
// import { useState } from 'react';
// import Layout from '@/components/Layout';
// import { Input } from '@/components/ui/input';
// import BookCard, { BookType } from '@/components/BookCard';
// import { Search } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// // Sample book data - same as admin page but for student view
// const sampleBooks: BookType[] = [
//   {
//     id: '1',
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     isbn: '9780743273565',
//     available: true,
//     published_year: 1925,
//     category: 'Fiction',
//     cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
//   },
//   {
//     id: '2',
//     title: 'To Kill a Mockingbird',
//     author: 'Harper Lee',
//     isbn: '9780060935467',
//     available: false,
//     published_year: 1960,
//     category: 'Fiction'
//   },
//   {
//     id: '3',
//     title: 'A Brief History of Time',
//     author: 'Stephen Hawking',
//     isbn: '9780553380163',
//     available: true,
//     published_year: 1988,
//     category: 'Science',
//     cover: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3'
//   },
//   {
//     id: '4',
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     isbn: '9780141439518',
//     available: true,
//     published_year: 1813,
//     category: 'Classic'
//   },
// ];

// const StudentBooks = () => {
//   const [books] = useState<BookType[]>(sampleBooks);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { toast } = useToast();

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.isbn.includes(searchQuery)
//   );

//   const handleBorrowBook = (bookId: string) => {
//     const bookToBorrow = books.find((book) => book.id === bookId);
//     toast({
//       title: "Book Borrowed",
//       description: `You have successfully borrowed "${bookToBorrow?.title}".`,
//     });
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="font-display text-3xl font-bold tracking-tight">Browse Books</h1>
//           <p className="mt-2 text-muted-foreground">
//             Discover and borrow books from our library
//           </p>
//         </div>

//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search books by title, author, or ISBN..."
//             className="pl-10"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>

//         {filteredBooks.length === 0 ? (
//           <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
//             <p className="text-muted-foreground">No books found matching your search</p>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredBooks.map((book) => (
//               <BookCard
//                 key={book.id}
//                 book={book}
//                 onBorrow={handleBorrowBook}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default StudentBooks;


import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import BookCard, { BookType } from '@/components/BookCard';
import { Search, BookOpen, Filter, SortAsc, Grid3X3, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Sample book data - same as admin page but for student view
const sampleBooks: BookType[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    available: true,
    published_year: 1925,
    category: 'Fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780060935467',
    available: false,
    published_year: 1960,
    category: 'Fiction'
  },
  {
    id: '3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
    available: true,
    published_year: 1988,
    category: 'Science',
    cover: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    available: true,
    published_year: 1813,
    category: 'Classic'
  },
];

// Available categories
const categories = ['All', 'Fiction', 'Science', 'Classic', 'History', 'Biography'];

const sortOptions = [
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
  { value: 'author_asc', label: 'Author (A-Z)' },
  { value: 'year_desc', label: 'Newest First' },
  { value: 'year_asc', label: 'Oldest First' },
];

const StudentBooks = () => {
  const [books] = useState<BookType[]>(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title_asc');
  const [viewMode, setViewMode] = useState('grid');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter books by search query and category
  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'author_asc':
        return a.author.localeCompare(b.author);
      case 'year_desc':
        return b.published_year - a.published_year;
      case 'year_asc':
        return a.published_year - b.published_year;
      default:
        return 0;
    }
  });

  const handleBorrowBook = (bookId: string) => {
    const bookToBorrow = books.find((book) => book.id === bookId);
    toast({
      title: "Book Borrowed",
      description: `You have successfully borrowed "${bookToBorrow?.title}".`,
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Count available books
  const availableCount = sortedBooks.filter(book => book.available).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Browse Books</h1>
            <p className="mt-2 text-muted-foreground">
              Discover and borrow books from our library
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {sortedBooks.length} Books
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {availableCount} Available
            </Badge>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`relative flex-grow transition-all ${isSearchFocused ? 'md:flex-grow-[2]' : ''}`}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search books by title, author, or ISBN..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs value={viewMode} onValueChange={setViewMode} className="hidden md:block">
              <TabsList className="h-10">
                <TabsTrigger value="grid" className="px-3">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {filteredBooks.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No books found matching your search</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={handleBorrowBook}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedBooks.map((book) => (
                  <BookListItem
                    key={book.id}
                    book={book}
                    onBorrow={handleBorrowBook}
                  />
                ))}
              </div>
            )}
            
            {sortedBooks.length > 0 && (
              <div className="mt-8 flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedBooks.length} of {books.length} books
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

// New list view component for books
const BookListItem = ({ book, onBorrow }: { book: BookType, onBorrow: (id: string) => void }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-full sm:w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary/60" />
          </div>
        )}
      </div>
      
      <div className="flex-grow space-y-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{book.title}</h3>
          <Badge variant={book.available ? "outline" : "secondary"} className={book.available ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}>
            {book.available ? "Available" : "Borrowed"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">By {book.author}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">{book.category}</Badge>
          <Badge variant="outline" className="text-xs">{book.published_year}</Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">ISBN: {book.isbn}</Badge>
        </div>
      </div>
      
      <div className="flex sm:flex-col justify-end items-end gap-2 mt-3 sm:mt-0">
        <Button 
          size="sm" 
          disabled={!book.available}
          onClick={() => onBorrow(book.id)}
        >
          {book.available ? "Borrow" : "Unavailable"}
        </Button>
        <Button size="sm" variant="outline">
          Details
        </Button>
      </div>
    </div>
  );
};

export default StudentBooks;