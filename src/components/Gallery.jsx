import Card from "./Card";
import { useState, useEffect } from "react";
import { supabase } from "./client";
const Gallery = (props) =>
{
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
        .select();
        setPosts(data)
        }
    useEffect(() => {
        fetchPosts();
    }, [props]);
    return (
        <div>
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                <Card id={post.id} name={post.Name} class={post.Class} strength={post.Strength} dexterity={post.Dexterity} intelligence={post.Intelligence}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>
    )
}

export default Gallery;