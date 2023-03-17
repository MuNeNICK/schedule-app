// pages/answers.tsx
import { useRouter } from 'next/router';

export default function Answers() {
  const router = useRouter();
  const { name, responses: responsesJSON } = router.query;
  const responses = responsesJSON ? JSON.parse(responsesJSON) : [];

  return (
    <div>
      <h1>回答一覧</h1>
      <h2>名前: {name}</h2>
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>回答</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.date}</td>
              <td>{response.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
