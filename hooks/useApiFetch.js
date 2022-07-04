import { useCallback, useEffect, useState } from "react";
import default_callback from "../bssl/default_callback";
import Request from "../bssl/Request";

/**
 * @typedef {*} Data
 * @typedef {Object} Error
 * @property {number} status
 * @property {string} description
 * @property {string} content_type
 * 
 * @typedef {Array} ApiReturn
 * @property {Data} data
 * @property {boolean} loading
 * @property {Error} error
 * @property {string} message
 */

/**
 * @param {string} path 
 * @returns {ApiReturn}
 */
export default function useApiFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");


  const makefetch = async () => {
    setLoading(true);
    const default_callback_binded = default_callback.bind({ setData, setLoading, setError, setMessage });
    await Request.get(`/api/v1/${path}`, default_callback_binded);
  }

  useEffect(() => {
    makefetch();
    console.log(data);
  }, []);

  const refetch = useCallback((newpath) => {
    return makefetch(`/api/v1/${newpath || path}`);
  }, []);

  return [data, loading, error, message, refetch];
}
