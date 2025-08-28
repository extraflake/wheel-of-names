import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Participant() {
    const [participants, setParticipants] = useState([]);
    const [newName, setNewName] = useState("");
    let url = `http://localhost:8989`

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        const res = await axios.get(`${url}/api/participant`);
        setParticipants(res.data);
    };

    const addParticipant = async () => {
        await axios.post(`${url}/api/participant`, { name: newName });
        setNewName("");
        loadParticipants();
    };

    const deleteParticipant = async (id) => {
        await axios.delete(`${url}/api/participant/${id}`);
        loadParticipants();
    };

    const setAsWinner = async (id) => {
        await axios.put(`${url}/api/participant/winner/${id}`);
        loadParticipants();
    };

    const setAsNotWinner = async (id) => {
        await axios.put(`${url}/api/participant/not-winner/${id}`);
        loadParticipants();
    };

    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">🎡 Wheel of Participants</h1>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="Nama peserta"
                    className="border p-2 mr-2"
                />
                <button onClick={addParticipant} className="bg-blue-500 text-black px-4 py-2">
                    Tambah
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">#</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">Nama Peserta</th>
                            <th className="px-4 py-2 text-center text-gray-600 font-semibold">Status</th>
                            <th className="px-4 py-2 text-center text-gray-600 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p, index) => (
                            <tr
                                key={p.id}
                                className={`border-t hover:bg-gray-50 transition ${p.isWinner ? "bg-green-50" : ""
                                    }`}
                            >
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2 font-medium">{p.name}</td>
                                <td className="px-4 py-2 text-center">
                                    {p.isWinner ? (
                                        <span className="text-green-600 font-bold">WINNER 🏆</span>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => setAsWinner(p.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg shadow"
                                    >
                                        Set as Winner
                                    </button>
                                    <button
                                        onClick={() => setAsNotWinner(p.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg shadow"
                                    >
                                        Set as Not Winner
                                    </button>
                                    <button
                                        onClick={() => deleteParticipant(p.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg shadow"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}