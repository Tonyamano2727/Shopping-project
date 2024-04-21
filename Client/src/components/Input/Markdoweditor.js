import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const Markdoweditor = ({label , value , changevalue , name, invalidFields , setinvalidFields}) => {
  return (
    <div className="flex flex-col ">
        <span className="">{label}</span>
      <Editor
         apiKey='e3095qdt9vuwo9tz3t6m97uzpn8t2gll73vhewp3q6nxm9r9'
        initialValue={value}
        init={{
        menubar: true,
          plugins:
            "",
          toolbar: '',
           
          height: 500,
        }}
        onChange={e => changevalue(prev => ({ ...prev, [name]: e.target.getContent() }))}
        onFocus={() => setinvalidFields && setinvalidFields([])}
      />
      {invalidFields?.some(el => el.name === name) && <small className="text-main text-sm">{invalidFields?.find(el => el.name === name)?.mes}</small>}
    </div>
  );
};

export default Markdoweditor;
