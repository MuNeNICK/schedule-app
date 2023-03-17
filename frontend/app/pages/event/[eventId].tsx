import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

type FormValues = {
  name: string;
  availableDates: string[];
};

const initialValues: FormValues = {
  name: "",
  availableDates: [],
};

const validationSchema = yup.object({
  name: yup.string().required("お名前を入力してください"),
  availableDates: yup
    .array()
    .min(1, "利用可能な日付を選択してください")
    .required("利用可能な日付を選択してください"),
});

export default function Event() {
  const router = useRouter();
  const { eventId } = router.query;
  const [eventName, setEventName] = React.useState("");
  const [dates, setDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEventName(data.eventName);
        setDates(data.dates);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [eventId]);

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    fetch(`/api/events/${eventId}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        availableDates: values.availableDates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/event/${eventId}/thanks`);
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
      <h1 className="text-4xl font-bold mb-8">{eventName}への回答</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">日程</h2>
        <ul className="space-y-2">
          {dates.map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 mt-8">
            <div>
              <label htmlFor="name" className="block mb-2">
                お名前
              </label>
              <Field
                id="name"
                name="name"
                className="border border-gray-300 rounded w-full p-2"
              />
              <ErrorMessage
                name="name"
                component="            div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">利用可能な日付</h3>
              <div className="space-y-2">
                {dates.map((date, index) => (
                  <label key={date} className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="availableDates"
                      value={date}
                      className="rounded border-gray-300"
                    />
                    <span>{date}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="availableDates"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              回答を送信
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
