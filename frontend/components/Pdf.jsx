// import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import axios from 'axios';

function Pdf() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState('');

  const handlePdfFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://backend-x458.onrender.com/output', formData);

      const responseData = response.data;
      setData(responseData.summary);
      // console.log(responseData.summary);

    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='Pdf'>
      <form encType="multipart/form-data">
        {/* <FaUpload/> */}
        <input type="file" name='pdf-file' accept=".pdf" onChange={handlePdfFileUpload} /><br />
        <button type="button" onClick={handleClick}>Submit</button>
      </form>


      {/* {pdfFile && (
        <object
          data={URL.createObjectURL(pdfFile)}
          type="application/pdf"
          width={700}
          height={900}
        >
          <p>PDF file could not be displayed.</p>
        </object>
      )} */}
      {data.length > 0 && (
        <div className='recv'>
          {data.map((pageSummary, index) => (
            <p key={index} className='recvData'><b>Summary for Page {index + 1}: </b>{pageSummary}</p>
          ))}
        </div>
      )}


    </div>
  )
}

export default Pdf;