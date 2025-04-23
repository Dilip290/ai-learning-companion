import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Math");
  const [score, setScore] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("score", score);

    await fetch("https://ai-learning-companion-2.onrender.com/submit-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const res = await fetch(`https://ai-learning-companion-2.onrender.com/get-recommendation?name=${name}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">AI Learning Companion</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <label className="block mb-2">Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full mb-4 p-2 border rounded" />

        <label className="block mb-2">Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option>Math</option>
          <option>Science</option>
          <option>English</option>
        </select>

        <label className="block mb-2">Score:</label>
        <input type="number" value={score} onChange={(e) => setScore(e.target.value)} required className="w-full mb-4 p-2 border rounded" />

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Get Recommendation</button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow-lg text-center w-full max-w-md">
          <h2 className="text-xl font-semibold text-green-700">Recommendation</h2>
          <p className="mt-2">Hi {result.name}, based on your score in {result.subject}, we recommend the <strong>{result.recommended_level}</strong> level.</p>
        </div>
      )}
    </div>
  );
}

export default App;
