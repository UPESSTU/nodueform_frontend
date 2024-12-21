import React from "react";
import Base from "../../Component/Base";

const StatusPage = () => {
  // Mock data: Replace with API data
  const submissions = [
    {
      id: 1,
      department: "Library",
      formName: "Due",
      status: "Cleared", // Status options: Submitted, Reviewed, Cleared
    },
    {
      id: 2,
      department: "Finance",
      formName: "Due",
      status: "Reviewed",
    },
    {
      id: 3,
      department: "APO",
      formName: "Document Pendency",
      status: "Submitted",
    },
  ];

  // Map status to step
  const statusSteps = ["Submitted", "Reviewed", "Cleared"];
  const getStatusStep = (status) => statusSteps.indexOf(status) + 1;

  return (
    <Base>
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-2xl font-semibold text-primary text-center mb-6">
          Form Submission Status
        </h1>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              {/* Header */}
              <div className="mb-2">
                <h2 className="text-lg font-bold">{submission.department}</h2>
                <p className="text-sm text-gray-600">{submission.formName}</p>
              </div>

              {/* Multistep Progress Bar */}
              <div className="flex flex-col items-center">
                {/* Headers */}
                <div className="flex justify-between w-full mb-4">
                  {statusSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="flex items-center w-full">
                  {statusSteps.map((step, index) => (
                    <div key={index} className="flex items-center flex-1">
                      {/* Dot */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          getStatusStep(submission.status) >= index + 1
                            ? "bg-primary text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {/* Line */}
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`h-1 flex-1 ${
                            getStatusStep(submission.status) >= index + 2
                              ? "bg-primary"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Text */}
              <div className="mt-3 text-sm font-medium">
                Current Status:{" "}
                <span
                  className={`${
                    submission.status === "Cleared"
                      ? "text-green-600"
                      : submission.status === "Reviewed"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default StatusPage;
