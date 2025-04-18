// src/components/Card.js

// Card Component
const Card = ({ children, className = "" }) => {
    return (
      <div
        className={`bg-white shadow-md rounded-lg p-4 ${className} transition duration-300 ease-in-out hover:shadow-xl`}
      >
        {children}
      </div>
    );
  };
  
  // CardContent Component (to wrap content inside Card)
  const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
  };
  
  export { Card, CardContent };
  