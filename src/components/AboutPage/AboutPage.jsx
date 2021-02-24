import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <div>
        <p>
          To all Japanese learners, welcome to Milton's Academy. Here you will have access to free
          online quizzes and flaschards created by me, Milton Fernandez. I created this to help Japanese learners
          like myself to improve their Japanese. You are welcome to register a member. Members will have the benefit
          of recording all of their quiz results into a table so they can keep track of their progress.
          Best of luck of Japanese language journey!

          </p>
      </div>
    </div>
  );
}

export default AboutPage;
