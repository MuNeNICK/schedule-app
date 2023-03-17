import React, { FormEvent } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import { useRouter } from "next/router";

type FormValues = {
  eventName: string;
  dates: string;
};

const validationSchema = yup.object({
  eventName: yup.string().required("イベント名を入力してください"),
  dates: yup.string().required("日付を入力してください"),
});

export default function Home() {
  const initialValues: FormValues = {
    eventName: "",
    dates: "",
  };

  const router = useRouter();

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const formattedDates = values.dates
      .split("\n")
      .map((date) => format(new Date(date), "yyyy-MM-dd"));

    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName: values.eventName,
        dates: formattedDates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/event/${data.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">イベントを作成</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block mb-2">
                イベント名
              </label>
              <Field
                id="eventName"
                name="eventName"
                className="border border-gray-300 rounded w-full p-2"
              />
              <ErrorMessage
                name="eventName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label htmlFor="dates" className="block mb-2">
                日付 (1日ごとに改行)
              </label>
              <Field
                id="dates"
                name="dates"
                as="textarea"
                className="border border-gray-300 rounded w-full p-2"
              />
              <ErrorMessage
                name="dates"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              イベントを作成
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
