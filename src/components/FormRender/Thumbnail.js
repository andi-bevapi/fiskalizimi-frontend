import { useState, useEffect } from "react";

const Thumbnail = ({ file }) => {
    const [thumb, setThumb] = useState(null);

    useEffect(() => {
        if (!file) return;

        let reader = new FileReader();

        reader.onloadend = () => {
            setThumb(reader.result);
        };

        reader.readAsDataURL(file);
    }, [file]);

    if (!file) return null;

    return (
        <>
            <img
                src={thumb}
                width="100%"
                height="auto"
            />
            <br /><br />
        </>
    )
};

export default Thumbnail;