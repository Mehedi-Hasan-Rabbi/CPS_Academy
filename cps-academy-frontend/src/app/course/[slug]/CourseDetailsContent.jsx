// src/app/course/[slug]/CourseDetailsContent.jsx
"use client"; // This is a Client Component

import React from 'react';

const renderRichText = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) {
    // If blocks is not an array (e.g., a simple string or undefined), return it as is.
    return blocks;
  }

  return blocks.map((block, index) => {
    // Each block has a 'type' (e.g., 'paragraph', 'list', 'heading')
    // We can render different HTML elements based on the block type.
    const children = block.children?.map((child, childIndex) => {
      // Each child can have a 'text' property and formatting (bold, italic, etc.)
      let textContent = child.text;
      
      if (child.format) {
        // Apply text formatting if it exists
        if (child.format.bold) {
          textContent = <strong key={`bold-${childIndex}`}>{textContent}</strong>;
        }
        if (child.format.italic) {
          textContent = <em key={`italic-${childIndex}`}>{textContent}</em>;
        }
        // Add more formatting checks here if needed (e.g., underline, strikethrough)
      }
      
      return <React.Fragment key={childIndex}>{textContent}</React.Fragment>;
    });

    switch (block.type) {
      case 'paragraph':
        return <p key={index}>{children}</p>;
      case 'list':
        // Check if it's an ordered or unordered list
        if (block.format === 'ordered') {
          return <ol key={index}>{children}</ol>;
        } else {
          return <ul key={index}>{children}</ul>;
        }
      case 'list-item':
        return <li key={index}>{children}</li>;
      // You can add more cases for other block types (e.g., 'heading', 'image')
      default:
        // For unknown block types, just render the children in a span
        return <span key={index}>{children}</span>;
    }
  });
};

export default function CourseDetailsContent({ course, user }) {
  // Determine the user's role.
  // Strapi's user object has a `role` property which is an object.
  // The role name is under `role.name`.
  const userRole = user?.role?.name || 'Public'; // Default to 'Public' if no user or role

  // Conditionally render content based on the user's role
  const isStudentOrAbove = userRole === 'Student' || userRole === 'Social Media Manager / Developer';
  const isSocialMediaManager = userRole === 'Social Media Manager / Developer';

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">{course.title}</h1>
      {/* Updated to use the new renderer */}
      <div className="text-gray-600 mb-8">
        {renderRichText(course.description)}
      </div>
      
      {/* Public/Normal User View: Limited Summary */}
      {/* ... your conditional rendering logic is fine ... */}
      
      {/* Student/Social Media Manager/Developer View: Full Details */}
      {isStudentOrAbove && (
        <div className="border-t pt-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Course Details</h2>
          <div className="prose max-w-none">
            {/* Use the new renderer for description */}
            <div>{renderRichText(course.description)}</div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Modules</h3>
            {course.modules?.length > 0 ? (
              <ul className="space-y-4">
                {course.modules.map((module) => (
                  <li key={module.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900">{module.name}</h4>
                    <p className="text-gray-600">
                      <strong>Classes:</strong> {module.numberOfClasses}
                    </p>
                    <p className="text-gray-600">
                      <strong>Topics:</strong> {renderRichText(module.topicsCovered)}
                    </p>
                    <p className="text-gray-600 mt-2">{renderRichText(module.details)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No modules available for this course yet.</p>
            )}
          </div>
        </div>
      )}
      {/* ... rest of the component */}
    </div>
  );
}