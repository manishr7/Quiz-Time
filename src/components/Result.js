import React from "react";
import { Card, Table, Badge } from "flowbite-react";

const Result = ({ score, total, quizData, userAnswers }) => {
  return (
    <Card className="w-[25rem] md:w-[50rem] min-h-screen md:h-fit md:max-h-[36rem]  mx-auto bg-gray-800 text-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Quiz Completed! 🎉</h2>
      <p className="text-xl font-semibold text-center mb-4">
        You scored <span className="text-green-400">{score}</span> out of{" "}
        <span className="text-blue-400">{total}</span>.
      </p>

      <div className="overflow-y-auto max-h-[32rem] md:max-h-[22rem] rounded-lg bg-gray-900 p-4">
        <h3 className="text-lg font-semibold mb-3 text-center">Quiz Summary 📊</h3>
        <Table >
          <Table.Head className="bg-gray-700 text-black">
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Chosen Answer</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {quizData.questions.map((question, index) => {
              const userAnswer = userAnswers[index]; // User's chosen answer
              const isCorrect = userAnswer?.isCorrect; // Whether the answer was correct

              return (
                <Table.Row
                  key={index}
                  className="bg-gray-800 border-b text-white"
                >
                  <Table.Cell className="font-semibold">{index + 1}</Table.Cell>
                  <Table.Cell>{question.description}</Table.Cell>
                  <Table.Cell className="text-blue-300">
                    {userAnswer?.chosenOption || "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge className="w-fit" color={isCorrect ? "green" : "red"}>
                      {isCorrect ? "Correct ✅" : "Incorrect ❌"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export default Result;
