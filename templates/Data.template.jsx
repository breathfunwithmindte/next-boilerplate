import React from 'react'

/**
 * @typedef {Object} Error
 * @property {number} status
 * @property {string} description 
 * @property {string} content_type
 *  
 * @typedef {Object} DataTemplateProp
 * @property {JSX} children
 * @property {boolean} loading
 * @property {*} data
 * @property {Error} error
 * @param {DataTemplateProp} props
 * @returns jsx;
 */

export default function DataTemplate({children, loading, data, error}) {

  if(loading === true) return (
    <div>
        loading
    </div>
  )
  if(error) return (
    <div>
        <h1>{error.status}</h1>
        <pre>{error.description}</pre>
    </div>
  )
  if(!data) return (
    <div>
        data is null
    </div>
  )
  return children;
}
