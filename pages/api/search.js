import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const {book} = req.query;
  if (!book) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a search query using ?q=',
    })
  }
  const filePath = path.join(process.cwd(), 'pages/data/books.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const books = JSON.parse(fileData);
  const query = book.toLowerCase();
  const searchedBooks = books.filter((itm) => itm.title.toLowerCase().includes(query) || itm.author.toLowerCase().includes(query))
  res.status(200).json({
    status: true,
    message: "Books fatched successfully",
    result: searchedBooks
  });
}
