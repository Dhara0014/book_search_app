import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const {id} = req.query;
  const filePath = path.join(process.cwd(), 'pages/data/books.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const books = JSON.parse(fileData);
  const bookDetails = books.find((itm) => itm.id == id);
    if(bookDetails){
        res.status(200).json({
            status: true,
            message: "Book found successfully",
            result: bookDetails
          });
    } else {
        res.status(404).json({
          status: false,
          message: "Book not found"
        });
      }
}