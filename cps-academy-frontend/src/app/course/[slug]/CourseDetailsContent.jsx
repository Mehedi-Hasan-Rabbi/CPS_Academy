// src/app/course/[slug]/CourseDetailsContent.jsx
"use client";

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';
import { HiBookOpen, HiLockClosed, HiAcademicCap, HiOutlineCalendar, HiArrowRight } from 'react-icons/hi';

export default function CourseDetailsContent({ course, user }) {
    if (!course) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    const { title, description, modules } = course;
    const userRole = user?.role?.name || 'Public';
    const isStudentOrAbove = userRole === 'Student' || userRole === 'Social Media Manager / Developer';

    const renderModules = () => {
        if (!modules || modules.length === 0) {
            return (
                <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200 flex flex-col items-center">
                    <HiBookOpen className="text-3xl text-blue-600 mb-3" />
                    <p className="text-gray-600">No modules available for this course yet.</p>
                </div>
            );
        }
        
        return (
            <div className="space-y-4">
                {modules.map((module) => (
                    <div 
                        key={module.id} 
                        className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                    >
                        <div className="flex items-start">
                            <div className="mr-4 mt-1">
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                                    <HiBookOpen className="text-blue-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                                        <HiOutlineCalendar className="mr-1.5" />
                                        {module.numberOfClasses} classes
                                    </span>
                                </div>
                                                               
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <span className="bg-gray-200 w-5 h-5 rounded-full inline-flex items-center justify-center mr-2">D</span>
                                        Details
                                    </h4>
                                    <div className="text-gray-700 ml-7">
                                        <BlocksRenderer content={module.details} />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <span className="bg-gray-200 w-5 h-5 rounded-full inline-flex items-center justify-center mr-2">T</span>
                                        Topics Covered
                                    </h4>
                                    <div className="text-gray-700 ml-7">
                                        <BlocksRenderer content={module.topicsCovered} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <div className="mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                    <HiAcademicCap className="text-blue-600 mr-3 text-2xl" />
                    {title}
                </h1>
                <div className="text-gray-700">
                    <BlocksRenderer content={description} />
                </div>
            </div>

            {isStudentOrAbove ? (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                        <HiBookOpen className="text-blue-600 mr-2" />
                        Course Modules
                    </h2>
                    {renderModules()}
                </div>
            ) : (
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <HiLockClosed className="text-2xl text-blue-700" />
                        </div>
                        
                        {user ? (
                            <>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    You must be a student to view the full course modules.
                                </h3>
                                <Link 
                                    href="/contact" 
                                    className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
                                >
                                    Contect with Admin to Enroll
                                    <HiArrowRight className="ml-2" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Login to view enrollment options for this course.
                                </h3>
                                <Link 
                                    href="/login" 
                                    className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
                                >
                                    Login to Enroll
                                    <HiArrowRight className="ml-2" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}