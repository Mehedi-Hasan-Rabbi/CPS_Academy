// src/app/course/[slug]/page.js
import { fetchAPI } from '../../../lib/api';
import CourseDetailsContent from './CourseDetailsContent'; // We'll create this next
import { cookies } from 'next/headers'; // To access cookies on the server

// This is a Server Component, so we can make it async
export default async function CourseDetailsPage({ params }) {
  const { slug: documentId } = await params; // Get the course ID from the URL slug

  let course = null;
  let error = null;

  try {
    // Fetch a single course by its ID, populate modules
    const response = await fetchAPI(`/courses/${documentId}`, { populate: '*' });
    // Adjusting for the direct attribute structure we found
    course = response.data;
    if (!course) {
      error = `Course with ID ${documentId} not found.`;
    }
  } catch (e) {
    console.error("Error fetching course details:", e);
    error = e.message || "Failed to fetch course details.";
  }

  // Get the user's JWT from the cookie on the server
  // This is a powerful feature of Server Components!
  // Await cookies() before using its value
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // The `user` role information is not in the JWT by default in Strapi
  // We'll need to fetch the user's details if a token exists
  let user = null;
  if (token) {
    try {
      // Fetch the user's profile and role
      const userResponse = await fetchAPI('/users/me', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user = userResponse; // This should contain the user's role
    } catch (userError) {
      console.error("Error fetching user profile:", userError);
      // If fetching the user fails (e.g., expired token), treat as unauthenticated
      // This is a simple form of session validation
      user = null;
    }
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg text-gray-700">{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-600">Course Not Found</h1>
        <p className="mt-4 text-lg text-gray-500">The requested course could not be found.</p>
      </div>
    );
  }

  // Pass the fetched course data and user info to a client component
  // The client component will handle conditional rendering and interactivity
  return (
    <div className="container mx-auto p-8">
      <CourseDetailsContent course={course} user={user} />
    </div>
  );
}