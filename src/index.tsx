import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    id: string;
  }

  interface Description extends CoursePartBase {
    description?: string;
  }

  interface CoursePartOne extends Description {
    name: "Fundamentals";
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends Description {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends Description {
    name: "Cyber course";
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree
    | CoursePartFour;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      id: uuidv4({})
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      id: uuidv4({})
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      id: uuidv4({})
    },
    {
      name: "Cyber course",
      exerciseCount: 10,
      description: "My own course",
      id: uuidv4({})
    }
  ];


  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Total = () => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    )
  }

  const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    console.log('part:', part)
    switch (part.name) {
      case 'Fundamentals':
        return (
          <div>
            <p> {part.name} 
             {part.exerciseCount}</p>
            <p> {part.description}</p>
          </div>
        );
      case 'Using props to pass data':
        return (
          <div>
            <p> {part.name} 
            {part.exerciseCount}</p>
            <p>{part.groupProjectCount}</p>
          </div >
        );
      case 'Deeper type usage':
        return (
          <div>
            <p> {part.name} 
             {part.exerciseCount}</p>
            <p> {part.description}</p>
            <p> {part.exerciseSubmissionLink}</p>
          </div>
        );
      case 'Cyber course':
        return (
          <div>
            <p> {part.name} </p>
            <p> {part.exerciseCount}</p>
            <p> {part.description}</p>
          </div>
        );
      default:
        return null
      //return assertNever({ part });
    }
    return null
  }

  const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    courseParts.map((part) => (
      console.log('parts2:', part)
    ))
    return (
      <React.Fragment>
        {courseParts.map((part) => (

          // eslint-disable-next-line react/jsx-key
          <div>
            <Part  part={part} />
          </div>
        ))}
      </React.Fragment>

    );
  };

  interface HeaderProps {
    name: string;
  }

  const Header: React.FC<HeaderProps> = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));