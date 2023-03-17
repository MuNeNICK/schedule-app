import React from "react";
import { useRouter } from "next/router";

const EventThanks: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">回答ありがとうございました！</h1>
      <p className="text-xl mb-6">
        イベントへの回答が正常に送信されました。主催者による日程調整の結果が待たれます。
      </p>
      <button
        onClick={() => router.push(`/event/${eventId}`)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        イベントページに戻る
      </button>
    </div>
  );
};

export default EventThanks;
