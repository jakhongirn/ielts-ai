import { AuthActions } from "../auth/utils";
import { api } from "../auth/utils";
import { UserMockTest } from "@/types/mocktest";
import axios from "axios";

const { getToken } = AuthActions();

export const getUserMockTests = (): Promise<UserMockTest[]> => {
    const token = getToken("access");
    return api
        .url("/user-mocktests/")
        .auth(`Bearer ${token}`)
        .get()
        .json<UserMockTest[]>();
};

export async function postUserAnswers(mocktestId, userAnswers) {
    const url = `${process.env.NEXT_PUBLIC_API}/check-mocktest/`;
    const data = {
        mocktest_id: mocktestId,
        user_answers: userAnswers,
    };
    const token = getToken("access");
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }

        const responseData = await response.json();
        console.log("Success:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getUserAnswersData() {
    const token = getToken("access");
    const url = `${process.env.NEXT_PUBLIC_API}/user-answers/`;
}

export async function postUserWritingToAI(writing_answers) {
    const token = getToken("access")
    try {
        const res = await axios.post('http://localhost:8000/api/ai-prompt/', writing_answers, {
          headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the header
          },
        });
        
      } catch (error) {
        console.error('Error submitting answers data:', error);
      }
}
