import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  /*
(alias) useState<string>(initialState: string | (() => string)): [string, React.Dispatch<React.SetStateAction<string>>] (+1 overload)
import useState

Returns a stateful value, and a function to update it.*/
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  /*
(alias) function useContext<T>(context: Context<T>): T
import useContext

Accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context.
*/
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent refresh the page
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (
      file //if there is a file
    ) {
      const data = new FormData();
      /*
var FormData: new (form?: HTMLFormElement) => FormData

Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".
*/
      const filename = Date.now() + file.name; //create random number to prevent same name of uploaded image
      data.append("name", filename); //add name of data
      data.append("file", file); //add file of data
      newPost.photo = filename; //add new post and filename
      try {
        await axios.post("/upload", data); //upload at this URL & data
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        "/posts",
        newPost //respose this newPost
      ); //after uploading send this post here
      window.location.replace(
        "/post/" + res.data._id //write post id
      ); //after sending post return to single page
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      {/*if there is a file use this img.
      create a URL for this file and gonna be able to see this at URL*/}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i class="writeIcon fas fa-file-upload"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/*set uploaded file. upload just sing file idx num 0 */}
          <input
            className="writeInput"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/*upload title*/}
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            type="text"
            placeholder="Tell your story..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          {/*upload desc*/}
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
