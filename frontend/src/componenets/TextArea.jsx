import React from 'react'

function TextArea({name, id, rows, label, maxLength, value, onChange }) {
  return (
    <div className='relative w-[100%] mt-2'>
        <label htmlFor="form" className="pl-4 text-sm text-textColor font-[550]">{label} :</label>
        <textarea name={name} id={id} rows={rows} maxLength={maxLength} value={value} onChange={onChange} className='text_area mt-1'></textarea>
    </div>
  )
}

export default TextArea;