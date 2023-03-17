// pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const [title, setTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateSelect = (e) => {
    const date = e.target.value;
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = () => {
    const query = {
      title,
      dates: selectedDates.join(','),
    };
    router.push({
      pathname: '/answer',
      query,
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="イベントタイトル"
        value={title}
        onChange={handleTitleChange}
      />
      <input type="date" onChange={handleDateSelect} />
      <button onClick={handleSubmit}>作成</button>
    </div>
  );
}
