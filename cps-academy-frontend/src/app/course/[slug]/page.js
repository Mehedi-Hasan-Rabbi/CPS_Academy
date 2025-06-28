// src/app/course/[slug]/page.js
import { fetchAPI } from '../../../lib/api';
import CourseDetailsContent from './CourseDetailsContent';
import { cookies } from 'next/headers';

export default async function CourseDetailsPage({ params }) {
  const { slug: documentId } = await params;
  let course = null;
  let error = null;

  // --- 1. Get the token from cookies first ---
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // --- 2. Create the headers object with the token if it exists ---
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    // --- 3. Pass the headers to the course fetch API call ---
    // We will also use the populate syntax that works for you.
    const response = await fetchAPI(`/courses/${documentId}?populate=modules`, {}, { headers });
    
    course = response.data;
    
    if (!course) {
      error = `Course with ID ${documentId} not found.`;
    }
  } catch (e) {
    console.error("Error fetching course details:", e);
    error = e.message || "Failed to fetch course details.";
  }

  let user = null;
  if (token) {
    try {
      // This fetch is fine, as it already uses the headers.
      const userResponse = await fetchAPI('/users/me?populate=role', {}, { headers });
      user = userResponse;
      console.log("User profile fetched:", user); // Now this should have the role!
    } catch (userError) {
      console.error("Error fetching user profile:", userError);
      user = null;
    }
  }
  
  if (error || !course) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg text-gray-700">{error || "Course not found."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <CourseDetailsContent course={course} user={user} />
    </div>
  );
}