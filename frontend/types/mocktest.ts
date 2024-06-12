export type UserAnswerDataType = {
    user_answers: {
      [key: string]: string
    }
  };


export type UserWritingAnswerType = {
    id: number;
    task1?: string;
    task2?: string;
}

export interface UserMockTest {
  id: number;
  reading_answers: string;
  listening_answers: string;
  writing_answers: string;
  feedback: string;
  status: string;
  date: string;
  type: string;
  mocktest:string;
  mocktest_details: {
      id:string;
      title: string;
      description: string;
  };
  user_profile: string;
}