import { AuthActions } from "../auth/utils";
import { api } from "../auth/utils";
import {UserMockTest} from "@/types/mocktest";

const {getToken} = AuthActions();

export const getUserMockTests = (): Promise<UserMockTest[]> => {
    const token = getToken("access");
    return api.url("/user-mocktests/")
        .auth(`Bearer ${token}`)
        .get()
        .json<UserMockTest[]>();
};

export async function postUserAnswers(mocktestId, userAnswers) {
    const url = `${process.env.NEXT_PUBLIC_API}/check-mocktest/`;
    const data = {
        mocktest_id: mocktestId,
        user_answers: userAnswers
    };
    const token = getToken('access');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function getUserAnswersData() {
    const token = getToken('access');
    const url = `${process.env.NEXT_PUBLIC_API}/user-answers/`;
}