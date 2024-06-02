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