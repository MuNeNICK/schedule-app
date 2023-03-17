import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">調整さん風アプリ</h1>
      <Link href="/event/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          新しいイベントを作成する
      </Link>
    </div>
  );
}
