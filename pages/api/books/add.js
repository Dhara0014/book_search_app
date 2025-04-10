import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'pages/data/books.json');

export default function handler(req, res) {
    if(!req.method == 'POST'){
        return res.status(405).json({ status: false, message: 'Method Not Allowed' })
    }

    const { title, author, imageUrl, description } = req.body

  if (!title || !author || !imageUrl) {
    return res.status(400).json({
      status: false,
      message: 'All fields are required',
    })
  }

  const fileData = fs.readFileSync(filePath, 'utf-8');
  const books = JSON.parse(fileData);

  const newBook = {
    id: String(books.length + 1),
    title,
    author,
    imageUrl,
    description,
  }

  books.push(newBook);
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2))

  return res.status(201).json({
    status: true,
    message: 'Book added successfully',
    result: newBook,
  })
}