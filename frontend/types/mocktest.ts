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
  id: string;
  user_profile: string;
  status: string;
  type: string;
  mocktest: {
      id: number;
      title: string;
      description: string;
  };
  date: string;
}