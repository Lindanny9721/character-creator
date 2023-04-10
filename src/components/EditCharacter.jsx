import { supabase } from './client'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WarriorImg from "../assets/warrior.jpg";
import MageImg from "../assets/mage.jpg";
import RougeImg from "../assets/rouge.jpg";
const EditPost = () => {
    const {id} = useParams();;
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [stats, setStats] = useState({
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    });
    const classes = [
        { id: 1, name: "Warrior", image: WarriorImg },
        { id: 2, name: "Mage", image: MageImg },
        { id: 3, name: "Rogue", image: RougeImg },
    ];
    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
        .select();
        setPosts(data.filter(item => item.id == id)[0])
        console.log(data.filter(item => item.id == id)[0]);
        }
    useEffect(() => {
        fetchPosts();
        setStats({
            strength: posts.Strength,
            dexterity: posts.Dexterity,
            intelligence: posts.Intelligence,
        })
        setName(posts.Name);
        setSelectedClass(posts.Class)
    }, []);
    useEffect(() => {
        if(posts.id)
        {
            setStats({
                strength: posts.Strength,
                dexterity: posts.Dexterity,
                intelligence: posts.Intelligence,
            })
            setName(posts.Name);
            setSelectedClass(posts.Class)
        }
    }, [posts]); 
    const selectedClassObj = classes.find((classObj) => classObj.name === selectedClass);
    const maxPoints = 10;
    const totalPointsUsed = stats.strength + stats.dexterity + stats.intelligence;
    const remainingPoints = maxPoints - totalPointsUsed;
    const updateStat = (statName, value) => {
        if (value < 0)
            return;
        if (remainingPoints > 0 || value <= stats[statName]) {
            setStats({
            ...stats,
            [statName]: value,
        });
        }
    };
    const updatePost = async (e) => {
    e.preventDefault();
    const { error } = await supabase
    .from('Posts')
    .update({Name: name, Class: selectedClass, Strength: stats.strength, Dexterity: stats.dexterity, Intelligence: stats.intelligence })
    .eq('id', id);
    if(error)
        console.log(error);
    else
        alert("Successfully Updated!");
    }
    const deletePost = async (e) => {
        await supabase
        .from('Posts')
        .delete()
        .eq('id', id);
        window.location = "http://localhost:5173/Gallery";
    }
    return (
        <div className = "character-container">
            <h1>Edit your character!</h1>
            <form onSubmit={updatePost}>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                />
                <label htmlFor="class-select">Select a class:</label>
                <select
                    id="class-select"
                    value={selectedClass}
                    onChange={(event) => setSelectedClass(event.target.value)}
                >
                    <option value="">Choose a class</option>
                    {classes.map((classOption) => (
                    <option key={classOption.id} value={classOption.name}>
                        {classOption.name}
                    </option>
                    ))}
                </select>
                {selectedClass && (
                    <div>
                        <p>You chose {selectedClass}.</p>
                        <img src={selectedClassObj.image} alt={selectedClass} height= "250px" width="200px"/>
                    </div>
                )}
                <p>Remaining points: {remainingPoints}</p>
                <label>
                Strength:
                <input type="number" value={stats.strength} onChange={(e) => updateStat("strength", parseInt(e.target.value))} />
                </label>
                <label>
                Dexterity:
                <input type="number" value={stats.dexterity} onChange={(e) => updateStat("dexterity", parseInt(e.target.value))} />
                </label>
                <label>
                Intelligence:
                <input type="number" value={stats.intelligence} onChange={(e) => updateStat("intelligence", parseInt(e.target.value))} />
                </label>
                <button type = "submit">Update!</button>
            </form>
            <input type= "submit" value = "Delete" onClick= {deletePost}/>
        </div>
    )
}

export default EditPost
