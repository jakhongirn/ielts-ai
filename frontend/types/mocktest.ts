export type UserAnswerDataType = {
    [questionId: string]: string;
  };


export type UserWritingAnswerType = {
    id: number;
    task1?: string;
    task2?: string;
}