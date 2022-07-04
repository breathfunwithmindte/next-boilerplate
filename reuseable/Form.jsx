import React from 'react'

export default function Form({ formConfig }) {


  return (
    <form>
        {
            formConfig.inputs.map((input_config, index) => {
                switch (input_config.type) {
                    case "text":
                        
                        break;
                
                    default:
                        break;
                }
            })
        }
    </form>
  )
}
