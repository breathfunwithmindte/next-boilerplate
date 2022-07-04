import { useCallback, useEffect, useState } from "react";
import default_callback from "../bssl/default_callback";
import Request from "../bssl/Request";

/**
 * @example const [formstate, setFormstate, handleChange, submit] = useForm([{ name: "create", path: "stories/new", redirect: "/some/url" }])
 */

/**
 * @typedef {Object} Path
 * @property {string} name
 * @property {string} path
 * @property {string | null} redirect
 * @param {Path[]} paths 
 * @returns 
 */
export default function useForm(paths, default_state) {
  const [formstate, setFormstate] = useState(default_state || new Object());

  const handleChange = useCallback(function (e) {
    if(!this) {
      setFormstate(pr => {return {...pr, [e.target.name]: e.target.value}});
      return;
    }
    const { type, name, value } = this;
    switch (type) {
      case "checked":
        console.log( type, name, value, e.target.name )
        setFormstate(pr => { return { ...pr, [e.target.name]: e.target.value } });
        break;

      case "costum": 
        setFormstate(pr => { return { ...pr, [name]: value } });
      default:
        break;
    }
  })


  return [formstate, setFormstate, handleChange];
}
