import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">About the Academic Counseling System</h2>
      <p className="text-lg text-gray-700 mb-4">
        The Academic Counseling System is designed to help students connect with counselors for guidance and support.
        It provides a platform for booking appointments, accessing resources, and staying updated on the latest events.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-3">Key Features:</h3>
      <ul className="list-disc pl-6 text-lg text-gray-600">
        <li>📅 Book and manage counseling appointments</li>
        <li>📢 Get the latest events and announcements</li>
        <li>💬 Chatbot assistance (Sophie) for academic & mental health advice</li>
        <li>📊 Analytics tools for counselors</li>
        <li>🔒 Secure and confidential student data</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 mb-3">Contact Us:</h3>
      <p className="text-lg text-gray-700">
        📧 Email: support@uptm-counseling.com<br />
        📍 Address: UPTM Campus, Kuala Lumpur, Malaysia
      </p>
    </div>
  );
};

export default About;
