"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BookDetails = () => {
    const {id} = useParams();

    const [bookDetails, setBookDetails] = useState([]);
    useEffect(() => {
        const result = async() => {
            const response = await fetch(`/api/books/${id}`)?.then((res) => res.json());
            const {status, message, result} = response;
            if(status){
                setBookDetails(result)
            }
        }
        result()
    },[])

  return (
    <div>
    <div className="bg-white p-6 mt-5 rounded shadow max-w-xl mx-auto h-[900px] flex flex-col">
    <div className="h-3/3 w-full overflow-hidden mb-4">
      <img
        src={bookDetails.imageUrl}
        alt={bookDetails.title}
        className="w-full h-full object-cover rounded"
      />
    </div>
    <h1 className="text-3xl font-bold mb-2 text-gray-700">{bookDetails.title}</h1>
    <p className="text-xl text-gray-500">by {bookDetails.author}</p>
    </div>

    </div>
  )
}

export default BookDetails