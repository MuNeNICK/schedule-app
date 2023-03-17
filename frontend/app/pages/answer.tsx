// pages/answer.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Answer() {
  const router = useRouter();
  const { title, dates } = router.query;
  const selectedDates = dates ? dates.split(',') : [];

  const [name, setName] = useState('');
  const [responses, setResponses] = useState(
    selectedDates.map((date) => ({ date, status: '' }))
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStatusChange = (date, status) => {
    const updatedResponses = responses.map((response) =>
      response.date === date ? { ...response, status } : response
    );
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    // 回答一覧ページへの遷移
    router.push({
      pathname: '/answers',
      query: {
        name,
        responses: JSON.stringify(responses),
      },
    });
  };

  return (
    <div>
      <h1>{title}</h1>
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={handleNameChange}
      />
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>○</th>
            <th>△</th>
            <th>☓</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.date}</td>
              <td>
                <input
                  type="radio"
                  name={`status-${index}`}
                  onChange={() => handleStatusChange(response.date, '○')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`status-${index}`}
                  onChange={() => handleStatusChange(response.date, '△')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`status-${index}`}
                  onChange={() => handleStatusChange(response.date, '☓')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}
