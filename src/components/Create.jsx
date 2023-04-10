import React, { useState } from "react";
import WarriorImg from "../assets/warrior.jpg";
import MageImg from "../assets/mage.jpg";
import RougeImg from "../assets/rouge.jpg";
import { supabase } from "./client";
const Create = () =>
{
    const [name, setName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
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
    const selectedClassObj = classes.find((classObj) => classObj.name === selectedClass);
    const maxPoints = 10;
    const totalPointsUsed = stats.strength + stats.dexterity + stats.intelligence;
    const remainingPoints = maxPoints - totalPointsUsed;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
        .from('Posts')
        .insert({ Name: name, Class: selectedClass, Strength: stats.strength, Dexterity: stats.dexterity, Intelligence: stats.intelligence });
        if (error) {
            console.error(error);
        } else {
            console.log('Character data inserted:', data);
        }
        setName("");
        setSelectedClass("");
        setStats({
            strength: 0,
            dexterity: 0,
            intelligence: 0,
        });
        window.location = "http://localhost:5173/Gallery";
    }
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

    return (
        <div className="character-container">
            <h1>Create your character!</h1>
            <form onSubmit={handleSubmit}>
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
                <button type = "submit">Create!</button>
            </form>
        </div>
    )
}
export default Create;