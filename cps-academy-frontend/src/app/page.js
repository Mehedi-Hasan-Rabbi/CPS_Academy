// src/app/page.js
import { fetchAPI } from '../lib/api';

export default async function HomePage() {
  let courses = [];
  let error = null;

  try {
    const courseData = await fetchAPI('/courses', { populate: '*' });
    courses = courseData.data; // Directly access course fields

    console.log("Raw course data:", courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
    })));

  } catch (e) {
    console.error(e);
    error = e.message;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg text-gray-700">{error}</p>
        <p className="mt-2 text-md text-gray-500">
          Please ensure your Strapi server is running and accessible at {process.env.NEXT_PUBLIC_STRAPI_API_URL}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-800">
          CPS Academy Courses
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome! Explore our diverse range of courses.
        </p>
      </header>

      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {course.title}
              </h2>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {Array.isArray(course.description)
                  ? course.description.map((d, i) => (
                      <span key={i}>{d.children?.[0]?.text || ''} </span>
                    ))
                  : course.description}
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Modules:</h3>
                {/* {course.modules?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {course.modules.map((module) => (
                      <li key={module.id}>{module.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No modules available for this course yet.</p>
                )} */}
                <p className="text-gray-700 mb-4 line-clamp-3">Become a CPS Academy Student to view modules</p>
              </div>

              <button className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                View Course Details (Public)
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-600">
            No courses found. Add some in Strapi!
          </p>
        )}
      </section>
    </div>
  );
}