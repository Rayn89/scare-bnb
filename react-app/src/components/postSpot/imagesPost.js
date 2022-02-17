import React, { useState, useEffect } from "react";


const UploadImageForm = (props) => {
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [url, setUrl] = useState();

    let content;
    let content2;
    let content3;

    if (image1) {
        content = <img alt="" className="post-image-preview" src={image1} />;
    }

    if (image2) {
        content2 = <img alt="" className="post-image-preview" src={image2} />;
    }

    if (image3) {
        content3 = <img alt="" className="post-image-preview" src={image3} />;
    }

    useEffect(() => {
    setUrl({ 1: image1, 2: image2, 3: image3 });
    }, [image1, image2, image3]);

    return (
        <div className="new-post-photo-container">
            <div className="content1-container">
              {content}
              <input
                type="url"
                placeholder="Main image URL"
                className="new-spot-input"
                onChange={(e) => {
                  setImage1(e.target.value);
                }}
                required
              />
            </div>
            <div className="content1-container">
              {content2}
              <input
                type="url"
                className="new-spot-input"
                placeholder="Additional Image"
                onChange={(e) => {
                  setImage2(e.target.value);
                }}
                required
              />
            </div>
            <div className="content1-container">
              {content3}
              <input
                type="url"
                className="new-spot-input"
                placeholder="Additional Image"
                onChange={(e) => {
                  setImage3(e.target.value);
                }}
                required
              />
            </div>
          </div>
    )
}

export default UploadImageForm;